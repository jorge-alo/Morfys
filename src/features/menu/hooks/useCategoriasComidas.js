import { useMemo } from "react"
import { agruparComidasPorCategorias, ordenarCategorias } from "../utils/comidas.utils"

export const useCategoriasComidas = (comidas) => {

    const comidasPorCategorias = useMemo(() => {
        return agruparComidasPorCategorias(comidas)
    }, [comidas])
    
    const categoriasOrdenadas = useMemo(() => {
        return ordenarCategorias(comidasPorCategorias)
    }, [comidasPorCategorias])
    
    return {categoriasOrdenadas};
}
