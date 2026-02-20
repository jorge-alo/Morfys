import { useState } from 'react'
import '../../../../styles/Mipedido.css'
import { useBackHistorial } from '../../../shared/hooks/useBackHistorial.js';
import { MipedidoData } from './MipedidoData.jsx';
import { BotonEnviarPedido } from './BotonEnviarPedido.jsx';
import { BotonFlotante } from './BotonFlotante.jsx';

export const Mipedido = () => {
  const [isModalMipeddido, setIsModalMipeddido] = useState(false);

  useBackHistorial(isModalMipeddido, setIsModalMipeddido);

  const handleClickBack = () => {
    setIsModalMipeddido(false);
    window.history.back(); // para mantener limpio el historial
  }

  return (
    <section className={`section-mipedido ${isModalMipeddido ? 'modal-section-mipedido' : 'section-mipedido__mobile'}`}>
      {isModalMipeddido && <div className='modal-section-mipedido__back' onClick={handleClickBack}>⬅️</div>}
      <div className={`section-mipedido__container ${isModalMipeddido && 'section-mipedido-container__mobile'}`}>

        <h3>Mi pedido</h3>
        <MipedidoData />
        <BotonEnviarPedido setIsModalMipeddido={setIsModalMipeddido} isModalMipeddido={isModalMipeddido} />

      </div>

      {!isModalMipeddido && (
        <BotonFlotante
          setIsModalMipeddido={setIsModalMipeddido}
          isModalMipeddido={isModalMipeddido}
        />
      )}
    </section>
  )
}
