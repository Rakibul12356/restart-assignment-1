// index.js - site scripts

// Cart helpers - Global scope
function getCart() {
  try {
    const raw = localStorage.getItem("swiftcart_cart");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("swiftcart_cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + (i.quantity || 1), 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = total;
}

async function addToCartById(id) {
  if (!id) throw new Error("No id");
  // try to fetch product details
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Fetch failed");
  const product = await res.json();
  const cart = getCart();
  const existing = cart.find((i) => i.id == product.id);
  if (existing) existing.quantity = (existing.quantity || 1) + 1;
  else
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  saveCart(cart);
  return cart;
}

// Expose cart helpers globally
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCartById = addToCartById;
window.updateCartCount = updateCartCount;

function initIcons() {
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
}

function initMobileMenu() {
  const btn = document.getElementById("mobileMenuButton");
  const menu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-backdrop");
  const docBody = document.body;
  if (!btn || !menu || !backdrop) return;

  function openMenu() {
    btn.setAttribute("aria-expanded", "true");
    menu.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    docBody.classList.add("overflow-hidden");
  }

  function closeMenu() {
    btn.setAttribute("aria-expanded", "false");
    menu.classList.add("hidden");
    backdrop.classList.add("hidden");
    docBody.classList.remove("overflow-hidden");
  }

  btn.addEventListener("click", function () {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) closeMenu();
    else openMenu();
  });

  // Close when clicking backdrop
  backdrop.addEventListener("click", closeMenu);

  // Close menu when a link is clicked
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

function initProductButtons() {
  const cartCountEl = document.getElementById("cart-count");
  // Attach to buttons that declare a product id via data-add-id
  document.querySelectorAll("button[data-add-id]").forEach((btn) => {
    const text = (btn.textContent || "").trim().toLowerCase();
    if (text === "add" || text.includes("add")) {
      btn.addEventListener("click", () => {
        // update cart count if present
        if (cartCountEl) {
          const n = parseInt(cartCountEl.textContent || "0", 10) || 0;
          cartCountEl.textContent = n + 1;
          cartCountEl.animate(
            [
              { transform: "scale(1)" },
              { transform: "scale(1.3)" },
              { transform: "scale(1)" },
            ],
            { duration: 220 },
          );
        }
        // small button feedback
        btn.animate(
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-3px)" },
            { transform: "translateY(0)" },
          ],
          { duration: 200 },
        );
      });
    }
  });
}

function initSite() {
  initIcons();
  initMobileMenu();
  initProductButtons();
  // Initialize cart count from localStorage on page load
  updateCartCount();
}

// Ensure cart count is updated on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}
