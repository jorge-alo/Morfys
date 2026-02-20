import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";


export const useSetComidaData = (cont) => {

    const { setComidaData, variantesOpcionesSelecionadas, setVariantesOpcionesSelecionadas, setContVariable } = useContext(DataContext);
    
    useEffect(() => {

        setComidaData(item => {
            if (item.tamanio == 1) {
                return {
                    ...item,
                    variantesOpcionesSelecionadas
                }
            }
            const priceVariable = Number(item.price) * Number(cont);
            if (cont != item.cant) {
                setContVariable(0);
                setVariantesOpcionesSelecionadas({});
                const { variantesOpcionesSelecionadas, ...rest } = item;
                return {
                    ...rest,
                    cant: cont,
                    priceVariable
                }
            }
            return {
                ...item,
                cant: cont,
                priceVariable
            }
        })
    }, [cont, variantesOpcionesSelecionadas])
}
