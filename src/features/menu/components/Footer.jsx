

export const Footer = () => {
    return (
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
    )
}
