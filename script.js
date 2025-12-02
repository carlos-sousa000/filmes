document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("trailer-modal");
  const videoPlayer = document.getElementById("modal-video");
  const modalTitle = document.getElementById("modal-title");
  const modalSinopse = document.getElementById("modal-sinopse");
  const closeBtn = document.querySelector(".close-btn");

  const movieCards = document.querySelectorAll(".movie-card");
  const header = document.querySelector("header");

  // --- 1. Efeito do Header ao Rolar (Opcional, mas legal) ---
  // Deixa o header com fundo sólido quando você rola a página
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- 2. Funções do Modal ---
  function abrirModal(card) {
    // Pega os dados do card clicado
    const videoSrc = card.getAttribute("data-video-src");
    const title = card.getAttribute("data-title");
    const sinopse = card.getAttribute("data-sinopse"); // Pega a SINOPSE COMPLETA

    // Verifica se os dados existem
    if (!videoSrc || !title || !sinopse) {
      alert("Erro: Faltam informações neste card (vídeo, título ou sinopse).");
      return;
    }
    if (videoSrc.includes("[")) {
      alert("Lembre-se de substituir os placeholders [URL...] no HTML!");
      return;
    }

    // Preenche o modal com os dados
    videoPlayer.src = videoSrc;
    modalTitle.textContent = title;
    modalSinopse.textContent = sinopse; // Mostra a sinopse COMPLETA

    // Exibe o modal e toca o vídeo
    modal.style.display = "flex";
    videoPlayer.play();
  }

  function fecharModal() {
    modal.style.display = "none";
    videoPlayer.pause();
    videoPlayer.src = "";
    modalTitle.textContent = "";
    modalSinopse.textContent = "";
  }

  // --- 3. Adiciona Eventos de Clique ---
  movieCards.forEach((card) => {
    card.addEventListener("click", function () {
      abrirModal(this); // 'this' é o card que foi clicado
    });
  });

  closeBtn.addEventListener("click", fecharModal);

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      fecharModal();
    }
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "flex") {
      fecharModal();
    }
  });
});
