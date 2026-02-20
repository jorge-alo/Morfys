import { useEnviarPedido } from "../hooks/useEnviarPedido";
import '../../../../styles/Mipedido.css'
import { usePedidoResumen } from "../hooks/usePedidoResumen";

export const BotonEnviarPedido = ({ setIsModalMipeddido, isModalMipeddido }) => {
    const { handleEnviarPedido } = useEnviarPedido(isModalMipeddido, setIsModalMipeddido)

    const { pedido, subtotal, noAlcanzaMinimo, faltaParaMinimo, } = usePedidoResumen();

    if (!pedido || pedido.length === 0) return null;

    return (
        <>
            <div className='mipedido-subtotal'>
                <h4> Subtotal </h4>
                <h4> ${subtotal} </h4>
            </div>

            <button
                className={noAlcanzaMinimo ? "button-falta-dinero" : undefined}
                onClick={handleEnviarPedido}
                disabled={noAlcanzaMinimo}
            >
                {noAlcanzaMinimo
                    ? `Te faltan $${faltaParaMinimo} para hacer el pedido`
                    : "Enviar"}
            </button>
        </>
    )
}
