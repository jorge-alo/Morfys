import { usePedidoResumen } from "../hooks/usePedidoResumen";


export const BotonFlotante = ({ setIsModalMipeddido, isModalMipeddido }) => {

     const { pedido, subtotal} = usePedidoResumen();

    if (!pedido || pedido.length === 0) return null;

    if (!isModalMipeddido) {
        return (
            <button
                className='section-mipedido__verPedido'
                onClick={() => setIsModalMipeddido(true)}> Ver mi pedido ${subtotal}
            </button>
        )
    }
}
