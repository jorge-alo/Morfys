import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import '../../../../styles/Mipedido.css'
export const MipedidoData = () => {
    const { pedido, setPedido } = useContext(DataContext);

    const handleEliminar = (id) => {
        setPedido(prev => (
            prev.filter(item => (
                item.id != id
            ))
        ))

    }

    return (
        <div className='container-mipedido'>

            {
                pedido && pedido.length > 0
                    ?
                    pedido.map((item) => (
                        <div key={item.id} className='container-mipedido__data'>
                            <div className='container-mipedido-data__container-description'>
                                <div className='container-mipedido-data__description'>
                                    <div className='mipedido-data-description__nombre'>
                                        {item.tamanio ? "" : item.price == 0 ? "" : <span> {item.cant}X </span>}
                                        <h5> {item.name} </h5>
                                    </div>
                                    {item.tamanio ? "" : item.price == 0 ? "" : <span> (${item.price}) </span>}
                                </div>
                                {item.tamanio && item.variantesOpcionesSelecionadas ? (
                                    Object.entries(item.variantesOpcionesSelecionadas).map(([grupoNombre, data]) => (
                                        <div key={grupoNombre} className='container-mipedido__opciones'>
                                            <div className='mipedido-opciones__nombre'>
                                                <span> {data.cantOpciones}X </span>
                                                <h6> {grupoNombre} </h6>
                                            </div>
                                            <span> {data.valor == 0 ? "" : `($${data.valor})`} </span>
                                        </div>
                                    ))
                                )
                                    : ""
                                }
                                {item.variantesOpcionesSelecionadas && !item.tamanio ? (
                                    // 1. Primer nivel: Los grupos (ej: "Sabores", "Ingredientes")
                                    Object.entries(item.variantesOpcionesSelecionadas).map(([grupoNombre, opciones]) => (
                                        // 2. Segundo nivel: Las opciones dentro de cada grupo (ej: "Carne", "Jamon")
                                        <div key={grupoNombre}>
                                            <h5> {grupoNombre} </h5>
                                            {Object.entries(opciones).map(([nombreOpcion, data]) => (
                                                <div key={nombreOpcion} className='container-mipedido__opciones'>
                                                    <div className='mipedido-opciones__nombre'>
                                                        <span> {data.cantOpciones}X </span>
                                                        <h6> {nombreOpcion} </h6>
                                                    </div>
                                                    <span> {data.valor == 0 ? "" : `($${data.valor})`} </span>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                ) : ""}
                            </div>
                            <div className='container-totalcomida-eliminar'>
                                <h5> ${item.totalComida ? item.totalComida : item.priceVariable}</h5>
                                <span className='eliminaritem' onClick={() => handleEliminar(item.id)}>❌</span>
                            </div>
                        </div>
                    ))
                    :
                    <div className='container-image'>
                        <div>
                            <img src="/image/lupa.jpg" />
                        </div>
                        <h5>Tu pedido esta vacío</h5>
                    </div>
            }

        </div>
    )
}
