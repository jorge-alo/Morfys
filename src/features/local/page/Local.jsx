import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../../../context/DataContext"
import { Banner } from "../component/Banner";
import { Categorias } from "../component/Categorias";
import { Mipedido } from "../../pedido/components/Mipedido";
import '../../../../styles/Local.css'
import { Modal } from "../../../shared/components/Modal";
import { ModalExpired } from "../../../shared/components/ModalExpired";
import { CardSection } from "../../menu/components/CardSection";
import { useLoadLocal } from "../hooks/useLoadLocal";
import { useTituloDinamico } from "../../../shared/hooks/useTituloDinamico";
import { useLogo } from "../../../shared/hooks/useLogo";
import { useScroll } from "../../menu/utils/useScroll";
import { Footer } from "../../menu/components/Footer";

export const Local = () => {
  const { modalIsTrue, logo, restoData, } = useContext(DataContext);
  const { name } = useParams();
  const [comidas, setComidas] = useState([]);
  const [baner, setBaner] = useState(null);
  const [expired, setExpired] = useState(null);
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);

  useLoadLocal(name, setComidas, setBaner, setExpired);
  useTituloDinamico();
  useLogo();
  useScroll();
 
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
      <Footer/>
    </div>
  )
}
