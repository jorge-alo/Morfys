import { useEffect, useState } from 'react';
import '../../../styles/Modal.css'
import { CardSelection } from './CardSelection';
import { VarianteSelection } from './VarianteSelection';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { ConfirmarEnvio } from '../../features/pedido/components/ConfirmarEnvio';

export const Modal = () => {
    const {
        handleReset,
        comidaData,
        setContVariable,
        setModalIsTrue,
        selectedModalEnviar,
        setSelectedModalEnviar,
        setVariantesOpcionesSelecionadas
    } = useContext(DataContext);

    const [selectedVariante, setSelectedVariante] = useState(null);

    // 👇 Manejo del gesto o botón de "atrás"
  // Modal.jsx
useEffect(() => {
    // 1. Solo agregamos estado si no existe ya
    if (window.history.state?.modal !== true) {
        window.history.pushState({ modal: true }, "");
    }

    const handlePopState = (e) => {
        // Solo cerramos si el evento popstate NO tiene el estado modal
        // (es decir, el usuario fue hacia atrás)
        if (!e.state?.modal) {
            setModalIsTrue(false);
            // Limpieza de estados...
            setSelectedVariante(null);
            setSelectedModalEnviar(false);
            setVariantesOpcionesSelecionadas({});
            setContVariable(0);
            handleReset();
        }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
        window.removeEventListener("popstate", handlePopState);
        // QUITAMOS el history.back() de aquí para que 
        // si el componente parpadea, no cierre la app.
    };
}, []);

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
