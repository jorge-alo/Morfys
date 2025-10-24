import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import '../../styles/CardSelection.css'

export const CardSelection = ({ setSelectedVariante }) => {
    const { comidaData, setComidaData, setModalIsTrue, setPedido, variantesOpcionesSelecionadas, setVariantesOpcionesSelecionadas, contVariable, setContVariable } = useContext(DataContext);
    const [cont, setCont] = useState(() => comidaData.cant || 1);


    const handleSumar = () => {
        setCont(prev => prev + 1)
    }

    const handleRestar = () => {
        if (cont > 1) {
            setCont(prev => prev - 1);
        }
    }
    useEffect(() => {

        setComidaData(item => {
            if (item.tamanio == 1) {
                return {
                    ...item,
                    variantesOpcionesSelecionadas
                }
            }
            const priceVariable = Number(item.price) * Number(cont);
            if (cont != item.cant && comidaData.variantesOpcionesSelecionadas) {
                setContVariable(0);
                setVariantesOpcionesSelecionadas({});
                const { variantesOpcionesSelecionadas, ...rest } = item;
                return {
                    ...rest,
                    cant: cont,
                    priceVariable
                }
            }
            return {
                ...item,
                cant: cont,
                priceVariable
            }
        })
    }, [cont, variantesOpcionesSelecionadas])

    const handleClickEnviar = () => {


        setPedido(pedidoPrevio => {

            const siYaExiste = pedidoPrevio.some(item => item.id == comidaData.id);

            if (siYaExiste) {
                return pedidoPrevio.map(item =>
                    item.id == comidaData.id
                        ? comidaData
                        : item
                )
            } else {
                return [...pedidoPrevio, comidaData]
            }
        })
        setContVariable(0);
        setVariantesOpcionesSelecionadas({});
        setModalIsTrue(false);
    }

    const handleTamañoSumar = (opcion) => {
        setVariantesOpcionesSelecionadas(prev => {
            const prevOpciones = prev[opcion.nombre] || { cantOpciones: 0, valor: 0 }
            const nuevoValor = prevOpciones.cantOpciones + 1;

            const actualizado = {
                ...prev,
                [opcion.nombre]: {
                    cantOpciones: nuevoValor,
                    valor: Number(opcion.precio_adicional) * nuevoValor
                }
            }

            if (comidaData.tamanio) {
                const priceVariable = Object.entries(actualizado).reduce((acc, [key, obj]) => {
                    return acc + obj.valor;
                }, 0);

                setComidaData(prev => {
                    return {
                        ...prev,
                        priceVariable
                    }

                })
            }


            return actualizado;
        })
    }
    console.log("Valor de comidaData", comidaData);
    console.log("Valor de varianteOpcionesSeleccionadas en cardSelection", variantesOpcionesSelecionadas);

    const handleTamañoRestar = (opcion) => {
        setVariantesOpcionesSelecionadas(prev => {
            if (prev[opcion.nombre].cantOpciones > 0) {

                const nuevoValor = prev[opcion.nombre].cantOpciones - 1;
                const actualizado = {
                    ...prev,
                    [opcion.nombre]: {
                        cantOpciones: nuevoValor,
                        valor: Number(opcion.precio_adicional) * nuevoValor
                    }
                }

                if (comidaData.tamanio) {
                    const priceVariable = Object.entries(actualizado).reduce((acc, [key, obj]) => {
                        return acc + obj.valor;
                    }, 0);
                    setComidaData(item => ({
                        ...item,
                        priceVariable
                    })
                    )
                }
                return actualizado;
            } else {
                return prev
            }

        })

    }
    const price = comidaData.variantesOpcionesSelecionadas
        ?
        (comidaData.tamanio == 1 ? comidaData.priceVariable : comidaData.totalComida)
        :
        comidaData.priceVariable;

    return (
        <div className="container-modal">
            <div className="container-modal__data">
                <p className='modal-cerrar' onClick={() => setModalIsTrue(false)}> X </p>
                <h3> {
                    (comidaData.variantes && comidaData.variantes.length == 0)
                        ? comidaData.name
                        : comidaData.categoria}
                </h3>
                <div className="container-modal__image">
                    <img src={comidaData.image} />
                </div>
                <div className='container-modal__description'>
                    <div className='description'>
                        <div className="container-modal__container-description">
                            {
                                comidaData.tamanio == 1
                                    ?

                                    <h5> {comidaData.name} </h5>

                                    :
                                    <>
                                        <h5>{ comidaData.price  == 0 ? "" : `${cont}X` }</h5>
                                        <h5> {comidaData.name} </h5>
                                       { comidaData.price == 0 ? "" : <h5 className="container-modal__container-description_price"> (${comidaData.price}) </h5>}
                                    </>
                            }

                        </div>
                        <h5> {comidaData.description} </h5>
                    </div>
                    {comidaData.tamanio ? "" : comidaData.price == 0 ? "" : <p> ${comidaData.priceVariable} </p>}
                </div>
                {
                    comidaData.tamanio ? ""
                        :
                        comidaData.variantesOpcionesSelecionadas
                            ?
                            <div className="variantesOpcionesSeleccionadas">
                                {Object.entries(comidaData.variantesOpcionesSelecionadas).map(([nombre, item]) => (
                                    <div key={nombre} className="variantesOpcionesSeleccionadas__data">
                                        <div>
                                            <h6> {item.cantOpciones}X </h6>
                                            <h5> {nombre} </h5>
                                        </div>
                                        <h5> {item.valor == 0 ? "" : `$${item.valor}`}  </h5>
                                    </div>
                                ))}
                            </div>
                            : ""
                }
                <div>
                </div>
            </div>
            {
                comidaData.tamanio
                    ?
                    comidaData.variantes && comidaData.variantes.length > 0 &&
                    <div className="container-tamaño">
                        <span> {comidaData.variantes[0].nombre} </span>
                        {Object.entries(comidaData.variantes[0].opciones).map(([op, valor]) => (
                            valor.standby == 0 &&
                            <div key={valor.nombre} className="container-tamaño__opcion">
                                <div className="container-tamaño-opcion__seleccion">
                                    <h5>{valor.nombre} / ${valor.precio_adicional}</h5>
                                    <div className="container-tamaño-opcion-seleccion__sumar-restar">
                                        <span onClick={() => handleTamañoRestar(valor)} >-</span>
                                        <p> {variantesOpcionesSelecionadas[valor.nombre] ? variantesOpcionesSelecionadas[valor.nombre].cantOpciones : 0} </p>
                                        <span onClick={() => handleTamañoSumar(valor)} >+</span>
                                    </div>
                                </div>

                            </div>

                        ))}
                    </div>
                    :
                    comidaData.variantes && comidaData.variantes.length > 0 &&
                    <div className='container-variantes'>
                        <span>{comidaData.variantes[0].nombre}</span> <p onClick={() => setSelectedVariante(true)} >Seleccionar</p>
                    </div>
            }

            {
                comidaData.tamanio == 1
                    ? ""
                    :
                    comidaData.price == 0
                    ? ""
                    :
                    <div className='container-unidades'>
                        <p>Unidades</p>
                        <div>
                            <span onClick={handleRestar} >-</span>
                            <p> {cont} </p>
                            <span onClick={handleSumar}>+</span>
                        </div>
                    </div>
            }

            <button
                onClick={handleClickEnviar}
                className={
                    comidaData.tamanio == 1
                        ?
                        (comidaData.variantesOpcionesSelecionadas && Object.entries(comidaData.variantesOpcionesSelecionadas).length > 0)
                            ?
                            'modal-button'
                            :
                            'modal-buton-disable'
                        :
                        comidaData.variantes && comidaData.variantes.length > 0
                            ?
                            comidaData.variantesOpcionesSelecionadas
                                ? 'modal-button'
                                : 'modal-buton-disable'
                            :
                            'modal-button'
                }
                disabled={
                    comidaData.tamanio == 1
                        ?
                        !(comidaData.variantesOpcionesSelecionadas && Object.entries(comidaData.variantesOpcionesSelecionadas).length > 0)
                        :
                        comidaData.variantes && comidaData.variantes.length > 0
                            ? !comidaData.variantesOpcionesSelecionadas
                            : false
                }
            >
                {
                    comidaData.tamanio == 1
                        ?
                        comidaData.variantesOpcionesSelecionadas && Object.entries(comidaData.variantesOpcionesSelecionadas).length > 0
                            ?
                            <p> Agregar a mi pedido</p>
                            :
                            <p> Selecciona al menos una</p>
                        :
                        comidaData.variantes && comidaData.variantes.length > 0
                            ?
                            comidaData.variantesOpcionesSelecionadas
                                ?
                                <p> Agregar a mi pedido</p>
                                :
                                <p>Selecciona {comidaData.variantes[0].nombre} para continuar</p>
                            :
                            <p> Agregar a mi pedido</p>
                }
                <p> ${price ?? 0} </p>
            </button>
        </div >
    )
}
