const diasMap = {
  domingo: 0,
  lunes: 1,
  martes: 2,
  miércoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6
};

function convertirAMinutos(hora) {
  if (typeof hora === "number") return hora * 60;
  const [h, m] = hora.toString().split(":").map(Number);
  return h * 60 + (m || 0);
}

function estaEnRangoDias(diaInicio, diaFin, diaActual) {
  if (diaInicio <= diaFin) {
    return diaActual >= diaInicio && diaActual <= diaFin;
  } else {
    // caso en que pasa de una semana a la otra (ej: viernes a lunes)
    return diaActual >= diaInicio || diaActual <= diaFin;
  }
}

/**
 * Valida si el local está abierto según el objeto de horarios
 */
export function estaAbierto(horarioObj) {
  const ahora = new Date();
  const diaActual = ahora.getDay(); // 0=domingo, 6=sábado
  const horaActual = ahora.getHours() * 60 + ahora.getMinutes();

  const rangos = [];

  // --- Rango mañana ---
  if (horarioObj.horarioManianaEntrada && horarioObj.horarioManianaSalida) {
    const diaInicioM = diasMap[horarioObj.diaManianaEntrada.toLowerCase()];
    const diaFinM = diasMap[horarioObj.diaManianaSalida.toLowerCase()];
    if (estaEnRangoDias(diaInicioM, diaFinM, diaActual)) {
      rangos.push({
        inicio: convertirAMinutos(horarioObj.horarioManianaEntrada),
        fin: convertirAMinutos(
          horarioObj.horarioManianaSalida === "24:00" ? "23:59" : horarioObj.horarioManianaSalida
        )
      });
    }
  }

  // --- Rango tarde ---
  if (horarioObj.horarioTardeEntrada && horarioObj.horarioTardeSalida) {
    const diaInicioT = diasMap[horarioObj.diaTardeEntrada.toLowerCase()];
    const diaFinT = diasMap[horarioObj.diaTardeSalida.toLowerCase()];
    if (estaEnRangoDias(diaInicioT, diaFinT, diaActual)) {
      rangos.push({
        inicio: convertirAMinutos(horarioObj.horarioTardeEntrada),
        fin: convertirAMinutos(
          horarioObj.horarioTardeSalida === "24:00" ? "23:59" : horarioObj.horarioTardeSalida
        )
      });
    }
  }

  // Chequeo si la hora actual cae en alguno de los rangos activos
  return rangos.some(rango => horaActual >= rango.inicio && horaActual <= rango.fin);
}