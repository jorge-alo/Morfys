import { useCallback, useContext } from "react";
import { DataContext } from "../../context/DataContext";


export const useHandleTamañoSumar = () => {
    const { comidaData, setComidaData, setVariantesOpcionesSelecionadas } = useContext(DataContext);

    const handleTamañoSumar = useCallback(
        (opcion) => {
            setVariantesOpcionesSelecionadas(prev => {
                const prevOpciones = prev[opcion.nombre] || { cantOpciones: 0, valor: 0, id: opcion.id }
                const nuevoValor = prevOpciones.cantOpciones + 1;

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

                    setComidaData(prev => {
                        return {
                            ...prev,
                            priceVariable
                        }

                    })
                }


                return actualizado;
            })
        }, [setVariantesOpcionesSelecionadas, comidaData.tamanio, setComidaData]
    )
    return handleTamañoSumar
}
