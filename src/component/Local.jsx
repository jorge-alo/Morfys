import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../context/DataContext"
import { Banner } from "./Banner";
import { Categorias } from "./Categorias";
import { CardSection } from "./CardSection";
import { Mipedido } from "./Mipedido";
import '../../styles/Local.css'
import { Modal } from "./Modal";
import { ModalExpired } from "./ModalExpired";
const MORFIS_DEFAULT_LOGO = "/morfis-logo.png";


export const Local = () => {
  const { getDataComida, modalIsTrue, logo, setLogo, restoData, setRestoData } = useContext(DataContext);
  const { name } = useParams();
  const [comidas, setComidas] = useState([]);
  const [baner, setBaner] = useState(null);
  const [expired, setExpired] = useState(null);
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);



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
  useEffect(() => {
    loadLocal()
  }, [name])

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

  useEffect(() => {
    if (modalIsTrue) {
      document.body.style.overflow = "hidden"; // bloquea scroll de fondo
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIsTrue]);

  const handleclickCardISTrue = (cat) => {
    setCategoriaAbierta(prev => prev == cat ? null : cat);
  }
  if (!restoData) return <p>Cargando menú...</p>;
  return (
    <div className="container-local">
      {expired && <ModalExpired />}
      <Banner baner={baner} name={name} logo={logo} />
      <div className="container-local-section">
        <Categorias comidas={comidas} handleclickCardISTrue={handleclickCardISTrue} />
        <CardSection categoriaAbierta={categoriaAbierta} comidas={comidas} handleclickCardISTrue={handleclickCardISTrue} />
        <Mipedido />
      </div>
      {
        modalIsTrue
          ?
          <Modal />
          : ""
      }
      <footer className="footer-fijo">
        <div className="footer-content">
          {/* Enlace a la web de Morfis */}
          <a
            href="https://morfis.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link morfis-web"
          >
            <span>Obtené tu menú con </span>
            <strong>Morfis.com.ar</strong>
          </a>

          {/* Enlace a tu WhatsApp */}
          <a
            href="https://wa.me/5491144040093" // <--- CAMBIA ESTO por tu número (formato internacional)
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link whatsapp-contact"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              width="20"
            />
            <span>Soporte / Contacto</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
