import { useCallback } from "react"

export const useWhatsApp = () => {
  // Agregamos ubicacionLink como último parámetro con un valor por defecto vacío
  const enviarPedido = useCallback((cel, metodoEntrega, metodoPago, direccion, pedido, ubicacionLink = "") => {
    
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

    // --- CONSTRUCCIÓN DEL MENSAJE (Tu estructura original mantenida) ---
    const mensaje = `¡NUEVO PEDIDO!\n\n` +
      `Fecha: ${fecha}\n` +
      `Forma de entrega:  ${iconoEntrega} ${metodoEntrega === 'Local' ? 'Retira en el local' : 'Envió a domicilio'}\n` +
      `Método de pago: ${iconoPago} ${metodoPago}\n` +
      
      // Aquí insertamos la lógica de ubicación mejorada
      (metodoEntrega === 'Envienmelo' 
        ? `Ubicación: ${direccion}\n${ubicacionLink ? `📍 Mapa: ${ubicacionLink}\n` : ''}` 
        : '') +
      
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

    const mensajeCodificado = encodeURIComponent(mensaje)
    const url = `https://wa.me/${cel}?text=${mensajeCodificado}`;
    window.open(url, '_blank')
  }, []) // Dependencias vacías para useCallback

  return { enviarPedido };
}