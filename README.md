# Notaría Lledó y Seda — sitio web

Web estática (HTML + CSS + JavaScript, sin dependencias ni compilación) para la notaría de
José Luis Lledó González y Manuel Antonio Seda Hermosín, en Sevilla.

## Estructura

```
notaria-lledo-seda/
├── index.html          Página principal (one-page, todas las secciones)
├── aviso-legal.html    Aviso legal (LSSI)
├── privacidad.html     Política de privacidad y cookies (RGPD)
├── css/styles.css      Estilos (incluye las @font-face locales)
├── js/script.js        Menú, acordeones, animaciones, formulario y cookies
├── fonts/              Lora e Inter alojadas localmente (ver más abajo)
└── img/favicon.svg     Icono del navegador
```

## Ver la web en local

```bash
python3 -m http.server 8777 --directory ~/notaria-lledo-seda
```

Luego abrir http://localhost:8777

## ⚠️ Pendiente antes de publicar

1. ~~Verificar los datos de contacto.~~ **Hecho.** Confirmados en la revisión del despacho de
   septiembre de 2026: Calle Tetuán 33, **4.ª planta**, teléfono 954 21 81 40 y fax 954 21 38 72.
   Correo de Lledó: `jlledo@despacho.notariado.org`; el de Seda sigue siendo
   `maseda@correonotarial.org` (confirmado como intencionado). En la sección de contacto de la
   portada y en el pie solo se muestra el de Seda, a petición expresa; el de Lledó sigue visible
   en su propia ficha biográfica.
2. ~~Revisar las biografías.~~ **Hecho** en esa misma revisión.
3. **Fotografías.** Los retratos incluidos en `img/` proceden de fuentes públicas:
   - `jose-luis-lledo.jpg` — publicada por Lawyerpress (febrero de 2021), 600×400 px.
   - `manuel-seda.jpg` — publicada por el Colegio Notarial de Andalucía, reducida de 6192×4128 a
     1200×800 px para uso web.

   Para sustituirlas por retratos propios del despacho basta con reemplazar los archivos
   manteniendo el nombre. Formato recomendado: 3:2 o 4:3, mínimo 1200 px de ancho.
4. ~~Completar el NIF.~~ **Hecho:** 28517746T, en `aviso-legal.html` y `privacidad.html`. Queda
   pendiente solo el contacto del Delegado de Protección de Datos, si el despacho designa uno
   (ver más abajo, "Cookies y cumplimiento legal").
5. ~~Formulario de contacto.~~ **Hecho.** El destino es `mgjimenez-castellanos@despacho.notariado.org`
   (constante `FORM_MAILTO` en `js/script.js`). Ahora mismo esto abre el programa de correo del
   visitante con el mensaje ya redactado; el visitante tiene que darle a enviar él mismo. Si se
   prefiere que el formulario entregue el mensaje directamente sin ese paso, hace falta un servicio
   de terceros (Formspree, Web3Forms...): eso es una decisión aparte, con su propia implicación de
   protección de datos (pasaría a haber un nuevo encargado del tratamiento), así que no se ha
   activado por defecto. La constante `FORM_ENDPOINT`, justo encima en el mismo fichero, está lista
   para ello si se decide más adelante.
6. **Dominio.** Sustituir `https://www.notarialledoyseda.es/` en las etiquetas `canonical` y
   `og:url` de `index.html` por el dominio definitivo.

## Cookies y cumplimiento legal

- **Sin analítica ni publicidad.** El sitio no incluye Google Analytics ni ningún otro rastreador.
- **Tipografías alojadas localmente** (carpeta `fonts/`), en vez de cargarlas desde
  fonts.googleapis.com como al principio. Antes, cada visita transfería la IP del visitante a
  Google solo para servir la letra del sitio; ahora no hay ninguna conexión a Google al cargar la
  página. Son fuentes variables: 4 ficheros cubren Lora (400–700) e Inter (300–600) en los
  subconjuntos latin y latin-ext, suficiente para español.
- **Único servicio de terceros: el mapa de Google Maps** de la sección de contacto. No se carga
  al abrir la página: se muestra un aviso y un botón, y solo si el visitante pulsa "Aceptar" se
  solicita el mapa a Google (que es cuando puede establecer cookies). Hay además un banner de
  cookies (abajo de toda la página) con "Aceptar" / "Rechazar", que aparece la primera vez y
  respeta la elección en visitas siguientes (guardada en `localStorage`, no en una cookie). El
  enlace "Preferencias de cookies", en el pie de la portada, permite cambiar de opinión en
  cualquier momento. El comportamiento está descrito con detalle en `privacidad.html#cookies`.
- **Delegado de Protección de Datos.** La fila del DPD en `privacidad.html` sigue como
  `[Indicar contacto del DPD, si se ha designado]`. Conviene que el despacho confirme con su
  asesor si, dado el volumen y tipo de datos que trata la notaría, resulta obligatorio designar
  uno (art. 34 LOPDGDD) o si basta con dejar esa fila en blanco.

## Vista previa publicada

https://msampedrogkvc.github.io/notaria-lledo-seda/

Es un **borrador** para que los notarios lo revisen. Lleva `noindex, nofollow` en `index.html`
para que no aparezca en Google mientras esté pendiente de aprobación; hay que quitarlo al pasar
al dominio definitivo.

## Publicación

Al no haber build ni backend, sirve cualquier alojamiento estático: subir la carpeta por FTP al
hosting contratado, o desplegarla en Netlify, Vercel, Cloudflare Pages o GitHub Pages arrastrando
el directorio. Es imprescindible servirla por **HTTPS**.
