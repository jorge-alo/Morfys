import { useEffect } from "react";

export const useScroll = (categoriaAbierta) => {
    useEffect(() => {
        if (categoriaAbierta) {
            const timeoutId = setTimeout(() => {
                const id = categoriaAbierta.replace(/\s+/g, '-');
                const elemento = document.getElementById(id);
                if (elemento) {
                    const yOffset = -200;
                    const y = elemento.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [categoriaAbierta]);
}
