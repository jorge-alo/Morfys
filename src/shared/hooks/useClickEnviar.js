import { useContext } from "react";
import { DataContext } from "../../context/DataContext";


export const useClickEnviar = () => {
    const { comidaData, setModalIsTrue, setPedido, setVariantesOpcionesSelecionadas, setContVariable } = useContext(DataContext);

    const handleClickEnviar = () => {
        setPedido(pedidoPrevio => {
            const siYaExiste = pedidoPrevio.some(item => item.id == comidaData.id);

            if (siYaExiste) {
                return pedidoPrevio.map(item =>
                    item.id == comidaData.id
                        ? comidaData
                        : item
                )
            } else {
                return [...pedidoPrevio, comidaData]
            }
        })
        setContVariable(0);
        setVariantesOpcionesSelecionadas({});
        setModalIsTrue(false);
        // Si el modal se cierra por éxito, quitamos la marca del historial
        if (window.history.state?.modal) {
            window.history.back();
        }

    }

    return handleClickEnviar;
}
