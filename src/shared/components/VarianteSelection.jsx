import { useContext } from 'react';
import '../../../styles/VarianteSelection.css'
import { DataContext } from '../../context/DataContext';
import { useHandleSumarVarianteSelec } from '../hooks/useHandleSumarVarianteSelec';
import { useHandleRestarVarianteSelec } from '../hooks/useHandleRestarVarianteSelec';

export const VarianteSelection = ({ setSelectedVariante, varianteActual }) => {

    const {
        comidaData,
        setComidaData,
        setModalIsTrue,
        variantesOpcionesSelecionadas,
    } = useContext(DataContext);

    const {
        limite,
        handleSumar,
        contVariableGrupo,
        cantOpcionesMax,
        seleccionDelGrupo
    } = useHandleSumarVarianteSelec(varianteActual);

    const { handleRestar } = useHandleRestarVarianteSelec(varianteActual);

    console.log("Valor de varianteActual en VarianteSelection", varianteActual)
    console.log("Valor de limite en VarianteSelection", limite)
    console.log("Valor de contVariableGrupo en VarianteSelection", contVariableGrupo)
    console.log("Valor de cantOpcionesMax en VarianteSelection", cantOpcionesMax)
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
                    limite ?
                        contVariableGrupo >= cantOpcionesMax
                            ?
                            <h5 className='limite'> Limite alcanzado</h5>
                            :
                            <h5 className='debeseleccionar'>Debe seleccionar {cantOpcionesMax} {varianteActual.nombre}</h5>
                        : ""
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
