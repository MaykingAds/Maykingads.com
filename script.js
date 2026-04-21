/* ========================================
   MAYKING ADS — JavaScript
   ======================================== */

// ---- THEME TOGGLE ----
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('maykingTheme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('maykingTheme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile menu
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// ---- SCROLL REVEAL ----
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- SERVICE MODALS ----
const modals = {
  gestion: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>`,
    title: 'Gestión Básica de Redes Sociales',
    price: 'Desde S/ 250 <small>/ mes</small>',
    desc: 'Un servicio diseñado para emprendedores y pequeñas marcas que quieren presencia real en redes sin depender de la improvisación. Me encargo de que tu perfil esté activo, coherente y comunicando algo con intención.',
    includes: [
      'Planificación mensual de contenido (calendario editorial)',
      '8 a 12 publicaciones mensuales en 1 red social',
      'Redacción de textos (captions) para cada publicación',
      'Diseño básico de artes visuales para cada post',
      'Gestión de hashtags estratégicos',
      'Reporte mensual básico de alcance e interacciones',
    ],
    note: '* Ideal para negocios que recién comienzan su presencia digital. Precio ajustable según el volumen y plataformas adicionales.'
  },
  copy: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    title: 'Redacción Publicitaria (Copywriting)',
    price: 'Desde S/ 80 <small>/ entregable</small>',
    desc: 'Las palabras correctas en el momento correcto pueden hacer que alguien compre, confíe o recuerde tu marca. Este servicio se enfoca en textos que comunican con claridad, emoción y propósito.',
    includes: [
      'Copy para anuncios de Facebook e Instagram Ads',
      'Textos para landing pages o páginas web',
      'Captions y descripciones para redes sociales',
      'Emails o mensajes de captación',
      'Taglines y eslóganes de marca',
      'Hasta 2 rondas de revisión incluidas',
    ],
    note: '* El precio varía según la extensión y el tipo de pieza. Consulta por paquetes o proyectos completos.'
  },
  auditoria: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M8 11h6M11 8v6"/></svg>`,
    title: 'Auditoría Básica de Marca o Redes',
    price: 'Desde S/ 150 <small>/ servicio único</small>',
    desc: 'Un diagnóstico honesto y estructurado de lo que estás comunicando actualmente y lo que podrías mejorar. Sin rodeos, con criterio y con recomendaciones concretas y accionables.',
    includes: [
      'Análisis de coherencia visual e identidad de marca',
      'Revisión del tono, mensajes y propuesta de valor',
      'Evaluación de perfil de redes sociales (1 a 2 plataformas)',
      'Identificación de oportunidades de mejora',
      'Informe escrito con observaciones y recomendaciones',
      'Sesión de retroalimentación por videollamada (30 min)',
    ],
    note: '* El servicio de auditoría es puntual y no incluye ejecución. Ideal como punto de partida antes de invertir en otros servicios.'
  },
  diseno: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    title: 'Diseño Gráfico Básico',
    price: 'Desde S/ 30 <small>/ pieza</small>',
    desc: 'Piezas visuales con intención. Diseño pensado para comunicar y reforzar tu identidad en cada punto de contacto con tu audiencia, sin sacrificar la estética por la rapidez.',
    includes: [
      'Diseño de posts para redes sociales (feed y stories)',
      'Artes para promociones o anuncios',
      'Banners digitales para web o email',
      'Plantillas reutilizables de marca',
      'Portadas y miniaturas para YouTube o contenido audiovisual',
      'Entrega en formatos editables y listos para publicar',
    ],
    note: '* Precios por pieza. Disponible en paquetes de 5 o más diseños con descuento. Herramientas: Canva Pro / Photoshop.'
  },
  estrategia: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20h20M5 20V8l7-5 7 5v12"/><path d="M10 20v-5h4v5"/></svg>`,
    title: 'Estrategia de Contenido',
    price: 'Desde S/ 200 <small>/ plan mensual</small>',
    desc: 'No se trata de publicar por publicar. La estrategia de contenido define qué decir, cómo decirlo, cuándo y para quién. Un plan pensado desde la intención de marca y los objetivos reales del negocio.',
    includes: [
      'Análisis de público objetivo y competencia básica',
      'Definición de pilares y tipos de contenido',
      'Calendario editorial mensual detallado',
      'Propuesta de formatos y frecuencia de publicación',
      'Guía de tono y voz de marca',
      'Revisión y ajuste al mes siguiente según resultados',
    ],
    note: '* Este servicio es de planificación y no incluye producción ni diseño. Se puede combinar con gestión de redes o producción de contenido.'
  },
  produccion: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
    title: 'Producción de Contenido Básico',
    price: 'Desde S/ 180 <small>/ paquete</small>',
    desc: 'Contenido listo para publicar, sin que tengas que preocuparte por el qué ni el cómo. Desde la idea hasta el archivo final, adaptado para cada plataforma y con coherencia de marca.',
    includes: [
      'Creación de textos + artes para publicaciones (pack de 8)',
      'Adaptación de contenido para feed, stories y reels (estáticos)',
      'Producción de carruseles o infografías básicas',
      'Contenido basado en tendencias y fechas relevantes',
      'Revisión y ajuste antes de entrega final',
      'Entrega en carpeta organizada por plataforma',
    ],
    note: '* No incluye grabación de video. Para contenido audiovisual, consultar por servicio personalizado.'
  }
};

const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');

function openModal(key) {
  const m = modals[key];
  if (!m) return;

  const includesList = m.includes.map(i => `<li>${i}</li>`).join('');

  modalContent.innerHTML = `
    <div class="modal-icon">${m.icon}</div>
    <h3>${m.title}</h3>
    <span class="modal-price">${m.price}</span>
    <p>${m.desc}</p>
    <strong style="font-size:0.82rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-faint);display:block;margin-bottom:0.6rem">Incluye</strong>
    <ul>${includesList}</ul>
    <p class="modal-note">${m.note}</p>
    <div class="modal-cta">
      <a href="https://wa.me/51903227108?text=Hola%20Manuel%2C%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(m.title)}.%20%C2%BFPodemos%20conversar%3F" 
         target="_blank" class="btn-primary">
        <span>Consultar por WhatsApp</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </a>
      <a href="#contacto" class="btn-ghost" onclick="closeModal()">Formulario</a>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

function setActiveNavLink() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinksAll.forEach(l => l.style.color = '');
        link.style.color = 'var(--gold)';
      }
    }
  });
}
window.addEventListener('scroll', setActiveNavLink);
