# Notaría Lledó y Seda — sitio web

Web estática (HTML + CSS + JavaScript, sin dependencias ni compilación) para la notaría de
José Luis Lledó González y Manuel Antonio Seda Hermosín, en Sevilla.

## Estructura

```
notaria-lledo-seda/
├── index.html          Página principal (one-page, todas las secciones)
├── aviso-legal.html    Aviso legal (LSSI)
├── privacidad.html     Política de privacidad y cookies (RGPD)
├── css/styles.css      Estilos
├── js/script.js        Menú, acordeones, animaciones y formulario
└── img/favicon.svg     Icono del navegador
```

## Ver la web en local

```bash
python3 -m http.server 8777 --directory ~/notaria-lledo-seda
```

Luego abrir http://localhost:8777

## ⚠️ Pendiente antes de publicar

1. **Verificar los datos.** Dirección, teléfono, fax, correos y horario se han recopilado de
   directorios públicos (notarias.info, notariosen.com, Páginas Amarillas). Las fuentes discrepan
   entre la **4.ª y la 5.ª planta**: se ha optado por la 4.ª por ser la mayoritaria. Confirmar con
   el despacho.
2. **Revisar las biografías** de los dos notarios con ellos mismos antes de publicarlas.
3. **Fotografías.** Los retratos incluidos en `img/` proceden de fuentes públicas:
   - `jose-luis-lledo.jpg` — publicada por Lawyerpress (febrero de 2021), 600×400 px.
   - `manuel-seda.jpg` — publicada por el Colegio Notarial de Andalucía, reducida de 6192×4128 a
     1200×800 px para uso web.

   Para sustituirlas por retratos propios del despacho basta con reemplazar los archivos
   manteniendo el nombre. Formato recomendado: 3:2 o 4:3, mínimo 1200 px de ancho.
4. **Completar el NIF** del titular en `aviso-legal.html` y `privacidad.html`, y el contacto del
   Delegado de Protección de Datos si se ha designado.
5. **Formulario de contacto.** Por defecto abre el programa de correo del visitante. Para recibir
   los mensajes directamente, crear una cuenta en [Formspree](https://formspree.io) o Web3Forms y
   pegar la URL en la constante `FORM_ENDPOINT`, al principio de `js/script.js`.
6. **Dominio.** Sustituir `https://www.notarialledoyseda.es/` en las etiquetas `canonical` y
   `og:url` de `index.html` por el dominio definitivo.

## Vista previa publicada

https://msampedrogkvc.github.io/notaria-lledo-seda/

Es un **borrador** para que los notarios lo revisen. Lleva `noindex, nofollow` en `index.html`
para que no aparezca en Google mientras esté pendiente de aprobación; hay que quitarlo al pasar
al dominio definitivo.

## Publicación

Al no haber build ni backend, sirve cualquier alojamiento estático: subir la carpeta por FTP al
hosting contratado, o desplegarla en Netlify, Vercel, Cloudflare Pages o GitHub Pages arrastrando
el directorio. Es imprescindible servirla por **HTTPS**.
