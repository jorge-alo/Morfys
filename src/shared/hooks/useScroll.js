import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";


export const useScroll = () => {
    const { modalIsTrue } = useContext(DataContext);

    useEffect(() => {
        if (modalIsTrue) {
            document.body.style.overflow = "hidden"; // bloquea scroll de fondo
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [modalIsTrue]);
}
