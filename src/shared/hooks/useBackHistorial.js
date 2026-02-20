import { useEffect } from "react";


export const useBackHistorial = (isModalMipeddido, setIsModalMipeddido) => {
   useEffect(() => {
    if (isModalMipeddido) {
      // Empuja un nuevo estado al historial cuando el modal se abre
      window.history.pushState({ mipedido: true }, "");

      const handlePopState = () => {
        // Si el usuario toca "atrás" o hace el gesto, cerramos el modal
        setIsModalMipeddido(false);
      };

      // Escuchamos el evento popstate
      window.addEventListener("popstate", handlePopState);

      // Cleanup cuando se desmonta o se cierra manualmente
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isModalMipeddido]);
}
