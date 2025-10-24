import { useCallback } from "react"


export const useWhatsApp = () => {
  const enviarPedido = useCallback((cel, metodoEntrega, metodoPago, direccion, pedido) => {
    console.log("Valor de cel, metodoEntrega,metodoPago, direccion", cel, metodoEntrega, metodoPago, direccion);

    const fecha = new Date().toLocaleString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    const mensaje = `¡NUEVO PEDIDO!\n\n` +
      `Fecha: ${fecha}\n` +
      `Forma de entrega: ${metodoEntrega === 'local' ? 'Retira en el local' : 'Envió a domicilio'}\n` +
      `Método de pago: ${metodoPago}\n` +
      (metodoEntrega === 'envienmelo' ? `Ubicación: ${direccion}\n` : '') +
      `Pedido:\n${pedido.map(p => {
        const lineaPrincipal = ` ${p.tamanio ? "" : p.cant} ${p.name} ${p.tamanio ? "" : '$' + p.priceVariable}`;
        const variantes = p.variantes?.length > 0
          ? `${p.variantes[0].nombre}:\n` + Object.entries(p.variantesOpcionesSelecionadas).map(([nombre, valor]) =>
            `  ${valor.cantOpciones}x ${nombre} $${valor.valor}`
          ).join('\n')
          : '';
        return `${lineaPrincipal}${variantes ? '\n' + variantes : ''}`;
      }).join('\n-------------------\n')}\n\n` +
      `Total: $${pedido.reduce((sum, item) => sum + (item.totalComida ? Number(item.totalComida) : Number(item.priceVariable)),0)}`;

    // Codificación correcta del mensaje (conserva emojis)
    const mensajeCodificado = encodeURIComponent(mensaje)
    const url = `https://wa.me/${cel}?text=${mensajeCodificado}`;
    window.open(url, '_blank')
  })
  return { enviarPedido };
}
