import { useContext } from "react";
import { useHandleTamañoRestar } from "../hooks/useHandleTamañoRestar";
import { useHandleTamañoSumar } from "../hooks/useHandleTamañoSumar";
import { DataContext } from "../../context/DataContext";


export const TamañoMostrar = () => {
    const { comidaData, variantesOpcionesSelecionadas} = useContext(DataContext);

    const handleTamañoSumar = useHandleTamañoSumar();
    const handleTamañoRestar = useHandleTamañoRestar();

    return (
        <div className="container-tamaño">
            <span> {comidaData.variantes[0].nombre} </span>
            {Object.entries(comidaData.variantes[0].opciones).map(([op, valor]) => (
                valor.standby == 0 &&
                <div key={valor.nombre} className="container-tamaño__opcion">
                    <div className="container-tamaño-opcion__seleccion">
                        <h5>{valor.nombre} / ${valor.precio_adicional}</h5>
                        <div className="container-tamaño-opcion-seleccion__sumar-restar">
                            <span onClick={() => handleTamañoRestar(valor)} >-</span>
                            <p> {variantesOpcionesSelecionadas[valor.nombre] ? variantesOpcionesSelecionadas[valor.nombre].cantOpciones : 0} </p>
                            <span onClick={() => handleTamañoSumar(valor)} >+</span>
                        </div>
                    </div>

                </div>

            ))}
        </div>
    )
}
