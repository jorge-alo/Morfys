import { useState, useCallback, useMemo } from 'react';
import { apiGetDataComida, apiGetDataResto, apiPostSendPedido } from '../api/Api.Request';
import { DataContext } from './DataContext';

export const DataProvider = ({ children }) => {
    // ESTADOS
    const [comidaData, setComidaData] = useState({});
    const [modalIsTrue, setModalIsTrue] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [selectedModalEnviar, setSelectedModalEnviar] = useState(false);
    const [contVariable, setContVariable] = useState(0);
    const [logo, setLogo] = useState(null);
    const [variantesOpcionesSelecionadas, setVariantesOpcionesSelecionadas] = useState({});
    const [restoData, setRestoData] = useState(null);
    const [valueInputEnvio, setValueInputEnvio] = useState({
        metodoEntrega: "",
        metodoPago: "",
        direccion: ""
    });

    // FUNCIONES OPTIMIZADAS CON useCallback
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setValueInputEnvio(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleReset = useCallback(() => {
        setValueInputEnvio({
            metodoEntrega: "",
            metodoPago: "",
            direccion: ""
        });
    }, []);

    const getDataComida = useCallback(async (name) => {
        try {
            const result = await apiGetDataComida(name);
            return result;
        } catch (error) {
            console.error("Error en getDataComida", error);
            throw error; // Re-lanzar para manejarlo en el componente
        }
    }, []);

    const getDataResto = useCallback(async (name) => {
        const result = await apiGetDataResto(name);
        return result;
    }, []);

    const postSendPedido = useCallback(async (pedido) => {
        const result = await apiPostSendPedido(pedido);
        return result;
    }, []);

    // OBJETO DE CONTEXTO MEMOIZADO
    // Solo cambia si alguno de estos valores de estado cambia.
    const contextValue = useMemo(() => ({
        restoData, 
        setRestoData, 
        postSendPedido, 
        handleReset, 
        logo, 
        setLogo, 
        contVariable, 
        setContVariable, 
        valueInputEnvio, 
        variantesOpcionesSelecionadas, 
        setVariantesOpcionesSelecionadas, 
        handleChange, 
        getDataComida, 
        getDataResto, 
        selectedModalEnviar, 
        setSelectedModalEnviar, 
        comidaData, 
        setComidaData, 
        modalIsTrue, 
        setModalIsTrue, 
        pedido, 
        setPedido 
    }), [
        restoData, 
        logo, 
        contVariable, 
        valueInputEnvio, 
        variantesOpcionesSelecionadas, 
        selectedModalEnviar, 
        comidaData, 
        modalIsTrue, 
        pedido,
        // Funciones estables
        postSendPedido,
        handleReset,
        handleChange,
        getDataComida,
        getDataResto
    ]);

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};