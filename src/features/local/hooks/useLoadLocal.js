import { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";


export const useLoadLocal = (name, setComidas, setBaner, setExpired) => {
    const { getDataComida,  setLogo,  setRestoData } = useContext(DataContext);
    useEffect(() => {
        const loadLocal = async () => {
            try {
                const result = await getDataComida(name);
                setComidas(result.data.comidas);
                setLogo(result.data.logo);
                setBaner(result.data.resto.banner);
                // 2. Guardamos los datos completos del restaurante para el nombre
                setRestoData(result.data.resto);
                console.log("Valor de result en loadLocal", result);
            } catch (error) {
                console.log("Error al cargar los datos", error);
                if (error.response.data.status === "expired") {
                    setExpired(error.response.data.status);
                    return;
                }
            }
        }
        loadLocal();
    }, [name])
}




