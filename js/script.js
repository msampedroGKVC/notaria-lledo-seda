/* =========================================================
   NOTARÍA LLEDÓ Y SEDA — comportamiento de la web
   ========================================================= */
(function () {
  'use strict';

  /* -------------------------------------------------------
     CONFIGURACIÓN DEL FORMULARIO
     -------------------------------------------------------
     Si deja FORM_ENDPOINT vacío, el formulario abrirá el
     programa de correo del visitante con el mensaje ya escrito.

     Para recibir los mensajes directamente en el buzón, cree una
     cuenta en un servicio como Formspree (https://formspree.io) o
     Web3Forms y pegue aquí la URL que le den, por ejemplo:
     var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
     ------------------------------------------------------- */
  var FORM_ENDPOINT = '';
  var FORM_MAILTO   = 'jlledo@correonotarial.org';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Año en el pie ---------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Sombra de la cabecera al desplazar ---------- */
  var header = $('#header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var burger = $('#burger');
  var nav    = $('#nav');

  var closeMenu = function () {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('is-locked');
  };

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.classList.toggle('is-locked', open);
    });

    $$('a', nav).forEach(function (a) { a.addEventListener('click', closeMenu); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        burger.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });
  }

  /* ---------- Enlace activo según la sección visible ---------- */
  var navLinks = $$('.nav__list a[href^="#"]');
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Aparición progresiva ---------- */
  var revealables = $$('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    var reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        setTimeout(function () { entry.target.classList.add('is-visible'); }, i * 80);
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { reveal.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Acordeones ---------- */
  $$('[data-acc]').forEach(function (group) {
    var buttons = $$('.acc__btn', group);

    buttons.forEach(function (btn) {
      var panel = btn.parentElement.nextElementSibling;
      if (!panel) return;

      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Cierra el resto del grupo (comportamiento de acordeón único).
        buttons.forEach(function (other) {
          if (other === btn) return;
          var otherPanel = other.parentElement.nextElementSibling;
          other.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.height = '0px';
        });

        if (isOpen) {
          btn.setAttribute('aria-expanded', 'false');
          panel.style.height = '0px';
        } else {
          btn.setAttribute('aria-expanded', 'true');
          panel.style.height = panel.scrollHeight + 'px';
        }
      });
    });

    // Recalcula la altura del panel abierto al cambiar el tamaño de la ventana.
    window.addEventListener('resize', function () {
      buttons.forEach(function (btn) {
        if (btn.getAttribute('aria-expanded') !== 'true') return;
        var panel = btn.parentElement.nextElementSibling;
        if (panel) panel.style.height = panel.scrollHeight + 'px';
      });
    });
  });

  /* ---------- Formulario de contacto ---------- */
  var form = $('#form');
  if (form) {
    var status = $('#form-status');

    var setStatus = function (msg, type) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form__status' + (type ? ' is-' + type : '');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Trampa antispam: si está relleno, es un bot.
      if (form.elements._gotcha && form.elements._gotcha.value) return;

      var required = ['nombre', 'email', 'mensaje'];
      var invalid = false;

      required.forEach(function (name) {
        var input = form.elements[name];
        var ok = input.value.trim() !== '' &&
                 (name !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim()));
        input.classList.toggle('is-error', !ok);
        if (!ok && !invalid) { input.focus(); invalid = true; }
      });

      if (invalid) {
        setStatus('Revise los campos marcados: el nombre, un correo válido y el mensaje son obligatorios.', 'err');
        return;
      }

      if (!form.elements.rgpd.checked) {
        setStatus('Debe aceptar la política de privacidad para enviar la consulta.', 'err');
        form.elements.rgpd.focus();
        return;
      }

      var data = {
        nombre:   form.elements.nombre.value.trim(),
        email:    form.elements.email.value.trim(),
        telefono: form.elements.telefono.value.trim(),
        asunto:   form.elements.asunto.value,
        mensaje:  form.elements.mensaje.value.trim()
      };

      // Sin endpoint configurado: se abre el gestor de correo del visitante.
      if (!FORM_ENDPOINT) {
        var body = 'Nombre: ' + data.nombre +
                   '\nCorreo: ' + data.email +
                   '\nTeléfono: ' + (data.telefono || '—') +
                   '\nTrámite: ' + data.asunto +
                   '\n\n' + data.mensaje;
        window.location.href = 'mailto:' + FORM_MAILTO +
          '?subject=' + encodeURIComponent('Consulta web · ' + data.asunto) +
          '&body=' + encodeURIComponent(body);
        setStatus('Se ha abierto su programa de correo con el mensaje preparado. Si no ocurre nada, escríbanos a ' + FORM_MAILTO + '.', 'ok');
        return;
      }

      var submit = form.querySelector('button[type="submit"]');
      var label  = submit.textContent;
      submit.disabled = true;
      submit.textContent = 'Enviando…';
      setStatus('');

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Respuesta ' + res.status);
          form.reset();
          setStatus('Consulta enviada. Le responderemos lo antes posible. Gracias.', 'ok');
        })
        .catch(function () {
          setStatus('No hemos podido enviar el mensaje. Inténtelo de nuevo o llámenos al 954 21 81 40.', 'err');
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = label;
        });
    });

    // Quita el aviso de error en cuanto el usuario corrige el campo.
    $$('input, textarea', form).forEach(function (el) {
      el.addEventListener('input', function () { el.classList.remove('is-error'); });
    });
  }
})();
