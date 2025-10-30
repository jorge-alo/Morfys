import { useContext, useState } from 'react';
import '../../styles/VarianteSelection.css'
import { DataContext } from '../context/DataContext';

export const VarianteSelection = ({ setSelectedVariante }) => {

    const { comidaData, setComidaData, setModalIsTrue, variantesOpcionesSelecionadas, setVariantesOpcionesSelecionadas, contVariable, setContVariable } = useContext(DataContext);

    console.log("Valor de contVariable en VarianteSelection", contVariable);
    const limite = comidaData.variantes[0].limite ? comidaData.variantes[0].limite : null;
    console.log("Valor de limite en VarianteSelection", limite);
    const cantPedido = comidaData.cant;
    const cantOpciones = limite && (limite * cantPedido);
    console.log("Valor de cantOpciones en VarianteSelection", cantOpciones);
    console.log("Valor de contVariable en VarianteSelection", contVariable);
     console.log("Valor de variantesOpcionesSeleccionas en handleRestar", variantesOpcionesSelecionadas);
    const handleSumar = (opcion) => {

        if ((limite && contVariable >= cantOpciones)) {
            return contVariable
        }

        setContVariable(prevCont => prevCont + 1);

        setVariantesOpcionesSelecionadas(prev => {
            const prevOpciones = prev[opcion.nombre] || { cantOpciones: 0, valor: 0 }
            const nuevoValor = prevOpciones.cantOpciones + 1;
            return {
                ...prev,
                [opcion.nombre]: {
                    cantOpciones: nuevoValor,
                    valor: Number(opcion.precio_adicional) * nuevoValor
                }
            }
        })
    }

    const handleRestar = (opcion) => {

        if (variantesOpcionesSelecionadas[opcion.nombre]?.cantOpciones > 0) {
            setVariantesOpcionesSelecionadas(prev => {
                const nuevoValor = prev[opcion.nombre].cantOpciones - 1;
                return {
                    ...prev,
                    [opcion.nombre]: {
                        cantOpciones: nuevoValor,
                        valor: Number(opcion.precio_adicional) * nuevoValor
                    }
                }
            })
            setContVariable(prevCont => prevCont - 1);
        }else{
             setVariantesOpcionesSelecionadas(prev => {
            const nuevoEstado = { ...prev };
            delete nuevoEstado[opcion.nombre];
            return nuevoEstado;
        })
        }
       
       
    }

    const handleOnclick = () => {
        const totalOpciones = Object.values(variantesOpcionesSelecionadas).reduce((acc, item) => acc + item.valor, 0)
        console.log("Valor de totalOpciones en handleOnclick", totalOpciones);
        const totalComida = Number(comidaData.priceVariable) + totalOpciones;
        setComidaData(item => {
            return {
                ...item,
                variantesOpcionesSelecionadas,
                totalComida
            }
        })
        setSelectedVariante(false);
    }


    return (
        <div className="container-modal">
            <div className='container-variantes__opcion'>
                <div className='vover-cerrar'>
                    <span className='volver' onClick={() => setSelectedVariante(false)}> ⬅️ </span>
                    <h3>Elige tus opciones para llevar</h3>
                    <span className='cerrar' onClick={() => setModalIsTrue(false)}>X</span>
                </div>
                <h3> Opciones disponibles</h3>
                {
                    limite &&
                        contVariable >= cantOpciones
                        ?
                        <h5 className='limite'> Limite alcanzado</h5>
                        :
                        <h5 className='debeseleccionar'>Debe seleccionar {cantOpciones} {comidaData.variantes[0].nombre}</h5>
                }

                <div className='variantes-opciones'>
                    {comidaData.variantes[0].opciones.map((opcion, index) => (
                        opcion.standby !== 1 &&
                        <div key={opcion.id} className='container-opcion'>
                            <div> {opcion.nombre} <p> ${opcion.precio_adicional} </p> </div>
                            <div className='container-opcion__unidades'>
                                <span onClick={() => handleRestar(opcion)} >-</span>
                                <p> {variantesOpcionesSelecionadas[opcion.nombre] ? variantesOpcionesSelecionadas[opcion.nombre].cantOpciones : 0} </p>
                                <span onClick={() => handleSumar(opcion)}>+</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <button
                className={!limite ? 'opcion-aceptar' : contVariable != cantOpciones ? 'opcion-aceptar-disabled' : 'opcion-aceptar'}
                disabled={!limite ? false : contVariable != cantOpciones}
                onClick={!limite ? handleOnclick : contVariable == cantOpciones ? handleOnclick : null}
            >
                {limite ?
                    contVariable == cantOpciones
                        ? "Aceptar"
                        : `Faltan ${cantOpciones - contVariable} ${comidaData.variantes[0].nombre} `
                    : "Aceptar"
                }
            </button>
        </div>
    )
}
