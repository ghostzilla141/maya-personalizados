// Carga los productos del carrito desde LocalStorage, con manejo de errores
let cartItems = [];
try {
    const storedCartItems = localStorage.getItem('cartItems');
    cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
} catch (error) {
    console.error("Error al cargar el carrito desde LocalStorage:", error);
    // Puedes mostrar un mensaje de error al usuario si lo deseas
}

console.log(cartItems); 

// Obtén el contenedor donde se mostrarán los productos del carrito
const cartList = document.getElementById('cart-list');

// Muestra los productos en el carrito
displayCartItems();

// Actualiza el resumen del pedido
updateOrderSummary();

// Función para mostrar los productos en el carrito
function displayCartItems() {
    cartList.innerHTML = ''; // Limpia el contenido anterior

    cartItems.forEach(item => {
        const cartItemElement = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                    <div class="quantity-control">
                        <button class="decrease-quantity">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity">+</button>
                    </div>
                    <button class="remove-item">Eliminar</button>
                </div>
            </div>
        `;
        cartList.innerHTML += cartItemElement;
    });

    addEventListenersToCartItems();
}

// Función para actualizar el resumen del pedido
function updateOrderSummary() {
    const subtotal = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace('$', '')); 
        return total + itemPrice * item.quantity;
    }, 0);

    const shipping = 5.00; // Costo de envío fijo
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Función para agregar event listeners a los botones de aumentar/disminuir cantidad y eliminar
function addEventListenersToCartItems() {
    const decreaseQuantityButtons = document.querySelectorAll('.decrease-quantity');
    const increaseQuantityButtons = document.querySelectorAll('.increase-quantity');
    const removeItemButtons = document.querySelectorAll('.remove-item');

    decreaseQuantityButtons.forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    increaseQuantityButtons.forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    removeItemButtons.forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Funciones para manejar los eventos de los botones
function decreaseQuantity(event) {
    const cartItem = event.target.closest('.cart-item');
    const productName = cartItem.querySelector('h3').textContent;

    const itemIndex = cartItems.findIndex(item => item.name === productName);

    if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
    } else {
        // Si la cantidad es 1, pregunta si desea eliminar el producto
        if (confirm("¿Desea eliminar el producto del carrito?")) {
            removeItem(event); // Llama a la función removeItem para eliminar el producto
            return; // Sale de la función para evitar actualizar la cantidad a 0
        }
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
    updateOrderSummary();
}

function increaseQuantity(event) {
    const cartItem = event.target.closest('.cart-item');
    const productName = cartItem.querySelector('h3').textContent;

    const itemIndex = cartItems.findIndex(item => item.name === productName);
    cartItems[itemIndex].quantity++;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
    updateOrderSummary();
}

function removeItem(event) {
    const cartItem = event.target.closest('.cart-item');
    const productName = cartItem.querySelector('h3').textContent;

    cartItems = cartItems.filter(item => item.name !== productName);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
    updateOrderSummary();
}