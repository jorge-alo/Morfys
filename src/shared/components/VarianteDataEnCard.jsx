import { useContext } from "react";
import { DataContext } from "../../context/DataContext";


export const VarianteDataEnCard = ( {setSelectedVariante}) => {
    const { comidaData, variantesOpcionesSelecionadas } = useContext(DataContext);
    return (
        <div className="container-todos-los-grupos">
            {comidaData.variantes.map((variante, index) => {
                // ✅ BUSCAMOS POR NOMBRE: Verificamos si el nombre de este grupo existe en las selecciones
                const yaTieneSeleccion = variantesOpcionesSelecionadas &&
                    variantesOpcionesSelecionadas[variante.nombre];

                return (
                    <div className='container-variantes' key={variante.id || index}>
                        <span>{variante.nombre}</span>
                        <p onClick={() => setSelectedVariante(variante)}>
                            {/* Ahora sí cambiará de Seleccionar a Editar */}
                            {yaTieneSeleccion ? 'Editar' : 'Seleccionar'}
                        </p>

                        {/* El check verde también se activará correctamente */}
                        {yaTieneSeleccion && (
                            <span className="check-icon"> ✅ </span>
                        )}
                    </div>
                );
            })}
        </div>
    )
}
