const products = [
  {
    id: 1,
    name: "Polo Ralph Lauren Multi Colegial",
    category: "Vintage pieces",
    price: "S/ 299",
    image: "assets/images/producto-1.webp",
    description: "Buzo Ralph Lauren multicolor de vibe colegial, pieza vintage con patron protagonista.",
    imagePosition: "center center"
  },
  {
    id: 2,
    name: "JACKET SATIN AVIREX RARE JACKET",
    category: "Jackets",
    price: "S/ 429",
    image: "assets/images/producto-2.webp",
    description: "Jacket satin Avirex de acabado brillante, rare piece con presencia total de espalda.",
    imagePosition: "center center"
  },
  {
    id: 3,
    name: "JACKET NAUTICA VINTAGE WINDBREAKER",
    category: "Jackets",
    price: "S/ 349",
    image: "assets/images/producto-3.webp",
    description: "Windbreaker Nautica vintage en rojo intenso, liviana y directa para look street diario.",
    imagePosition: "center center"
  },
  {
    id: 4,
    name: "Denim Jacket Jen Calvin Klein",
    category: "Jackets",
    price: "S/ 319",
    image: "assets/images/producto-4.webp",
    description: "Denim jacket Calvin Klein de corte limpio y lavado clasico para capas urbanas.",
    imagePosition: "center center"
  },
  {
    id: 5,
    name: "90s Adidas Speel Rare",
    category: "Vintage pieces",
    price: "S/ 339",
    image: "assets/images/producto-5.webp",
    description: "Track jacket Adidas de los 90s, combinacion azul rara con lectura deportiva vintage.",
    imagePosition: "center center"
  },
  {
    id: 6,
    name: "T-SHIRT ECKO UNLTD",
    category: "T-Shirts",
    price: "S/ 149",
    image: "assets/images/producto-6.webp",
    description: "T-shirt Ecko Unltd grafica en negro, frente fuerte para outfit street de alto contraste.",
    imagePosition: "center center"
  }
];

const productGrid = document.getElementById("productGrid");
const resultLabel = document.getElementById("resultLabel");
const filterButtons = document.querySelectorAll("[data-filter]");
const modal = document.getElementById("productModal");
const closeModalButton = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalConsult = document.getElementById("modalConsult");

let selectedFilter = "All";

function renderProducts(list) {
  if (!list.length) {
    productGrid.innerHTML = '<p class="empty-state">No hay productos en esta categoria por ahora.</p>';
    return;
  }

  productGrid.innerHTML = list
    .map(
      (product, index) => `
        <button
          class="product-card"
          type="button"
          data-product-id="${product.id}"
          style="--card-delay:${index * 45}ms; --img-position:${product.imagePosition};"
        >
          <figure class="product-figure">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <span class="view-detail">Ver detalle</span>
          </figure>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
          </div>
        </button>
      `
    )
    .join("");
}

function setResultLabel(list, filter) {
  if (filter === "All") {
    resultLabel.textContent = `Mostrando ${list.length} piezas del drop`;
    return;
  }

  resultLabel.textContent = `${list.length} piezas en ${filter}`;
}

function applyFilter(filter) {
  selectedFilter = filter;

  const visibleProducts =
    filter === "All" ? products : products.filter((product) => product.category === filter);

  renderProducts(visibleProducts);
  setResultLabel(visibleProducts, filter);

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("is-active", isActive);
  });
}

function openModal(productId) {
  const selectedProduct = products.find((item) => item.id === Number(productId));
  if (!selectedProduct) return;

  modalImage.src = selectedProduct.image;
  modalImage.alt = selectedProduct.name;
  modalCategory.textContent = selectedProduct.category;
  modalName.textContent = selectedProduct.name;
  modalPrice.textContent = selectedProduct.price;
  modalDescription.textContent = selectedProduct.description;

  const message = encodeURIComponent(
    `Hola Deaths Clothes, me interesa ${selectedProduct.name} (${selectedProduct.price}). Quiero mas info.`
  );
  modalConsult.href = `https://wa.me/59800000000?text=${message}`;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    applyFilter(filter);

    if (button.classList.contains("category-card")) {
      document.getElementById("drop").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

productGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-product-id]");
  if (!card) return;

  openModal(card.dataset.productId);
});

modal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-modal]")) {
    closeModal();
  }
});

closeModalButton.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

applyFilter(selectedFilter);
