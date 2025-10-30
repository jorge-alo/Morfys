import { useEffect, useState } from 'react';
import '../../styles/Modal.css'
import { CardSelection } from './CardSelection';
import { VarianteSelection } from './VarianteSelection';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { ConfirmarEnvio } from './ConfirmarEnvio';

export const Modal = () => {
    const { comidaData,
        setContVariable,
        setModalIsTrue,
        selectedModalEnviar,
        setSelectedModalEnviar,
        setVariantesOpcionesSelecionadas
    } = useContext(DataContext);

    const [selectedVariante, setSelectedVariante] = useState(false);

    // 👇 Manejo del gesto o botón de "atrás"
    useEffect(() => {
        // Cuando se abre el modal, agregamos un estado en el historial
        window.history.pushState({ modal: true }, "");

        const handlePopState = () => {
            // En lugar de volver de página, cerramos el modal
            setModalIsTrue(false);
            setSelectedVariante(false);
            setSelectedModalEnviar(false);
            setVariantesOpcionesSelecionadas({});
            setContVariable(0);
        };

        // Escuchamos el evento "popstate"
        window.addEventListener("popstate", handlePopState);

        // Cuando se desmonta el modal, eliminamos el listener
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []); // Solo cuando se monta el modal

    const handleCloseModal = (e) => {
        if (e.target.classList.contains("section-modal")) {
            setModalIsTrue(false);
            setSelectedVariante(false);
            setSelectedModalEnviar(false);
            setVariantesOpcionesSelecionadas({});
            setContVariable(0);
            // 👇 Cuando se cierra manualmente, también volvemos atrás una vez
            window.history.back();
        }
    }

    const card = selectedModalEnviar
        ?
        (<ConfirmarEnvio />)
        : (
            selectedVariante
                ? <VarianteSelection comidaData={comidaData} setSelectedVariante={setSelectedVariante} />
                : <CardSelection comidaData={comidaData} setSelectedVariante={setSelectedVariante} />
        )

    return (
        <section className="section-modal" onClick={(e) => handleCloseModal(e)}>
            {card}
        </section>

    )
}
