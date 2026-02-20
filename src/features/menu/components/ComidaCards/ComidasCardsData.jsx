import { useContext } from "react";
import { DataContext } from "../../../../context/DataContext";


export const ComidasCardsData = ({ comida }) => {
    const { setComidaData, setModalIsTrue, logo } = useContext(DataContext);

    const handleclick = (comida) => {
        setComidaData(comida);
        setModalIsTrue(true);
    }
    return (
        <div
            className="container-cardsection-card__data"
            onClick={(e) => {
                e.stopPropagation();
                handleclick(comida)
            }}>
            <h3>{comida.name}</h3>
            <div className='card-data'>

                {
                    comida.image
                        ?
                        <div className="container-cardsection__image">
                            <img src={comida.image} alt={comida.image} loading="lazy" />
                        </div>
                        :
                        <div className="container-cardsection__image">
                            <img src={logo} />
                        </div>
                }
                {
                    comida.price == 0 && comida.variantes.length > 0
                        ?
                        <div className='container-opciones'>
                            <h4> {comida.description} </h4>
                            {comida.variantes[0].opciones.map((op, index) => {
                                if (op.standby != 1) {
                                    return <div key={index} className='container-opciones__data'>
                                        <p > {op.nombre}:</p> <p>${Math.floor(op.precio_adicional)} </p>
                                    </div>
                                }
                                return null
                            })}
                        </div>
                        :
                        <div className='container-opciones__sinvariantes'>
                            <h4> {comida.description} </h4>
                            <p> precio: ${comida.price} </p>
                        </div>
                }
            </div>
        </div>
    )

}
