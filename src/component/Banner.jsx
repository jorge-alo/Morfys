import { useContext, useEffect, useState } from 'react';
import '../../styles/Banner.css'
import { DataContext } from '../context/DataContext';

export const Banner = ({ baner, name }) => {
    const { getDataResto } = useContext(DataContext);
    const [resto, setResto] = useState("");

    console.log("valor de resto en Banner", resto);
    const handleGetDataResto = async () => {
        try {
            const result = await getDataResto(name)
            setResto(result.data.resto);
            console.log("Valor de result en baner", result);
        } catch (error) {
            console.log("Error al obtener getDataResto", error);
        }
    }

    useEffect(() => {
        console.log("Ejecutando el useEffect para corroborar");
        handleGetDataResto()
    }, [name])

    const banner = baner ? `${baner}` : 'https://res.cloudinary.com/dmnqe1fmn/image/upload/fondoBaner_zeeidl.webp'
    console.log("Valor de banner en Baner", banner);
    return (
        <section
            className='section-banner'
            style={{
                backgroundImage: `url(${banner})` 
            }}
        >

            <div className='container-data-banner'>
                <h2>{name}</h2>
                <div className='container-horario-resto'>
                    {
                        resto &&
                        <div>
                            <p> Abierto de {resto?.diaManianaEntrada} a {resto?.diaManianaSalida} de {resto?.horarioManianaEntrada} a {resto?.horarioManianaSalida} {resto.diaTardeEntrada && `y  de ${resto.horarioTardeEntrada} a ${resto.horarioTardeSalida}`} </p>
                            <p> <span className='container-horario-resto__envio'>Envio minimo</span> ${resto.envio} --  <span className='container-horario-resto__envio'>Pedido minimo</span> ${resto.envioMinimo}</p>
                        </div>

                    }

                </div>
            </div>


        </section>



    )
}
