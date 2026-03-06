import { useCallback } from "react"

export const useWhatsApp = () => {
  const enviarPedido = useCallback((response, cel, metodoEntrega, metodoPago, direccion, pedido, ubicacionLink = "") => {
   const pedidoId = response.data.pedidoId;
    const fecha = new Date().toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    const iconoEntrega = metodoEntrega === "Local" ? "🏪" : "🛵💨";
    const iconosPago = {
      "Efectivo": "💵",
      "Transferencia": "💳",
    };
    const iconoPago = iconosPago[metodoPago] || "💰";

    // --- CONSTRUCCIÓN DEL MENSAJE ---
    const mensaje = `¡NUEVO PEDIDO! N° ${pedidoId}\n\n` +
      `Fecha: ${fecha}\n` +
      `Forma de entrega:  ${iconoEntrega} ${metodoEntrega === 'Local' ? 'Retira en el local' : 'Envió a domicilio'}\n` +
      `Método de pago: ${iconoPago} ${metodoPago}\n` +
      
      (metodoEntrega === 'Envienmelo' 
        ? `Ubicación: ${direccion}\n${ubicacionLink ? `📍 Mapa: ${ubicacionLink}\n` : ''}` 
        : '') +
      
      `Pedido:\n-------------------\n${pedido.map(p => {
        // Línea principal del producto
        const lineaPrincipal = `${p.tamanio || p.price == 0 ? "" : p.cant + 'x '} ${p.name} ${p.tamanio || p.price == 0 ? "" : '- $' + p.priceVariable}`;
        
        let variantesTexto = "";

        if (p.variantesOpcionesSelecionadas) {
          if (!p.tamanio) {
            // CASO 1: No es tamaño (Iteración doble: Grupos -> Opciones)
            variantesTexto = Object.entries(p.variantesOpcionesSelecionadas).map(([nombreGrupo, opciones]) => {
              const opcionesDetalle = Object.entries(opciones).map(([nombreOpcion, info]) => 
                `   • ${info.cantOpciones}x ${nombreOpcion}${info.valor > 0 ? ' ($' + info.valor + ')' : ''}`
              ).join('\n');
              
              return ` *${nombreGrupo}:*\n${opcionesDetalle}`;
            }).join('\n');
          } else {
            // CASO 2: Tiene tamaño (Iteración simple: Key es el nombre del tamaño)
            // Ejemplo: Chica: {cantOpciones: 1, valor: 5000}
            variantesTexto = Object.entries(p.variantesOpcionesSelecionadas).map(([nombreTamanio, info]) => 
              `   • ${info.cantOpciones}x ${nombreTamanio} ($${info.valor})`
            ).join('\n');
          }
        }

        return `${lineaPrincipal}${variantesTexto ? '\n' + variantesTexto : ''}`;
      }).join('\n-------------------\n')}\n\n` +
      
      `Total: 🧾 *Subtotal: $${pedido.reduce((sum, item) => sum + (item.totalComida ? Number(item.totalComida) : Number(item.priceVariable)), 0)}*`;

    const mensajeCodificado = encodeURIComponent(mensaje)
    const url = `https://wa.me/${cel}?text=${mensajeCodificado}`;
    window.open(url, '_blank')
  }, []) 

  return { enviarPedido };
}