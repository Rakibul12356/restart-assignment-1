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

// Fetch and render 3 trending products from backend
async function fetchTrendingAndRender() {
  const container = document.getElementById("trending-grid");
  if (!container) return;

  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=3");
    if (!res.ok) throw new Error("Failed to load trending products");
    const products = await res.json();

    // Render cards
    container.innerHTML = products
      .map((p) => {
        const rating = p.rating && p.rating.rate ? p.rating.rate : "-";
        const count = p.rating && p.rating.count ? p.rating.count : "0";
        return `
          <div class="group border border-gray-100 rounded-lg overflow-hidden flex flex-col h-full bg-white shadow-sm hover:shadow-md transition duration-300">
            <div class="bg-gray-50 p-6 flex justify-center items-center h-64 md:h-72">
              <img src="${p.image}" alt="${(p.title || "product").replace(/"/g, "")}" class="h-full object-contain mix-blend-multiply transition group-hover:scale-105 duration-300" />
            </div>
            <div class="p-5 md:p-6">
              <div class="flex justify-between items-start mb-2">
                <span class="text-[10px] md:text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-semibold">${p.category}</span>
                <div class="flex items-center text-[10px] md:text-xs font-semibold text-yellow-500">
                  <i data-lucide="star" class="w-3 h-3 fill-current mr-1"></i>
                  ${rating} (${count})
                </div>
              </div>
              <h3 class="font-semibold text-sm md:text-base text-gray-900 mb-1 line-clamp-1">${p.title}</h3>
              <p class="text-lg font-bold text-gray-900 mb-4">$${p.price}</p>
              <div class="grid grid-cols-2 gap-3">
                <button class="flex items-center justify-center border border-gray-200 py-2 rounded text-xs md:text-sm font-medium hover:bg-gray-50 transition">
                  <i data-lucide="eye" class="w-4 h-4 mr-2"></i> Details
                </button>
                <button data-add-id="${p.id}" class="flex items-center justify-center bg-indigo-600 text-white py-2 rounded text-xs md:text-sm font-medium hover:bg-indigo-700 transition">
                  <i data-lucide="shopping-cart" class="w-4 h-4 mr-2"></i> Add
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join("\n");

    // Re-initialize icons and product button bindings for the dynamically inserted cards
    initIcons();
    initProductButtons();
  } catch (err) {
    console.error("Trending fetch error:", err);
  }
}

function initSite() {
  initIcons();
  initMobileMenu();
  initProductButtons();
  // fetch and render 3 trending items from backend
  fetchTrendingAndRender();
  // Initialize cart count from localStorage on page load
  updateCartCount();
}

// Ensure cart count is updated on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}
