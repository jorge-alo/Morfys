import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";

const MORFIS_DEFAULT_LOGO = "/morfis-logo.png";

export const useLogo = () => {

    const { logo } = useContext(DataContext);

    useEffect(() => {
        // ... (código para encontrar o crear el link)
        // Encontramos el elemento <link> con rel="icon"
        let link = document.querySelector("link[rel~='icon']");

        if (!link) {
            // Si el link no existe (raro), lo creamos
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        if (logo) {
            link.href = logo; // Logo del local
        } else {
            link.href = MORFIS_DEFAULT_LOGO; // Logo de Morfis
        }

        return () => {
            link.href = MORFIS_DEFAULT_LOGO; // Restaurar al logo de Morfis al salir
        };

    }, [logo]);
}
