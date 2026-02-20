import { useContext } from "react";
import { DataContext } from "../../context/DataContext";


export const CardSelectionModalData = ({cont}) => {
     const { comidaData, logo } = useContext(DataContext);
    return (
        <div className="container-modal__data">
            <p className='modal-cerrar' onClick={() => window.history.back()}> X </p>
            <h3> {
                (comidaData.variantes && comidaData.variantes.length == 0)
                    ? comidaData.name
                    : comidaData.categoria}
            </h3>
            {
                comidaData.image
                    ? <div className="container-modal__image">
                        <img src={comidaData.image} />
                    </div>
                    : <div className="container-modal__image">
                        <img src={logo} />
                    </div>
            }

            <div className='container-modal__description'>
                <div className='description'>
                    <div className="container-modal__container-description">
                        {
                            comidaData.tamanio == 1
                                ?

                                <h5> {comidaData.name} </h5>

                                :
                                <div>
                                    <h7>{comidaData.price == 0 ? "" : `${cont}X`}</h7>
                                    <h5> {comidaData.name} </h5>
                                    {comidaData.price == 0 ? "" : <h5 className="container-modal__container-description_price"> (${comidaData.price}) </h5>}
                                </div>
                        }

                    </div>
                </div>
                {comidaData.tamanio ? "" : comidaData.price == 0 ? "" : <p className="pricevariable"> ${comidaData.priceVariable} </p>}
            </div>
            {
                !comidaData.tamanio && comidaData.variantesOpcionesSelecionadas && (
                    <div className="variantesOpcionesSeleccionadas">
                        {Object.entries(comidaData.variantesOpcionesSelecionadas).map(([grupoNombre, opciones]) => (
                            // Recorremos cada opción dentro del grupo (ej: Jamon, Carne...)
                            <div key={grupoNombre}>
                                <h5> {grupoNombre} </h5>
                                {Object.entries(opciones).map(([nombreOpcion, detalle]) => (
                                    <div key={nombreOpcion} className="variantesOpcionesSeleccionadas__data">
                                        <div>
                                            <h6> {detalle.cantOpciones}X </h6>
                                            <h5> {nombreOpcion} </h5>
                                        </div>
                                        <h5> {detalle.valor > 0 ? `$${detalle.valor}` : ""} </h5>
                                    </div>
                                ))}
                            </div>
                        ))
                        }
                    </div>
                )
            }
            <div>
            </div>
        </div>
    )
}
