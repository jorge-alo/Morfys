import { useCallback, useContext } from "react";
import { estaAbierto } from "../utils/horarios";
import { DataContext } from "../../../context/DataContext";


export const useEnviarPedido = (isModalMipeddido, setIsModalMipeddido) => {
    const { setSelectedModalEnviar, setModalIsTrue, restoData } = useContext(DataContext);

    const handleEnviarPedido = useCallback(() => {
        if (!estaAbierto(restoData)) {
            alert("🚫 El local está cerrado en este horario. Intenta en el horario de atención.");
            return
        }
        // ✅ Si el modal de "Mi Pedido" estaba abierto, cerramos su entrada de historial
        if (isModalMipeddido) {
            // 1. Limpiamos el historial primero
            window.history.back();

            // 2. Esperamos a que el historial se asiente antes de abrir el siguiente modal
            setTimeout(() => {
                setModalIsTrue(true);
                setSelectedModalEnviar(true);
                setIsModalMipeddido(false);
            }, 150); // 150ms es suficiente para que el popstate termine su trabajo
        } else {
            // Si el carrito no estaba en modo modal, abrimos directo
            setModalIsTrue(true);
            setSelectedModalEnviar(true);
        }
    }, [
        restoData,
        isModalMipeddido,
        setModalIsTrue,
        setSelectedModalEnviar,
        setIsModalMipeddido
    ]
    )
    return { handleEnviarPedido };
}
