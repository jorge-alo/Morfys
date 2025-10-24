import { useState } from 'react';
import '../../styles/Modal.css'
import { CardSelection } from './CardSelection';
import { VarianteSelection } from './VarianteSelection';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { ConfirmarEnvio } from './ConfirmarEnvio';

export const Modal = () => {
    const { comidaData, setModalIsTrue, selectedModalEnviar, setSelectedModalEnviar, setVariantesOpcionesSelecionadas } = useContext(DataContext);
    const [selectedVariante, setSelectedVariante] = useState(false);
    console.log("Valor de selectedModalEnviar en modal", selectedModalEnviar);
    const handleCloseModal = (e) => {
        if (e.target.classList.contains("section-modal")) {
            setModalIsTrue(false);
            setSelectedVariante(false);
            setSelectedModalEnviar(false);
            setVariantesOpcionesSelecionadas({});
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
