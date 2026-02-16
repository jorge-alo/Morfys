import { useContext } from 'react';
import '../../../../styles/Banner.css'
import { DataContext } from '../../../context/DataContext';

export const Banner = ({ baner, name, logo }) => {
  const {restoData} = useContext(DataContext);

    const banner = baner ? `${baner}` : 'https://res.cloudinary.com/dmnqe1fmn/image/upload/fondoBaner_zeeidl.webp'
    console.log("Valor de banner en Baner", banner);
    return (
        <section className='section-banner'style={{backgroundImage: `url(${banner})` }}>

            <div className='container-data-banner'>
                {
                    logo ?
                        <div className='logo-en-baner'>
                            <img src={logo} alt={`Logo de ${name}`} />
                        </div>
                        :
                        <h2>{name}</h2>
                }

                <div className='container-horario-resto'>
                    {
                        restoData &&
                        <div>
                            <p> Abierto de {restoData?.diaManianaEntrada} a {restoData?.diaManianaSalida} de {restoData?.horarioManianaEntrada} a {restoData?.horarioManianaSalida} {restoData.diaTardeEntrada && `y  de ${restoData.horarioTardeEntrada} a ${restoData.horarioTardeSalida}`} </p>
                            <p> <span className='container-horario-resto__envio'>Envio minimo</span> ${restoData.envio} --  <span className='container-horario-resto__envio'>Pedido minimo</span> ${restoData.envioMinimo}</p>
                        </div>

                    }
                </div>
            </div>
        </section>
    )
}
