document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
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