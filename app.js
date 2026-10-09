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
    links:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
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

  function tieneUrl(u) {
    return typeof u === "string" && u.trim() !== "";
  }

  // Módulo con varios enlaces (campo "links") vs. módulo con un solo "url"
  function esMultiple(modulo) {
    return Array.isArray(modulo.links) && modulo.links.length > 0;
  }

  function estaDisponible(modulo) {
    return esMultiple(modulo)
      ? modulo.links.some(function (l) { return tieneUrl(l.url); })
      : tieneUrl(modulo.url);
  }

  function agregarFlecha(destino) {
    const flecha = crear("span");
    flecha.innerHTML = ICONOS.flecha;
    destino.append(flecha.firstChild);
  }

  function construirLink(link, externo) {
    const li = crear("li");

    if (tieneUrl(link.url)) {
      const a = crear("a", "tarjeta__link");
      a.href = link.url;
      if (externo) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.append(document.createTextNode(link.etiqueta));
      agregarFlecha(a);
      if (externo) {
        a.append(crear("span", "solo-lector", " (se abre en una pestaña nueva)"));
      }
      li.appendChild(a);
    } else {
      li.appendChild(
        crear("span", "tarjeta__link tarjeta__link--inactivo", link.etiqueta + " (pendiente)")
      );
    }

    return li;
  }

  function construirTarjeta(modulo) {
    const multiple = esMultiple(modulo);
    const disponible = estaDisponible(modulo);

    // Varios links: la tarjeta es un bloque (los <a> van adentro, no se pueden anidar).
    // Un solo link: la tarjeta completa es el enlace. Sin link: bloque inactivo.
    let tarjeta;
    if (multiple) {
      tarjeta = crear("div", "tarjeta tarjeta--multiple");
    } else if (disponible) {
      tarjeta = crear("a", "tarjeta");
      tarjeta.href = modulo.url;
      if (modulo.externo) {
        tarjeta.target = "_blank";
        tarjeta.rel = "noopener noreferrer";
      }
    } else {
      tarjeta = crear("div", "tarjeta tarjeta--inactiva");
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
    tarjeta.append(cabecera, titulo, texto);

    // Pie: lista de links o botón de acción único
    if (multiple) {
      const lista = crear("ul", "tarjeta__links");
      modulo.links.forEach(function (l) {
        lista.appendChild(construirLink(l, modulo.externo));
      });
      tarjeta.appendChild(lista);
    } else {
      const accion = crear("span", "tarjeta__accion");
      if (disponible) {
        accion.append(document.createTextNode(modulo.accion || "Abrir"));
        agregarFlecha(accion);
        if (modulo.externo) {
          accion.append(crear("span", "solo-lector", " (se abre en una pestaña nueva)"));
        }
      } else {
        accion.textContent = "Enlace pendiente de configurar";
      }
      tarjeta.appendChild(accion);
    }

    const item = crear("li");
    item.appendChild(tarjeta);
    return item;
  }

  function iniciar() {
    if (!grilla || typeof MODULOS === "undefined") return;

    grilla.replaceChildren(...MODULOS.map(construirTarjeta));

    const disponibles = MODULOS.filter(estaDisponible).length;

    resumen.textContent =
      disponibles + (disponibles === 1 ? " módulo disponible" : " módulos disponibles");
  }

  iniciar();
})();