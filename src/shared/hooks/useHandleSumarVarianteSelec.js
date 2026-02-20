import { useCallback, useContext } from "react";
import { DataContext } from "../../context/DataContext";


export const useHandleSumarVarianteSelec = (varianteActual) => {
    const {
        comidaData,
        variantesOpcionesSelecionadas,
        setVariantesOpcionesSelecionadas
    } = useContext(DataContext);
    
    // --- CAMBIO 1: Usamos varianteActual para el límite ---
    const limite = Number(varianteActual?.limite) || 0;
    const cantPedido = Number(comidaData?.cant) || 1;
    const cantOpcionesMax = limite * cantPedido;
    // --- CAMBIO 2: Lógica de contador local para este grupo específico ---
    const seleccionDelGrupo = variantesOpcionesSelecionadas[varianteActual.nombre] || {};
    const contVariableGrupo = Object.values(seleccionDelGrupo).reduce((acc, el) => acc + el.cantOpciones, 0);

    const handleSumar = useCallback((opcion) => {
        // Validamos contra el límite del grupo actual
        if (limite > 0 && contVariableGrupo >= cantOpcionesMax) {
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
    }, [limite,
        contVariableGrupo,
        cantOpcionesMax,
        varianteActual.nombre,
        setVariantesOpcionesSelecionadas])

    return {
        limite,
        handleSumar,
        contVariableGrupo,
        cantOpcionesMax,
        seleccionDelGrupo
    };
}
