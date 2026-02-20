import { useCallback, useContext } from 'react'
import { DataContext } from '../../context/DataContext';

export const useHandleRestarVarianteSelec = (varianteActual) => {
    const {
        variantesOpcionesSelecionadas,
        setVariantesOpcionesSelecionadas
    } = useContext(DataContext);

    const handleRestar = useCallback(
        (opcion) => {
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
        }, [variantesOpcionesSelecionadas,
        varianteActual.nombre]
    )
    return {
        handleRestar,
    }
}
