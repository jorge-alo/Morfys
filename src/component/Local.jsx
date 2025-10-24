import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../context/DataContext"
import { Banner } from "./Banner";
import { Categorias } from "./Categorias";
import { CardSection } from "./CardSection";
import { Mipedido } from "./Mipedido";
import '../../styles/Local.css'
import { Modal } from "./Modal";

export const Local = () => {
    const { getDataComida, modalIsTrue, setModalIsTrue } = useContext(DataContext);
    const { name } = useParams();
    const [comidas, setComidas] = useState([]);
    const [logo, setLogo] = useState(null);
    

    const loadLocal = async () => {
        try {
            const result = await getDataComida(name);
            setComidas(result.data.comidas);
            setLogo(result.data.logo);
            console.log("Valor de result en loadLocal", result);
        } catch (error) {
            console.log("Error al cargar los datos", error);
        }

    }
    useEffect(() => {
        loadLocal()
    }, [name])

    return (
        <div className="container-local">
            <Banner logo={logo} name={name} />
            <div className="container-local-section">
                <Categorias comidas={comidas} />
                <CardSection comidas={comidas} />
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
