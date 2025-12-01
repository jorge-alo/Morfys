import { useContext, useMemo, useState } from 'react';
import '../../styles/CardSection.css'
import { DataContext } from '../context/DataContext';

export const CardSection = ({ comidas,  handleclickCardISTrue, categoriaAbierta }) => {
  
  const { setComidaData, setModalIsTrue, pedido, logo } = useContext(DataContext);

  console.log("Valor de comidas en cardSection", comidas);
  console.log("Valor de pedido en cardSection", pedido);
  const handleclick = (comida) => {
    console.log("valor de comida en handleClick", comida);
    setComidaData(comida);
    setModalIsTrue(true);
  }

  const comidasPorCategorias = useMemo(() => {
    return comidas?.reduce((acc, comida) => {
      const cat = comida.categoria;
      if (!acc[cat]) acc[cat] = [];
      if (comida.standby != 1 && comida.tamanio != 1) {
        acc[cat].push(comida);
      }
      if (comida.tamanio == 1 && comida.variantes[0].opciones.some(op => op.standby != 1)) {
        acc[cat].push(comida)
      }
      return acc;
    }, {})
  }, [comidas])

  const categoriasOrdenadas = useMemo(() => {
    const categoriasEntries = comidasPorCategorias ? Object.entries(comidasPorCategorias) : null;
    const resultado = [];
    if (comidasPorCategorias && comidasPorCategorias["menu"]) {
      resultado.push(["menu", comidasPorCategorias["menu"]]);
    }
    if (categoriasEntries) {
      for (const [cat, comidasArray] of categoriasEntries) {
        if (cat != "menu") {
          resultado.push([cat, comidasArray]);
        }
      }
    }

    return resultado;
  }, [comidasPorCategorias])

  

  return (
    <section className='container-cardsection'>
      {categoriasOrdenadas.map(([cat, comidasArray]) => {
        if (comidasArray.length > 0) {
          return (
            <div key={cat} className="container-cardsection__card" onClick={() => handleclickCardISTrue(cat)}>
              <h2 id={cat.replace(/\s+/g, '-')} > {cat} </h2>
              <div className="container-cardsection-card__container-data">
                {categoriaAbierta == cat && comidasArray.map(comida => (

                  <div
                    key={comida.id}
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
                            <img src={comida.image} alt={comida.image} />
                          </div>
                          :
                          <div className="container-cardsection__image">
                            <img src={logo}  />
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
                ))}
              </div>
            </div>
          )
        }

      })}
    </section>
  )
}
