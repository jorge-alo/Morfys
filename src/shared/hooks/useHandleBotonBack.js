import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";

export const useHandleBotonBack = ( setSelectedVariante ) => {

     const {
            handleReset,
            setContVariable,
            setModalIsTrue,
            setSelectedModalEnviar,
            setVariantesOpcionesSelecionadas
        } = useContext(DataContext);

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
  
}
