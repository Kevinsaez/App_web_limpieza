/* ==========================================================
   Portal · dibuja las tarjetas a partir de MODULOS (modulos.js)
   ========================================================== */

(function () {
  "use strict";

  // Iconos SVG estáticos (decorativos: el texto de la tarjeta ya los describe)
  const ICONOS = {
    grafico:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>',
    tareas:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 13l2 2 4-4"/></svg>',
    persona:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    vehiculo:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M3 11h18"/><circle cx="8" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/></svg>',
    documento:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>',
    flecha:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>'
  };

  const grilla = document.getElementById("grilla");
  const resumen = document.getElementById("resumen");

  function crear(tag, clase, texto) {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto) el.textContent = texto;
    return el;
  }

  function construirTarjeta(modulo) {
    const disponible = typeof modulo.url === "string" && modulo.url.trim() !== "";

    // Tarjeta activa = enlace completo; inactiva = bloque sin enlace
    const tarjeta = disponible ? crear("a", "tarjeta") : crear("div", "tarjeta tarjeta--inactiva");
    if (disponible) {
      tarjeta.href = modulo.url;
      if (modulo.externo) {
        tarjeta.target = "_blank";
        tarjeta.rel = "noopener noreferrer";
      }
    }

    // Cabecera: icono + estado
    const cabecera = crear("div", "tarjeta__cabecera");
    const icono = crear("span", "tarjeta__icono");
    icono.innerHTML = ICONOS[modulo.icono] || ICONOS.documento;

    const etiqueta = crear(
      "span",
      "etiqueta " + (disponible ? "etiqueta--disponible" : "etiqueta--pendiente"),
      disponible ? "Disponible" : "Por configurar"
    );
    cabecera.append(icono, etiqueta);

    // Contenido
    const titulo = crear("h3", "tarjeta__titulo", modulo.titulo);
    const texto = crear("p", "tarjeta__texto", modulo.descripcion);

    // Acción
    const accion = crear("span", "tarjeta__accion");
    if (disponible) {
      accion.append(document.createTextNode(modulo.accion || "Abrir"));
      const flecha = crear("span");
      flecha.innerHTML = ICONOS.flecha;
      accion.append(flecha.firstChild);
      if (modulo.externo) {
        accion.append(crear("span", "solo-lector", " (se abre en una pestaña nueva)"));
      }
    } else {
      accion.textContent = "Enlace pendiente de configurar";
    }

    tarjeta.append(cabecera, titulo, texto, accion);

    const item = crear("li");
    item.appendChild(tarjeta);
    return item;
  }

  function iniciar() {
    if (!grilla || typeof MODULOS === "undefined") return;

    grilla.replaceChildren(...MODULOS.map(construirTarjeta));

    const disponibles = MODULOS.filter(function (m) {
      return typeof m.url === "string" && m.url.trim() !== "";
    }).length;

    resumen.textContent =
      disponibles + (disponibles === 1 ? " módulo disponible" : " módulos disponibles");
  }

  iniciar();
})();
