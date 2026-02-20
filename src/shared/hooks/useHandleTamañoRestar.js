import { useCallback, useContext } from "react";
import { DataContext } from "../../context/DataContext";


export const useHandleTamañoRestar = () => {
    const { comidaData, setComidaData, variantesOpcionesSelecionadas, setVariantesOpcionesSelecionadas } = useContext(DataContext);

    const handleTamañoRestar = useCallback((opcion) => {

        setVariantesOpcionesSelecionadas(prev => {

            if (!prev[opcion.nombre]) return prev;

            const nuevoValor = prev[opcion.nombre].cantOpciones - 1;

            if (nuevoValor <= 0) {
                const nuevoEstado = { ...prev };
                delete nuevoEstado[opcion.nombre];
                return nuevoEstado;
            }

            const actualizado = {
                ...prev,
                [opcion.nombre]: {
                    id: opcion.id,
                    cantOpciones: nuevoValor,
                    valor: Number(opcion.precio_adicional) * nuevoValor
                }
            }

            if (comidaData.tamanio) {
                const priceVariable = Object.entries(actualizado).reduce((acc, [key, obj]) => {
                    return acc + obj.valor;
                }, 0);
                setComidaData(item => ({
                    ...item,
                    priceVariable
                })
                )
            }
            return actualizado;
        })

    }, [setVariantesOpcionesSelecionadas, comidaData.tamanio, setComidaData]
    )
    return handleTamañoRestar
}
