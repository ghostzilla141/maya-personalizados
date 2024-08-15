// Obtén todos los botones "Agregar al Carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Agrega un event listener a cada botón
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
});

function addToCartClicked(event) {
    
    // Evita que el enlace navegue a otra página
    event.preventDefault();
    console.log(productName, productPrice, productImage)

    // Obtén el producto al que se le hizo clic
    const productItem = event.target.closest('.product-item');
    const productName = productItem.dataset.name;
    const productPrice = productItem.querySelector('.price').textContent;
    const productImage = productItem.querySelector('img').src;

    // Agrega el producto al carrito (LocalStorage)
    addProductToCart(productName, productPrice, productImage);

    // Puedes agregar una alerta o mensaje de confirmación aquí si lo deseas
    alert("Producto agregado al carrito!"); 
}

function addProductToCart(name, price, image) {
    let cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    // Verifica si el producto ya está en el carrito
    const existingProduct = cartItems.find(item => item.name === name);

    if (existingProduct) {
        // Si ya existe, incrementa la cantidad
        existingProduct.quantity++;
    } else {
        // Si no existe, agrégalo al carrito
        cartItems.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

