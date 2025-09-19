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
