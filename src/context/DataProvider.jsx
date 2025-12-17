import { useState } from 'react';
import { apiGetDataComida, apiGetDataResto, apiPostSendPedido } from '../api/Api.Request';
import { DataContext } from './DataContext'

export const DataProvider = ({ children }) => {
  const [comidaData, setComidaData] = useState({});
  const [modalIsTrue, setModalIsTrue] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [selectedModalEnviar, setSelectedModalEnviar] = useState(false);
  const [contVariable, setContVariable] = useState(0);
  const [logo, setLogo] = useState(null);
  const [variantesOpcionesSelecionadas, setVariantesOpcionesSelecionadas] = useState({});
   // 1. Estado para almacenar los datos completos del restaurante, incluyendo el nombre
  const [restoData, setRestoData] = useState(null);


  const [valueInputEnvio, setValueInputEnvio] = useState({
    metodoEntrega: "",
    metodoPago: "",
    direccion: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueInputEnvio(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleReset = () => {
    setValueInputEnvio({
      metodoEntrega: "",
      metodoPago: "",
      direccion: ""
    }
    )
  }

  const getDataComida = (name) => {
    try {
      const result = apiGetDataComida(name);
      return result
    } catch (error) {
      console.log("Valor de error en getDataComida", error);
      return error
    }

  }
  const getDataResto = async (name) => {
    const result = await apiGetDataResto(name);
    console.log("Valor de resutl en getDataResto", result);
    return result
  }

   const postSendPedido = async (pedido) => {
    const result = await apiPostSendPedido(pedido);
    return result
  }
  return (
    <DataContext.Provider value={{restoData, setRestoData, postSendPedido, handleReset, logo, setLogo, contVariable, setContVariable, valueInputEnvio, variantesOpcionesSelecionadas, setVariantesOpcionesSelecionadas, handleChange, getDataComida, getDataResto, selectedModalEnviar, setSelectedModalEnviar, comidaData, setComidaData, modalIsTrue, setModalIsTrue, pedido, setPedido }}>
      {children}
    </DataContext.Provider>
  )
}
