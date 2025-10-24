import '../../styles/Categorias.css'

export const Categorias = ({ comidas }) => {

  const categoriasUnicas = [];
  comidas?.forEach(comida => {
    if (!categoriasUnicas.includes(comida.categoria)) {
      categoriasUnicas.push(comida.categoria);
    }
  })
  console.log("Valor de categoriasUmicas", categoriasUnicas);
  return (
    <div className='container-categorias'>
      <div className='container-categorias__fullScream'>
        <h3> Categorias</h3>
        {categoriasUnicas.map((cat, index) => (
          <a key={index} href={`#${cat.replace(/\s+/g, '-')} `} > {cat} </a>
        ))}
      </div>

      <div className='container-categorias__mobile'>
        <div className='container-categorias-mobile__items'>
          <div>
            {categoriasUnicas.map((cat, index) => (
              <a key={index} href={`#${cat.replace(/\s+/g, '-')} `} > {cat} </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
