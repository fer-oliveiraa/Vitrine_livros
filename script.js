const cart = {};
const cartItemsContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const productElement = button.closest(".product");
    const id = productElement.dataset.id;
    const name = productElement.querySelector("h3").textContent;
    const priceText = productElement.querySelector(".price").textContent;
    const price = parseFloat(priceText.replace("R$ ", "").replace(",", "."));

    if (!cart[id]) {
      cart[id] = { name, price, quantity: 1 };
    } else {
      cart[id].quantity += 1;
    }

    updateCartUI();
  });
});

function updateCartUI() {
  cartItemsContainer.innerHTML = "";

  let total = 0;

  Object.entries(cart).forEach(([id, product]) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "cart-item-info";
    info.innerHTML = `<strong>${product.name}</strong><br>R$ ${product.price.toFixed(2)}`;

    const controls = document.createElement("div");
    controls.className = "cart-controls";

    const minus = document.createElement("button");
    minus.textContent = "-";
    minus.onclick = () => {
      product.quantity--;
      if (product.quantity <= 0) delete cart[id];
      updateCartUI();
    };

    const quantity = document.createElement("span");
    quantity.textContent = product.quantity;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.onclick = () => {
      product.quantity++;
      updateCartUI();
    };

    controls.append(minus, quantity, plus);
    li.append(info, controls);
    cartItemsContainer.appendChild(li);

    total += product.quantity * product.price;
  });

  totalElement.textContent = "R$ " + total.toFixed(2).replace(".", ",");
}
