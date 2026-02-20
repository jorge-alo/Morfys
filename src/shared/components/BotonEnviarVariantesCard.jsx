import { useContext } from "react";
import { useClickEnviar } from "../hooks/useClickEnviar";
import { DataContext } from "../../context/DataContext";


export const BotonEnviarVariantesCard = () => {
    const { comidaData} = useContext(DataContext);
    
    const handleClickEnviar = useClickEnviar();

    const price = comidaData.variantesOpcionesSelecionadas
        ?
        (comidaData.tamanio == 1 ? comidaData.priceVariable : comidaData.totalComida)
        :
        comidaData.priceVariable;

    return (
        <button
            onClick={handleClickEnviar}
            className={
                (() => {
                    // Caso 1: Es un producto con tamaños (tamanio == 1)
                    if (comidaData.tamanio == 1) {
                        return (comidaData.variantesOpcionesSelecionadas && Object.keys(comidaData.variantesOpcionesSelecionadas).length > 0)
                            ? 'modal-button'
                            : 'modal-buton-disable';
                    }

                    // Caso 2: Tiene variantes (Promo, combo, etc.)
                    if (comidaData.variantes && comidaData.variantes.length > 0) {
                        const totalGruposObligatorios = comidaData.variantes.length;
                        const gruposSeleccionados = Object.keys(comidaData.variantesOpcionesSelecionadas || {}).length;

                        // Solo habilitar si eligió algo en cada uno de los grupos
                        return gruposSeleccionados === totalGruposObligatorios
                            ? 'modal-button'
                            : 'modal-buton-disable';
                    }

                    // Caso 3: No tiene variantes (Producto simple)
                    return 'modal-button';
                })()
            }
            disabled={
                (() => {
                    if (comidaData.tamanio == 1) {
                        return !(comidaData.variantesOpcionesSelecionadas && Object.keys(comidaData.variantesOpcionesSelecionadas).length > 0);
                    }
                    if (comidaData.variantes && comidaData.variantes.length > 0) {
                        const totalGruposObligatorios = comidaData.variantes.length;
                        const gruposSeleccionados = Object.keys(comidaData.variantesOpcionesSelecionadas || {}).length;
                        return gruposSeleccionados !== totalGruposObligatorios;
                    }
                    return false;
                })()
            }
        >
            {
                (() => {
                    if (comidaData.tamanio == 1) {
                        return (comidaData.variantesOpcionesSelecionadas && Object.keys(comidaData.variantesOpcionesSelecionadas).length > 0)
                            ? <p>Agregar a mi pedido</p>
                            : <p>Selecciona al menos una</p>;
                    }

                    if (comidaData.variantes && comidaData.variantes.length > 0) {
                        const totalGruposObligatorios = comidaData.variantes.length;
                        const gruposSeleccionados = Object.keys(comidaData.variantesOpcionesSelecionadas || {}).length;

                        if (gruposSeleccionados === totalGruposObligatorios) {
                            return <p>Agregar a mi pedido</p>;
                        } else {
                            // Opcional: Mostrar cuál grupo falta
                            const indexFaltante = gruposSeleccionados;
                            return <p>Falta seleccionar {comidaData.variantes[indexFaltante]?.nombre}</p>;
                        }
                    }

                    return <p>Agregar a mi pedido</p>;
                })()
            }
            {price == 0 ? '' : <p> ${price}</p>}
        </button>
    )
}
