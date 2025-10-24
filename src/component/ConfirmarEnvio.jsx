import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"
import { useParams } from "react-router-dom";
import { useWhatsApp } from "../hook/useWhatsApp";
import '../../styles/ConfirmarEnvio.css'

export const ConfirmarEnvio = () => {
  const { valueInputEnvio, handleChange, getDataResto, setModalIsTrue, setPedido, pedido, setSelectedModalEnviar } = useContext(DataContext);
  const { name } = useParams();
  const [resto, setResto] = useState("");
  const { enviarPedido } = useWhatsApp();
  const { metodoEntrega, metodoPago, direccion } = valueInputEnvio;
  const [envio, setEnvio] = useState(false);

  const handleGetDataResto = async () => {
    try {
      const result = await getDataResto(name)
      setResto(result.data.resto);
      console.log("Valor de result en confirmarEnvio", result);
    } catch (error) {
      console.log("Error al obtener getDataResto", error);
    }
  }

  useEffect(() => {
    console.log("Ejecutando el useEffect para corroborar");
    handleGetDataResto()
  }, [])

  const handleConfirmarEnviar = () => {
    enviarPedido(resto.cel, metodoEntrega, metodoPago, direccion, pedido);
    setModalIsTrue(false);
    setSelectedModalEnviar(false);
    setPedido([]);
    console.log("Valor de valueInput en confirmarEnvio", valueInputEnvio);
  }

  const handleCancelarEnviar = () => {
    setModalIsTrue(false);
    setSelectedModalEnviar(false);
  }

  return (
    <div className="container-modal">
      <div className="container-modal__recibirpedido">
        <label htmlFor=""> ¿Como deseas recibir el pedido?</label>
        <select name="metodoEntrega" id="envio" onChange={handleChange} value={valueInputEnvio.metodoEntrega} >
          <option value="envienmelo">Envienmelo</option>
          <option value="local">Voy al local</option>
        </select>
      </div>
      <div className="container-modal__metododpago">
        <label htmlFor=""> ¿Como deseas pagar?</label>
        <select name="metodoPago" id="pago" onChange={handleChange} value={valueInputEnvio.metodoPago}>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
        </select>
      </div>
      {valueInputEnvio.metodoEntrega == "envienmelo"
        ?
        <>
          <div className="mensaje-de-envio">
            <p>Por favor, envíe su ubicación actual desde WhatsApp para mayor precisión en la entrega</p>
            <p className="mensaje-de-envio__no-incluido">*Precio de envio no incluido en el total*</p>
          </div>
          <div className="textarea-direccion">
            <label htmlFor="">Direccion:</label>
            <textarea
              name="direccion"
              id="direccion"
              value={valueInputEnvio.direccion}
              onChange={handleChange}
              placeholder="Ingresa tu direccion"
            >
            </textarea>
          </div>

        </>
        :
        ""


      }

      <button onClick={handleConfirmarEnviar} className="confirmaryenvio">Confirmar y enviar pedido</button>
      <button className="cancelarenvio" onClick={handleCancelarEnviar}>Cancelar</button>
    </div>
  )
}
