// =============================
// EVENTOS: EDITA ESTA LISTA
// =============================
const eventos = [
  {
    id: "avivamiento",
    titulo: "Desfile Dia de la Biblia",
    fecha: "27 de Septiembre",
    hora: "7:00 AM",
    lugar: "Calles Principales de Nuestra Ciudad",
    resumen: "Desfile en honor a los 457 aniversario de la traducción de la Biblia al castellano",
    descripcion: "Salimos desde nuestras instalaciones al punto de inicio y asi poder plocarmar el nombre de nuestro señor Jesucristo en nuestra Ciudad",
    flyer: "assets/img/Dia de la Biblia.jpg",
    anteriores: []
  },
  {
    id: "Agenda Semanal",
    titulo: "Agenda Semanal",
    fecha: "Semana del 21 al 27 de Septiembre",
    hora: "Consulta la Imagen",
    lugar: "Consulta la imagen",
    resumen: "Esta agenda te permite conocer los servicios y eventos especiales de nuestra iglesia durante la semana. NOTA: ESTE SÁBADO NO TENDREMOS REUNIÓN DE JÓVENES",
    descripcion: "Para mas información sobre nuestras celulas de crecimento, puesdes consultar en cualquiera de las vias de comunicación y asi poder ubicarte segun tu procimidad",
    flyer: "assets/img/2_Agenda Semanal del 21 al 27 de septiembre - Post_20260920_185536_0000.jpg",
    anteriores: []
  },
  {
    id: "Vigilia Nacional Procesos 2026",
    titulo: "Vigilia Nacional Procesos 2026",
    fecha: "Sabado 10 de Octubre",
    hora: "02:00 pM",
    lugar: "Centro de Convenciones Tierra Santa",
    resumen: "Vigilia Juvenil Procesos 2026, Avanzando en la misión de Dios",
    descripcion: "Se acerca el evento mas esperado para los MJ Nicaragua, nuestra vigilia nacional procesos 2026- Es un tiempo de unidad, adoración y comunión como MJ Nicaragua; Este evento se estara realizando en nuestro Centro de Convenciones Tierra Santa, San Benito - Managua. Inscribete con el lider local de Jóvenes",
    flyer: "assets/img/1_vigilia Nacional Procesos - inscripciones abiertas..jpg",
    anteriores: [
      "assets/img/WhatsApp Image 2026-09-10 at 20.00.53.jpeg",
    "assets/img/v1.jpg",
      "assets/img/v4.jpg"
    ]
  }
];

function placeholder(text, w=800, h=1000){
  return `https://placehold.co/${w}x${h}?text=${encodeURIComponent(text)}`;
}

function initMenu(){
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if(!btn || !nav) return;
  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", nav.classList.contains("open"));
  });
}

function initYear(){
  document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());
}

function initReveal(){
  const items = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){
    items.forEach(i => i.classList.add("visible")); return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  items.forEach(item => observer.observe(item));
}

function renderEventCards(){
  const grid = document.getElementById("event-grid");
  if(!grid) return;
  grid.innerHTML = eventos.map(e => `
    <article class="event-card">
      <img src="${e.flyer}" alt="Flyer de ${e.titulo}" onerror="this.src='${placeholder("Flyer oficial")}';">
      <div class="event-card-body">
        <div class="date">${e.fecha}</div>
        <h2>${e.titulo}</h2>
        <p>${e.resumen}</p>
        <a class="more" href="evento.html?id=${encodeURIComponent(e.id)}">Ver toda la información →</a>
      </div>
    </article>
  `).join("");
}

function renderEventDetail(){
  const root = document.getElementById("event-detail");
  if(!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const e = eventos.find(x => x.id === id);

  if(!e){
    root.innerHTML = `
      <a class="back-link" href="servicios.html">← Volver a servicios</a>
      <h1>Evento no encontrado</h1>
      <p>Revisa el enlace o vuelve a la página de servicios.</p>`;
    return;
  }

  document.title = `${e.titulo} | IDP Chinandega`;

  const anteriores = e.anteriores && e.anteriores.length
    ? `<section class="previous">
        <p class="eyebrow">EDICIÓN ANTERIOR</p>
        <h2>Así lo vivimos anteriormente</h2>
        <div class="previous-grid">
          ${e.anteriores.map((img, i) => `
            <img src="${img}" alt="Edición anterior ${i+1}" onerror="this.src='${placeholder("Edición anterior",800,600)}'">
          `).join("")}
        </div>
      </section>`
    : "";

  root.innerHTML = `
    <a class="back-link" href="servicios.html">← Volver a servicios</a>
    <div class="event-hero-grid">
      <img class="event-flyer" src="${e.flyer}" alt="Flyer oficial de ${e.titulo}"
           onerror="this.src='${placeholder("Flyer oficial")}'">
      <div>
        <p class="eyebrow">EVENTO / SERVICIO</p>
        <h1>${e.titulo}</h1>
        <div class="event-meta">
          <div class="meta-item"><strong>Fecha:</strong> ${e.fecha}</div>
          <div class="meta-item"><strong>Hora:</strong> ${e.hora}</div>
          <div class="meta-item"><strong>Lugar:</strong> ${e.lugar}</div>
        </div>
        <p class="event-description">${e.descripcion}</p>
        <a class="btn blue" href="saber-mas.html">Ver ubicación y contacto</a>
      </div>
    </div>
    ${anteriores}`;
}

initMenu();
initYear();
initReveal();
renderEventCards();
renderEventDetail();
