/* ============================================================
 🌌 TWIS SPARK EFFECTS JS v4.1
 Animaciones de entrada + Efectos suaves en tarjetas
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // === Animación de entrada global ===
  document.body.style.opacity = "0";
  document.body.style.transform = "translateY(20px)";
  document.body.style.transition = "opacity 0.8s ease, transform 0.8s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
    document.body.style.transform = "translateY(0)";
  }, 100);

  // === Animación suave para las tarjetas ===
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(15px)";
    card.style.transition = `opacity 0.6s ease ${(index + 1) * 0.1}s, transform 0.6s ease ${(index + 1) * 0.1}s`;

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 150 + index * 100);
  });

  // === Animación cuando se agregan nuevas tarjetas dinámicas (por ejemplo, en upload.html) ===
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.classList && node.classList.contains("json-field")) {
          node.style.opacity = "0";
          node.style.transform = "translateY(15px)";
          node.style.transition = "opacity 0.5s ease, transform 0.5s ease";

          setTimeout(() => {
            node.style.opacity = "1";
            node.style.transform = "translateY(0)";
          }, 50);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});