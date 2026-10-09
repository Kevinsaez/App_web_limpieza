/* ==========================================================
   Lista de módulos del portal.
   Para agregar uno nuevo, sumá un objeto a este arreglo.

   Campos:
   - id          identificador único, sin espacios
   - titulo      nombre visible en la tarjeta
   - descripcion explicación breve, en lenguaje simple
   - url         enlace al que lleva la tarjeta (vacío = "Enlace por configurar")
   - links       (alternativa a url) lista de enlaces dentro de la misma
                 tarjeta: [{ etiqueta: "Texto", url: "https://..." }]
   - externo     true si abre en una pestaña nueva
   - icono       clave de icono (ver ICONOS en app.js)
   - accion      texto del botón (solo cuando se usa url)
   ========================================================== */

const MODULOS = [
  {
    id: "capacitacion",
    titulo: "Capacitación y evaluaciones",
    descripcion:
      "Resultados de las evaluaciones sobre procedimientos de limpieza y alistamiento, por sector, turno y especialidad.",
    url: "https://lsm-evaluacion-iso.netlify.app/dashboard.html",
    externo: true,
    icono: "grafico",
    accion: "Abrir dashboard"
  },
  {
    id: "tareas-estaciones",
    titulo: "Tareas diarias en estaciones",
    descripcion:
      "Seguimiento del cumplimiento de las tareas de limpieza en las 22 estaciones, por turno y por día.",
    url: "https://resgistrostareasdiariasestacion.netlify.app/dashboard.html",
    externo: true,
    icono: "tareas",
    accion: "Abrir dashboard"
  },
  {
    id: "links-utiles",
    titulo: "Links útiles",
    descripcion: "Accesos rápidos a los tableros y herramientas de uso diario.",
    externo: true,
    icono: "links",
    links: [
      { etiqueta: "Tablero de tareas diarias", url: "https://resgistrostareasdiariasestacion.netlify.app/" },
      { etiqueta: "Evaluación Procesos ISO", url: "https://lsm-evaluacion-iso.netlify.app/" }, // ← pegá el link
      { etiqueta: "Link 3", url: "" }  // ← pegá el link
    ]
  }
];