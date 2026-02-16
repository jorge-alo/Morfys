import { useContext, useEffect } from 'react'; // Agregado useEffect
import '../../../../styles/CardSection.css'
import { DataContext } from '../../../context/DataContext';
import { useCategoriasComidas } from '../hooks/useCategoriasComidas';
import { CategoriasCard } from './CategoriasCard';

export const CardSection = ({ comidas,  handleclickCardISTrue, categoriaAbierta }) => {
  
  const { setComidaData, setModalIsTrue, logo } = useContext(DataContext);
  const { categoriasOrdenadas } = useCategoriasComidas(comidas)

  const handleclick = (comida) => {
    setComidaData(comida);
    setModalIsTrue(true);
  }

  // --- SOLUCIÓN DEL SCROLL ---
  useEffect(() => {
    if (categoriaAbierta) {
      const timeoutId = setTimeout(() => {
        const id = categoriaAbierta.replace(/\s+/g, '-');
        const elemento = document.getElementById(id);
        if (elemento) {
          const yOffset = -200; 
          const y = elemento.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [categoriaAbierta]);
  // ---------------------------

  
  return (
    <section className='container-cardsection'>
      {categoriasOrdenadas.map(([cat, comidasArray]) => (
       <CategoriasCard
       key={cat}
       cat= {cat}
       comidasArray={comidasArray} 
       categoriaAbierta={categoriaAbierta}
       handleclickCardISTrue={handleclickCardISTrue}
       handleclick= {handleclick}
       logo= {logo}
       />
      ))}
    </section>
  )
}
