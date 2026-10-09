/* ==========================================================
   Lista de módulos del portal.
   Para agregar uno nuevo, sumá un objeto a este arreglo.

   Campos:
   - id          identificador único, sin espacios
   - titulo      nombre visible en la tarjeta
   - descripcion explicación breve, en lenguaje simple
   - url         enlace al que lleva la tarjeta (vacío = "Enlace por configurar")
   - externo     true si abre en una pestaña nueva
   - icono       clave de icono (ver ICONOS en app.js)
   - accion      texto del botón
   ========================================================== */

const MODULOS = [
  {
    id: "capacitacion",
    titulo: "Capacitación y evaluaciones",
    descripcion:
      "Resultados de las evaluaciones sobre procedimientos de limpieza y alistamiento, por sector, turno y especialidad.",
    url: "https://lsm-evaluacion-iso.netlify.app/dashboard.html", // ← Pegá acá el link del dashboard de capacitación
    externo: true,
    icono: "grafico",
    accion: "Abrir dashboard"
  }
];
