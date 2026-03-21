// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Lightbox logic
function abrirLightbox(id) {
    document.getElementById(id).style.display = "flex";
}

// Close lightbox on click outside
const lightboxes = ["lightboxSenha", "lightboxInvestimento", "lightboxCuidaidoso"];
lightboxes.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("click", function(e) {
            if (e.target === this) this.style.display = "none";
        });
    }
});

// Bind images to lightbox
const imageBinds = [
    { img: "imgSenha", lightbox: "lightboxSenha" },
    { img: "imgInvestimento", lightbox: "lightboxInvestimento" },
    { img: "imgCuidaidoso", lightbox: "lightboxCuidaidoso" }
];

imageBinds.forEach(bind => {
    const imgEl = document.getElementById(bind.img);
    if (imgEl) {
        imgEl.onclick = () => abrirLightbox(bind.lightbox);
    }
});

// Dollar exchange rate logic
function atualizarCotacao() {
    const valorDolarEl = document.getElementById('valor-dolar');
    if (!valorDolarEl) return;

    fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
        .then(res => res.json())
        .then(data => {
            const valor = Number(data.USDBRL.bid).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
            valorDolarEl.textContent = valor;
        })
        .catch(() => {
            valorDolarEl.textContent = 'erro';
        });
}

// Initializations
document.addEventListener('DOMContentLoaded', () => {
    atualizarCotacao();
    // Refresh every 60 seconds
    setInterval(atualizarCotacao, 600000); // 10 minutes is enough
});

// Back to Top Button Logic
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (backToTopButton) backToTopButton.classList.add('show');
    } else {
        if (backToTopButton) backToTopButton.classList.remove('show');
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
