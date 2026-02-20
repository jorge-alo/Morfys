import { useContext, useEffect } from 'react'; // Agregado useEffect
import '../../../../styles/CardSection.css'
import { DataContext } from '../../../context/DataContext';
import { useCategoriasComidas } from '../hooks/useCategoriasComidas';
import { useScroll } from '../utils/useScroll';
import { CategoriasCard } from './CategoriasCard';

export const CardSection = ({ comidas, handleclickCardISTrue, categoriaAbierta }) => {

  const { categoriasOrdenadas } = useCategoriasComidas(comidas)

  // --- SOLUCIÓN DEL SCROLL ---
  useScroll(categoriaAbierta);
  // ---------------------------

  return (
    <section className='container-cardsection'>
      {categoriasOrdenadas.map(([cat, comidasArray]) => (
        <CategoriasCard
          key={cat}
          cat={cat}
          comidasArray={comidasArray}
          categoriaAbierta={categoriaAbierta}
          handleclickCardISTrue={handleclickCardISTrue}
        />
      ))}
    </section>
  )
}
