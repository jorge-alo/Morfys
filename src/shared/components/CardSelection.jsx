import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import '../../../styles/CardSelection.css'
import { useSetComidaData } from "../hooks/useSetComidaData";
import { CardSelectionModalData } from "./CardSelectionModalData";
import { TamañoMostrar } from "./TamañoMostrar";
import { VarianteDataEnCard } from "./VarianteDataEnCard";
import { Unidades } from "./Unidades";
import { BotonEnviarVariantesCard } from "./BotonEnviarVariantesCard";

export const CardSelection = ({ setSelectedVariante }) => {
    const { comidaData} = useContext(DataContext);
    const [cont, setCont] = useState(() => comidaData.cant || 1);

    useSetComidaData(cont);

    return (
        <div className="container-modal">
            <CardSelectionModalData cont = {cont}/>
           
            {
                comidaData.tamanio
                    ?
                    comidaData.variantes && comidaData.variantes.length > 0 &&
                   <TamañoMostrar/>
                    :
                    (
                        comidaData.variantes && comidaData.variantes.length > 0 && (
                            <VarianteDataEnCard setSelectedVariante= {setSelectedVariante}/>
                        )
                    )
            }

            {
                comidaData.tamanio == 1
                    ? ""
                    :
                    comidaData.price == 0
                        ? ""
                        :
                        <Unidades cont = {cont} setCont = {setCont}/>
            }

            <BotonEnviarVariantesCard/>
           
        </div >
    )
}
