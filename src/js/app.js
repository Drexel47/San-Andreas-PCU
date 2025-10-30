document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
    modoOscuro();
    Carrusel();
});


function eventListeners(){
    const mobileMenu = document.querySelector('.menu-movil');
    if(mobileMenu) mobileMenu.addEventListener('click', navegacionResponsive);

    ModalRegistro();
}


function ModalRegistro() {
    const botonesAbrir = document.querySelectorAll('[btn-reg-op]');
    const botonesCerrar = document.querySelectorAll('[btn-reg-cl]');

    botonesAbrir.forEach(boton => {
        boton.addEventListener('click', e => {
            e.preventDefault(); // evita redirección del enlace
            const idModal = boton.getAttribute('btn-reg-op');
            const modal = document.getElementById(idModal);
            if (modal) modal.classList.add('activo');
        });
    });

    botonesCerrar.forEach(boton => {
        boton.addEventListener('click', () => {
            const modal = boton.closest('.modal');
            if (modal) modal.classList.remove('activo');
        });
    });

    document.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('activo');
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.activo')
                .forEach(modal => modal.classList.remove('activo'));
        }
    });
}


function modoOscuro()
{
    const body = document.body;
    const btn = document.getElementById('btn-darkmode');
    //Leer preferencia guardada o la del sistema
    const darkMode = localStorage.getItem('dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if(darkMode === 'enabled' || (!darkMode && prefersDark)) body.classList.add('dark-mode');

    btn.addEventListener('click', () => {
        const estadoOscuro = body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', estadoOscuro ? 'enabled' : 'disabled');
        
    });


}

function Carrusel()
{
    const carrusel = document.querySelector('.carrusel');
    const contenedor = carrusel.querySelector('.carrusel__contenedor');
    const items = carrusel.querySelectorAll('.carrusel__item');
    const prevBtn = carrusel.querySelector('.prev');
    const nextBtn = carrusel.querySelector('.next');
    const indicadoresCont = carrusel.querySelector('.carrusel__indicadores');

    let indiceActual = 0;
    let intervalo;

    // Crear indicadores
    items.forEach((_, i) => {
        const btn = document.createElement('button');
        if (i === 0) btn.classList.add('activo');
        btn.addEventListener('click', () => mostrarSlide(i));
        indicadoresCont.appendChild(btn);
    });
    const indicadores = indicadoresCont.querySelectorAll('button');

    function mostrarSlide(index) {
        indiceActual = (index + items.length) % items.length;
        contenedor.style.transform = `translateX(-${indiceActual * 100}%)`;

        // Indicadores
        indicadores.forEach(btn => btn.classList.remove('activo'));
        indicadores[indiceActual].classList.add('activo');

        // Activa animaciones de texto
        items.forEach(item => item.classList.remove('activo'));
        items[indiceActual].classList.add('activo');
    }

    function siguiente() { mostrarSlide(indiceActual + 1); }
    function anterior() { mostrarSlide(indiceActual - 1); }

    nextBtn.addEventListener('click', siguiente);
    prevBtn.addEventListener('click', anterior);

    // AutoPlay
    function iniciarAutoPlay() { intervalo = setInterval(siguiente, 4000); }
    function detenerAutoPlay() { clearInterval(intervalo); }

    carrusel.addEventListener('mouseenter', detenerAutoPlay);
    carrusel.addEventListener('mouseleave', iniciarAutoPlay);

    iniciarAutoPlay();

}