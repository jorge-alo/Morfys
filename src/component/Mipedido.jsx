import { useContext, useEffect, useState } from 'react'
import '../../styles/Mipedido.css'
import { DataContext } from '../context/DataContext'
import { estaAbierto } from '../hook/horarios.js';

export const Mipedido = () => {
  const { pedido, setPedido, setSelectedModalEnviar, setModalIsTrue, restoData } = useContext(DataContext);
  const [isModalMipeddido, setIsModalMipeddido] = useState(false);
  const [subtotal, setSubtotal] = useState("");
 


  console.log("Valor de pedido en Mipedido", pedido);
  useEffect(() => {
    ;
    setSubtotal(pedido.reduce((acc, item) => (
      acc + (item.totalComida ? item.totalComida : item.priceVariable)
    ), 0))
    if (pedido.length == 0) {
      setIsModalMipeddido(false);
    }
  }, [pedido])

  const handleEliminar = (id) => {
    setPedido(prev => (
      prev.filter(item => (
        item.id != id
      ))
    ))

  }

  const handleEnviarPedido = () => {
    if (!estaAbierto(restoData)) {
      alert("🚫 El local está cerrado en este horario. Intenta en el horario de atención.");
      return
    }
    setModalIsTrue(true);
    setSelectedModalEnviar(true);
  }
  const handleClickModalMipedido = () => {
    setIsModalMipeddido(true);
  }

  useEffect(() => {
    if (isModalMipeddido) {
      // Empuja un nuevo estado al historial cuando el modal se abre
      window.history.pushState({ mipedido: true }, "");

      const handlePopState = () => {
        // Si el usuario toca "atrás" o hace el gesto, cerramos el modal
        setIsModalMipeddido(false);
      };

      // Escuchamos el evento popstate
      window.addEventListener("popstate", handlePopState);

      // Cleanup cuando se desmonta o se cierra manualmente
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isModalMipeddido]);

  const handleClickBack = () => {
    setIsModalMipeddido(false);
    window.history.back(); // para mantener limpio el historial
  }

  return (
    <section className={`section-mipedido ${isModalMipeddido ? 'modal-section-mipedido' : 'section-mipedido__mobile'}`}>
      {isModalMipeddido && <div className='modal-section-mipedido__back' onClick={handleClickBack}>⬅️</div>}
      <div className={`section-mipedido__container ${isModalMipeddido && 'section-mipedido-container__mobile'}`}>

        <h3>Mi pedido</h3>
        <div className='container-mipedido'>

          {
            pedido && pedido.length > 0
              ?
              pedido.map((item) => (
                <div key={item.id} className='container-mipedido__data'>
                  <div className='container-mipedido-data__container-description'>
                    <div className='container-mipedido-data__description'>
                      <div className='mipedido-data-description__nombre'>
                        {item.tamanio ? "" : item.price == 0 ? "" : <h7> {item.cant}X </h7>}
                        <h5> {item.name} </h5>
                      </div>
                      {item.tamanio ? "" : item.price == 0 ? "" : <h7> (${item.price}) </h7>}
                    </div>
                    {
                      item.variantesOpcionesSelecionadas
                        ?
                        Object.entries(item.variantesOpcionesSelecionadas).map(([nombre, data]) => (
                          <div key={nombre} className='container-mipedido__opciones'>
                            <div className='mipedido-opciones__nombre'>
                              <h7> {data.cantOpciones}X </h7>
                              <h6> {nombre} </h6>
                            </div>
                            <h7> {data.valor == 0 ? "" : `($${data.valor})`} </h7>
                          </div>
                        ))

                        : ""
                    }
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

        {
          pedido && pedido.length > 0
            ?
            <>
              <div className='mipedido-subtotal'>
                <h4> Subtotal </h4>
                <h4> ${subtotal} </h4>
              </div>
              <button className={Number(restoData.envioMinimo) > subtotal ? "button-falta-dinero" : undefined} onClick={handleEnviarPedido} disabled={Number(restoData.envioMinimo) > subtotal ? true : false}>
                {
                  Number(restoData.envioMinimo) > subtotal
                    ?
                    `Te faltan $${Number(restoData.envioMinimo) - Number(subtotal)} para hacer el pedido`
                    :
                    "Enviar"
                }
              </button>
            </>
            : ""
        }
      </div>
      {
        pedido && pedido.length > 0
          ?
          <button className='section-mipedido__verPedido' onClick={handleClickModalMipedido}> Ver mi pedido ${subtotal} </button>
          : ""
      }

    </section>

  )
}
