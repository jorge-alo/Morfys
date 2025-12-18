import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"
import { useParams } from "react-router-dom";
import { useWhatsApp } from "../hook/useWhatsApp";
import '../../styles/ConfirmarEnvio.css'

export const ConfirmarEnvio = () => {
  const { restoData, postSendPedido, handleReset, valueInputEnvio, handleChange, getDataResto, setModalIsTrue, setPedido, pedido, setSelectedModalEnviar } = useContext(DataContext);
  const { name } = useParams();
  const [resto, setResto] = useState("");
  const { enviarPedido } = useWhatsApp();
  const { metodoEntrega, metodoPago, direccion } = valueInputEnvio;

  // Nuevo estado para controlar la visibilidad del paso de PAGO
  const [mostrarMetodoPago, setMostrarMetodoPago] = useState(false);
  // Nuevo estado para controlar la visibilidad de los botones de ACCIÓN
  const [mostrarBotonesAccion, setMostrarBotonesAccion] = useState(false);

  const handleGetDataResto = async () => {
    try {
      const result = await getDataResto(name)
      setResto(result.data.resto);
    } catch (error) {
      console.log("Error al obtener getDataResto", error);
    }
  }

  useEffect(() => {
    console.log("Ejecutando el useEffect para corroborar");
    handleGetDataResto()
  }, [])

  const handleConfirmarEnviar = () => {

    // Asegúrate de que tanto metodoEntrega como metodoPago estén seleccionados antes de enviar
    if (!valueInputEnvio.metodoEntrega || !valueInputEnvio.metodoPago) {
      alert("Por favor, selecciona tanto el método de entrega como el de pago.");
      return;
    }

    // --- CORRECCIÓN AQUÍ: Armamos el objeto completo para la BD ---

    const pedidoParaDB = {
      restaurant_id: restoData.id,
      // Sumamos el total real (considerando precios dinámicos y adicionales)
      total_pago: pedido.reduce((acc, item) => {
        const precioItem = item.totalComida ? Number(item.totalComida) : Number(item.priceVariable);
        return acc + precioItem;
      }, 0),
      metodo_pago: valueInputEnvio.metodoPago,
      metodo_entrega: valueInputEnvio.metodoEntrega,
      direccion: valueInputEnvio.direccion || "Retiro en local",

      // Mapeo detallado de productos
      productos: pedido.map(item => ({
        comida_id: item.id,
        comida_name: item.name,
        cantidad: item.cant || 1,
        // Precio unitario calculado (Total del item dividido su cantidad)
        precio_unitario: item.price
          ? Number(item.price)
          : 0,

        // --- AQUÍ ENTRAN LAS OPCIONES CON SUS IDS ---
        opciones: item.variantesOpcionesSelecionadas
          ? Object.entries(item.variantesOpcionesSelecionadas)
            .filter(([nombre, op]) => op.id) // <--- FILTRO: Solo enviar si tiene ID
            .map(([nombre, op]) => ({
              opcion_id: op.id, // Verifica que la propiedad se llame 'id' en el estado
              name_opcion: nombre,
              cantidad: op.cantOpciones || 1,
              precio_unitario: op.cantOpciones > 0 ? (Number(op.valor) / op.cantOpciones) : 0
            }))
          : []
      }))
    };
    postSendPedido(pedidoParaDB);
    enviarPedido(resto.cel, metodoEntrega, metodoPago, direccion, pedido);
    setModalIsTrue(false);
    setSelectedModalEnviar(false);
    setPedido([]);
    handleReset()
    console.log("Valor de valueInput en confirmarEnvio", valueInputEnvio);
  }

  const handleCancelarEnviar = () => {
    setModalIsTrue(false);
    setSelectedModalEnviar(false);
    handleReset()
  }

  // Manejador modificado para el método de Entrega
  const handleMetodoEntregaChange = (event) => {
    handleChange(event); // Actualiza el contexto/estado
    // Una vez que se selecciona la entrega, mostramos el paso de pago
    setMostrarMetodoPago(true);
    // Reiniciamos el método de pago para forzar una nueva selección si es necesario
    // Esto es opcional, pero ayuda a evitar envíos accidentales
    // Si usas tu 'handleChange', puedes necesitar una función en el contexto para resetear
    // Por ahora, solo nos enfocamos en la visibilidad.
  }

  // Manejador modificado para el método de Pago
  const handleMetodoPagoChange = (event) => {
    handleChange(event); // Actualiza el contexto/estado
    // Una vez que se selecciona el pago, mostramos los botones de acción
    setMostrarBotonesAccion(true);
  }

  return (
    <div className="container-modal">

      {/* 1. SELECCIÓN DE MÉTODO DE ENTREGA */}
      <div className="container-modal__recibirpedido">
        <label> ¿Como deseas recibir el pedido?</label>
        <div>
          {/* Opción 1: Envienmelo */}
          <div className="radio-option">
            <label htmlFor="envienmelo">Envienmelo</label>
            <input
              type="radio"
              id="envienmelo"
              name="metodoEntrega"
              value="Envienmelo"
              checked={valueInputEnvio.metodoEntrega === "Envienmelo"}
              onChange={handleMetodoEntregaChange}
            />
          </div>
          {/* Opción 2: Voy al local */}
          <div className="radio-option">
            <label htmlFor="local">Voy al local (Retiro)</label>
            <input
              type="radio"
              id="local"
              name="metodoEntrega"
              value="Local"
              checked={valueInputEnvio.metodoEntrega === "Local"}
              onChange={handleMetodoEntregaChange}
            />
          </div>
        </div>

      </div>

      {/* 2. SELECCIÓN DE MÉTODO DE PAGO (Aparece solo después de la Entrega) */}
      {valueInputEnvio.metodoEntrega && mostrarMetodoPago && (
        <div className="container-modal__metododpago">
          <label> ¿Como deseas pagar?</label>
          <div>
            {/* Opción 1: Efectivo */}
            <div className="radio-option">
              <label htmlFor="efectivo">Efectivo</label>
              <input
                type="radio"
                id="efectivo"
                name="metodoPago"
                value="Efectivo"
                checked={valueInputEnvio.metodoPago === "Efectivo"}
                onChange={handleMetodoPagoChange}
              />
            </div>
            {/* Opción 2: Transferencia */}
            <div className="radio-option">
              <label htmlFor="transferencia">Transferencia</label>
              <input
                type="radio"
                id="transferencia"
                name="metodoPago"
                value="Transferencia"
                checked={valueInputEnvio.metodoPago === "Transferencia"}
                onChange={handleMetodoPagoChange}
              />
            </div>
          </div>

        </div>
      )}

      {/* 3. MENSAJE DE ENVÍO Y DIRECCIÓN (Aparecen solo si el método de Entrega es "envienmelo") */}
      {valueInputEnvio.metodoEntrega === "Envienmelo" && mostrarBotonesAccion && (
        <>

          <div className="textarea-direccion">
            <textarea
              name="direccion"
              id="direccion"
              value={valueInputEnvio.direccion}
              onChange={handleChange}
              placeholder="Direccion de entrega"
            >
            </textarea>
          </div>

          <div className="mensaje-de-envio">
            <p className="envioubicacion">Por favor, envíe su **ubicación actual** desde WhatsApp para mayor precisión en la entrega</p>
            <p className="mensaje-de-envio__no-incluido">*Precio de envio no incluido en el total*</p>
          </div>

        </>
      )}

      {/* 4. BOTONES DE ACCIÓN (Aparecen solo después de la selección del método de Pago) */}
      {valueInputEnvio.metodoPago && mostrarBotonesAccion && (
        <>
          <button onClick={handleConfirmarEnviar} className="confirmaryenvio">Confirmar y enviar pedido</button>
          <button className="cancelarenvio" onClick={handleCancelarEnviar}>Cancelar</button>
        </>
      )}

      {/* Botón de Cancelar para cerrar el modal en cualquier momento */}
      {/* Aunque el botón principal de Cancelar se muestra en el paso final, puedes dejar uno visible siempre */}
      {(!valueInputEnvio.metodoPago || !mostrarBotonesAccion) && (
        <button className="cancelarenvio" onClick={handleCancelarEnviar}>Cancelar</button>
      )}


    </div>
  )
}
