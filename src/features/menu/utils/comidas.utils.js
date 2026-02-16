

export const agruparComidasPorCategorias = (comidas) => {
    if (!comidas) return {};

    const resultado = comidas.reduce((acc, comida) => {
        const cat = comida.categoria;

        // Verificamos si tiene opciones activas
        const tieneOpcionesActivas =
            comida.variantes?.[0]?.opciones?.some(op => op.standby != 1);

        if (!tieneOpcionesActivas) return acc;

        // Lógica de visibilidad
        const esVisible =
            (comida.standby != 1 && comida.tamanio != 1) ||
            comida.tamanio == 1;

        if (!esVisible) return acc;

        // SOLO si es válida creamos la categoría
        if (!acc[cat]) acc[cat] = [];

        acc[cat].push(comida);

        return acc;
    }, {});

    return resultado;

}

export const ordenarCategorias = (comidasPorCategorias) => {
    if (!comidasPorCategorias) return [];

    return Object.entries(comidasPorCategorias).sort(([a], [b]) => {
        const catA = a.toLowerCase();
        const catB = b.toLowerCase();

        // Asignamos el orden de jerarquía
        const obtenerJerarquia = (nombre) => {
            if (nombre === "menu") return 1;
            if (nombre.startsWith("prom")) return 2;  // Cubre "promo", "promocion", etc.
            if (nombre.startsWith("plato")) return 3; // Cubre "plato", "platos", "platofuerte"
            return 4; // Todo lo demás va después
        };

        const ordenA = obtenerJerarquia(catA);
        const ordenB = obtenerJerarquia(catB);

        // Si pertenecen a grupos diferentes, mandamos el de menor número arriba
        if (ordenA !== ordenB) {
            return ordenA - ordenB;
        }

        // Si están en el mismo grupo (ej. dos que empiezan con "prom"), 
        // se ordenan alfabéticamente entre sí
        return catA.localeCompare(catB);
    });
}
