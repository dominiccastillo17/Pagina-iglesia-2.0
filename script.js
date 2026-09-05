// =============================
// EVENTOS: EDITA ESTA LISTA
// =============================
const eventos = [
  {
    id: "avivamiento",
    titulo: "AVIVAMIENTO",
    fecha: "29, 30 y 31 de agosto",
    hora: "6:00 PM / 7:00 PM",
    lugar: "Iglesia de Dios de la Profecía Chinandega",
    resumen: "Tres noches especiales de adoración, Palabra y búsqueda de Dios.",
    descripcion: "Escribe aquí toda la información oficial del evento: invitados, tema, horarios, recomendaciones y cualquier otro detalle importante.",
    flyer: "assets/img/evento-avivamiento.jpg",
    anteriores: [
      "assets/img/avivamiento-anterior-1.jpg",
      "assets/img/avivamiento-anterior-2.jpg",
      "assets/img/avivamiento-anterior-3.jpg"
    ]
  },
  {
    id: "intercesion",
    titulo: "Noches de Intercesión",
    fecha: "Todos los jueves",
    hora: "6:00 PM",
    lugar: "Templo local",
    resumen: "Un tiempo dedicado a la oración e intercesión.",
    descripcion: "Coloca aquí una descripción más completa de este servicio, su propósito y la información que quieras que conozcan los visitantes.",
    flyer: "assets/img/evento-intercesion.jpg",
    anteriores: []
  },
  {
    id: "domingo",
    titulo: "Domingo - Día Del Señor",
    fecha: "Domingos",
    hora: "10:00 AM",
    lugar: "Templo local",
    resumen: "Nuestro servicio general de adoración y Palabra.",
    descripcion: "Agrega aquí la información completa del servicio dominical.",
    flyer: "assets/img/evento-domingo.jpg",
    anteriores: []
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
