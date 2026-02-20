import { ComidaCard } from "./ComidaCards/ComidaCard"


export const CategoriasCard = ({
    cat,
    comidasArray,
    categoriaAbierta,
    handleclickCardISTrue,
     }
) => {
    if (comidasArray.length > 0) {
        return (
            <div  className="container-cardsection__card" onClick={() => handleclickCardISTrue(cat)}>
                <h2 id={cat.replace(/\s+/g, '-')} > {cat} </h2>
                <div className="container-cardsection-card__container-data">
                    {categoriaAbierta === cat && comidasArray.map(comida => (
                        <ComidaCard
                            key={comida.id}
                            comida={comida}
                        />
                    ))}
                </div>
            </div>
        )
    }
}
