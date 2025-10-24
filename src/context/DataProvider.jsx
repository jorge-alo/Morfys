import { useState } from 'react';
import { apiGetDataComida, apiGetDataResto } from '../api/Api.Request';
import { DataContext } from './DataContext'

export const DataProvider = ({children}) => {
  const [comidaData, setComidaData] = useState({});
  const [modalIsTrue, setModalIsTrue] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [selectedModalEnviar, setSelectedModalEnviar] = useState(false);
  const [contVariable, setContVariable] = useState(0);
  const [variantesOpcionesSelecionadas, setVariantesOpcionesSelecionadas] = useState({});
 

  const [valueInputEnvio, setValueInputEnvio] = useState({
    metodoEntrega: "envienmelo",
    metodoPago: "efectivo",
    direccion: ""
  })

  const handleChange = (e) => {
    const { name, value} = e.target;
    setValueInputEnvio(prev => ({
      ...prev,
      [name]: value
    }))
  }

    const getDataComida = (name) => {
      const result = apiGetDataComida(name);
      return result
    }
    const getDataResto = async (name) => {
      const result = await apiGetDataResto(name);
      console.log("Valor de resutl en getDataResto", result);
      return result
    }
  return (
    <DataContext.Provider value={{contVariable, setContVariable, valueInputEnvio, variantesOpcionesSelecionadas, setVariantesOpcionesSelecionadas, handleChange, getDataComida, getDataResto, selectedModalEnviar, setSelectedModalEnviar, comidaData, setComidaData, modalIsTrue, setModalIsTrue, pedido, setPedido}}>
        {children}
    </DataContext.Provider>
  )
}
