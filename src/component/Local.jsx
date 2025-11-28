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

export const Local = () => {
    const { getDataComida, modalIsTrue, setModalIsTrue } = useContext(DataContext);
    const { name } = useParams();
    const [comidas, setComidas] = useState([]);
    const [logo, setLogo] = useState(null);
    const [baner, setBaner] = useState(null);
    const [expired, setExpired] = useState(null);
    

    const loadLocal = async () => {
        try {
            const result = await getDataComida(name);
           
            setComidas(result.data.comidas);
            setLogo(result.data.logo);
            setBaner(result.data.baner);
            console.log("Valor de result en loadLocal", result);
        } catch (error) {
            console.log("Error al cargar los datos", error);
            if(error.response.data.status === "expired"){
                setExpired(error.response.data.status);
                return;
           }
        }

    }
    useEffect(() => {
        loadLocal()
    }, [name])

    return (
        <div className="container-local">
            { expired && <ModalExpired/>}
            <Banner baner={baner} name={name} logo={logo}/>
            <div className="container-local-section">
                <Categorias comidas={comidas} />
                <CardSection comidas={comidas} logo={logo}/>
                <Mipedido />
            </div>
            {
                modalIsTrue
                    ?
                    <Modal />
                    : ""
            }
        </div>
    )
}
