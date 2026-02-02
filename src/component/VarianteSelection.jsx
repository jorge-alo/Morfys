import { useContext } from 'react';
import '../../styles/VarianteSelection.css'
import { DataContext } from '../context/DataContext';

export const VarianteSelection = ({ setSelectedVariante, varianteActual }) => {

    const { 
        comidaData, 
        setComidaData, 
        setModalIsTrue, 
        variantesOpcionesSelecionadas, 
        setVariantesOpcionesSelecionadas 
    } = useContext(DataContext);

    // --- CAMBIO 1: Usamos varianteActual para el límite ---
    const limite = varianteActual.limite ? varianteActual.limite : null;
    const cantPedido = comidaData.cant;
    const cantOpcionesMax = limite && (limite * cantPedido);

    // --- CAMBIO 2: Lógica de contador local para este grupo específico ---
    const seleccionDelGrupo = variantesOpcionesSelecionadas[varianteActual.nombre] || {};
    const contVariableGrupo = Object.values(seleccionDelGrupo).reduce((acc, el) => acc + el.cantOpciones, 0);

    const handleSumar = (opcion) => {
        // Validamos contra el límite del grupo actual
        if (limite && contVariableGrupo >= cantOpcionesMax) {
            return;
        }

        setVariantesOpcionesSelecionadas(prev => {
            const grupoPrevio = prev[varianteActual.nombre] || {};
            const prevOpciones = grupoPrevio[opcion.nombre] || { cantOpciones: 0, valor: 0, id: opcion.id };
            const nuevoValor = prevOpciones.cantOpciones + 1;

            return {
                ...prev,
                [varianteActual.nombre]: {
                    ...grupoPrevio,
                    [opcion.nombre]: {
                        id: opcion.id,
                        cantOpciones: nuevoValor,
                        valor: Number(opcion.precio_adicional) * nuevoValor
                    }
                }
            };
        });
    };

    const handleRestar = (opcion) => {
        const grupoPrevio = variantesOpcionesSelecionadas[varianteActual.nombre] || {};
        
        if (grupoPrevio[opcion.nombre]?.cantOpciones > 0) {
            setVariantesOpcionesSelecionadas(prev => {
                const grupoActual = prev[varianteActual.nombre] || {};
                const nuevoValor = grupoActual[opcion.nombre].cantOpciones - 1;
                
                const nuevoGrupo = { ...grupoActual };
                
                if (nuevoValor === 0) {
                    delete nuevoGrupo[opcion.nombre];
                } else {
                    nuevoGrupo[opcion.nombre] = {
                        ...grupoActual[opcion.nombre],
                        cantOpciones: nuevoValor,
                        valor: Number(opcion.precio_adicional) * nuevoValor
                    };
                }

                return {
                    ...prev,
                    [varianteActual.nombre]: nuevoGrupo
                };
            });
        }
    };

    const handleOnclick = () => {
        // Calculamos el total sumando todos los grupos seleccionados
        const totalAdicionales = Object.values(variantesOpcionesSelecionadas).reduce((acc, grupo) => {
            const sumaGrupo = Object.values(grupo).reduce((sub, item) => sub + item.valor, 0);
            return acc + sumaGrupo;
        }, 0);

        const totalComida = Number(comidaData.priceVariable) + totalAdicionales;

        setComidaData(item => ({
            ...item,
            variantesOpcionesSelecionadas,
            totalComida
        }));
        
        setSelectedVariante(null); // Volvemos a CardSelection
    };

    return (
        <div className="container-modal">
            <div className='container-variantes__opcion'>
                <div className='vover-cerrar'>
                    {/* CAMBIO 3: null para regresar a CardSelection */}
                    <span className='volver' onClick={() => setSelectedVariante(null)}> ⬅️ </span>
                    <h3> {varianteActual.nombre} </h3>
                    <span className='cerrar' onClick={() => setModalIsTrue(false)}>X</span>
                </div>
                <h3> Opciones disponibles</h3>
                {
                    limite &&
                        contVariableGrupo >= cantOpcionesMax
                        ?
                        <h5 className='limite'> Limite alcanzado</h5>
                        :
                        <h5 className='debeseleccionar'>Debe seleccionar {cantOpcionesMax} {varianteActual.nombre}</h5>
                }

                <div className='variantes-opciones'>
                    {/* CAMBIO 4: Mapeamos varianteActual.opciones */}
                    {varianteActual.opciones.map((opcion) => (
                        opcion.standby !== 1 &&
                        <div key={opcion.id} className='container-opcion'>
                            <div> {opcion.nombre} {opcion.precio_adicional == 0 ? "" : <p> ${Math.floor(opcion.precio_adicional)} </p>}  </div>
                            <div className='container-opcion__unidades'>
                                <span onClick={() => handleRestar(opcion)} >-</span>
                                {/* CAMBIO 5: Buscamos el contador dentro del grupo específico */}
                                <p> {seleccionDelGrupo[opcion.nombre] ? seleccionDelGrupo[opcion.nombre].cantOpciones : 0} </p>
                                <span onClick={() => handleSumar(opcion)}>+</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <button
                className={!limite ? 'opcion-aceptar' : contVariableGrupo != cantOpcionesMax ? 'opcion-aceptar-disabled' : 'opcion-aceptar'}
                disabled={!limite ? false : contVariableGrupo != cantOpcionesMax}
                onClick={!limite ? handleOnclick : contVariableGrupo == cantOpcionesMax ? handleOnclick : null}
            >
                {limite ?
                    contVariableGrupo == cantOpcionesMax
                        ? "Aceptar"
                        : `Faltan ${cantOpcionesMax - contVariableGrupo} ${varianteActual.nombre} `
                    : "Aceptar"
                }
            </button>
        </div>
    )
}
