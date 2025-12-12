import { useCallback } from "react"


export const useWhatsApp = () => {
  const enviarPedido = useCallback((cel, metodoEntrega, metodoPago, direccion, pedido) => {
    console.log("Valor de cel, metodoEntrega,metodoPago, direccion", cel, metodoEntrega, metodoPago, direccion);
    console.log("Valor de pedidos en useWhatsApp", pedido);
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

    const mensaje = `¡NUEVO PEDIDO!\n\n` +
      `Fecha: ${fecha}\n` +
      `Forma de entrega:  ${iconoEntrega} ${metodoEntrega === 'Local' ? 'Retira en el local' : 'Envió a domicilio'}\n` +
      `Método de pago: ${iconoPago} ${metodoPago}\n` +
      (metodoEntrega === 'Envienmelo' ? `Ubicación: ${direccion}\n` : '') +
      `Pedido:\n ------------------- \n ${pedido.map(p => {
        const lineaPrincipal = ` ${p.tamanio || p.price == 0 ? "" : p.cant + 'x'} ${p.name} ${p.tamanio || p.price == 0 ? "" : '$' + p.priceVariable}`;
        const variantes = p.variantes?.length > 0
          ? `${p.variantes[0].nombre}:\n` + Object.entries(p.variantesOpcionesSelecionadas).map(([nombre, valor]) =>
            `  ${valor.cantOpciones}x ${nombre} ${valor.valor == 0 ? "" : '$' + valor.valor} `
          ).join('\n')
          : '';
        return ` ${lineaPrincipal}${variantes ? '\n' + variantes : ''}`;
      }).join('\n-------------------\n')}\n\n` +
      `Total: 🧾$${pedido.reduce((sum, item) => sum + (item.totalComida ? Number(item.totalComida) : Number(item.priceVariable)), 0)}`;

    // Codificación correcta del mensaje (conserva emojis)
    const mensajeCodificado = encodeURIComponent(mensaje)
    const url = `https://wa.me/${cel}?text=${mensajeCodificado}`;
    window.open(url, '_blank')
  })
  return { enviarPedido };
}
