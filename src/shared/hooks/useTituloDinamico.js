import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";


export const useTituloDinamico = () => {

    const { restoData, } = useContext(DataContext);
    // 3. NUEVO useEffect para manejar el título dinámico
    useEffect(() => {
        // Verificamos si los datos del restaurante han cargado y tienen un nombre
        if (restoData && restoData.local) {
            // Usamos 'restoData.nombre' (cambia 'nombre' si tu propiedad es 'name')
            document.title = `Morfis: ${restoData.local}`;
        } else {
            // Título por defecto mientras está cargando
            document.title = 'Morfis: Cargando Menú...';
        }

        // 4. Limpieza (opcional pero recomendado):
        // Cuando el componente se desmonta (ej: navegamos a otra página),
        // restauramos el título o lo dejamos en el genérico.
        return () => {
            document.title = 'Morfis';
        };
    }, [restoData]); // Dependencia: Se ejecuta cuando 'restoData' cambia
}
