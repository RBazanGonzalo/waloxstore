// --- BOTÓN DEL CATÁLOGO ---
const btnCatalogo = document.querySelector(".hero .btn");

if (btnCatalogo) {
  btnCatalogo.addEventListener("click", () => {
    alert("🚀 Próximamente podrás explorar el catálogo completo de WALOX STORE.");
  });
}

// --- BOTONES DE PRODUCTOS ---
const btnsComprar = document.querySelectorAll(".card .btn");
const cartIcon = document.querySelector(".cart");

// Crear contador del carrito
let cartCount = 0;
const cartBadge = document.createElement("span");
cartBadge.classList.add("cart-badge");
cartBadge.innerText = cartCount;
cartIcon.appendChild(cartBadge);

// Array donde se guardarán los productos
let cartItems = [];

// Evento para cada botón "Agregar al carrito"
btnsComprar.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const nombre = card.querySelector("h3").innerText;
    const precio = card.querySelector("p").innerText;

    cartItems.push({ nombre, precio });
    cartCount++;
    cartBadge.innerText = cartCount;

    alert(`${nombre} fue agregado al carrito 🛒`);
  });
});

// --- MODAL DEL CARRITO ---
const modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>🛒 Carrito de compras</h2>
    <ul class="cart-list"></ul>
    <button class="checkout-btn">Finalizar compra</button>
  </div>
`;
document.body.appendChild(modal);

const cartList = modal.querySelector(".cart-list");
const closeBtn = modal.querySelector(".close");

// Abrir carrito
cartIcon.addEventListener("click", () => {
  cartList.innerHTML = "";
  if (cartItems.length === 0) {
    cartList.innerHTML = "<li>Tu carrito está vacío.</li>";
  } else {
    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.innerText = `${item.nombre} - ${item.precio}`;
      cartList.appendChild(li);
    });
  }
  modal.style.display = "flex";
});

// Cerrar carrito
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// inicializa cada carousel al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-images img');
    if (!slides.length) return;
    if (![...slides].some(s => s.classList.contains('active'))) {
      slides[0].classList.add('active');
    }
  });
});

function moveSlide(button, direction) {
  const carousel = button.closest('.carousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.carousel-images img');
  if (!slides.length) return;

  let currentIndex = [...slides].findIndex(s => s.classList.contains('active'));
  if (currentIndex === -1) currentIndex = 0;

  const nextIndex = (currentIndex + direction + slides.length) % slides.length;

  slides[currentIndex].classList.remove('active');
  slides[nextIndex].classList.add('active');
}
// Carrusel
function moveSlide(button, direction) {
  const carousel = button.parentElement;
  const slides = carousel.querySelectorAll('img');
  let index = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

  slides[index].classList.remove('active');
  index += direction;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides[index].classList.add('active');
}

// Función para ir al producto
function goToProduct(url) {
  window.location.href = url;
}
// --- BOTÓN FINALIZAR COMPRA ---
const checkoutBtn = modal.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {
  // Guardar carrito en localStorage para que se use en checkout.html
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartTotal", cartCount);

  // Redirigir al checkout
  window.location.href = "checkout.html";
});
