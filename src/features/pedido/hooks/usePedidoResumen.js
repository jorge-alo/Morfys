import { useContext, useMemo } from 'react'
import { DataContext } from '../../../context/DataContext';

export const usePedidoResumen = () => {

const { pedido, restoData } = useContext(DataContext);

    const subtotal = useMemo(() => {
        return pedido.reduce((acc, item) => (
            acc + (item.totalComida ? Number(item.totalComida) : Number(item.priceVariable))
        ), 0);
    }, [pedido]);

    const envioMinimo = Number(restoData?.envioMinimo) || 0;
    const faltaParaMinimo = envioMinimo - subtotal;
    const noAlcanzaMinimo = subtotal < envioMinimo;
    return {
        pedido,
        subtotal,
        envioMinimo,
        faltaParaMinimo,
        noAlcanzaMinimo
    }

}
