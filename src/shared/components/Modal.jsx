import { useEffect, useState } from 'react';
import '../../../styles/Modal.css'
import { CardSelection } from './CardSelection';
import { VarianteSelection } from './VarianteSelection';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { ConfirmarEnvio } from '../../features/pedido/components/ConfirmarEnvio';
import { useHandleBotonBack } from '../hooks/useHandleBotonBack';

export const Modal = () => {
    const { selectedModalEnviar } = useContext(DataContext);

    const [selectedVariante, setSelectedVariante] = useState(null);

    useHandleBotonBack( setSelectedVariante );

    const handleCloseModal = (e) => {
        if (e.target.classList.contains("section-modal")) {
            // Al ejecutar back(), el navegador dispara 'popstate' 
            // y el useEffect se encarga de limpiar TODO.
            window.history.back();
        }
    }

    const card = selectedModalEnviar
        ?
        (<ConfirmarEnvio />)
        : (
            selectedVariante
                ? <VarianteSelection
                    varianteActual={selectedVariante}
                    setSelectedVariante={setSelectedVariante} />
                : <CardSelection
                    setSelectedVariante={setSelectedVariante} />
        )

    return (
        <section className="section-modal" onClick={(e) => handleCloseModal(e)}>
            {card}
        </section>

    )
}
