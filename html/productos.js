const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
});

function addToCartClicked(event) {
    event.preventDefault();

    const productItem = event.target.closest('.product-item');
    const productName = productItem.dataset.name;
    const productPrice = productItem.querySelector('.price').textContent;
    const productImage = productItem.querySelector('img').src;

    console.log(productName, productPrice, productImage);

    addProductToCart(productName, productPrice, productImage);

    alert("Producto agregado al carrito!"); 
}

function addProductToCart(name, price, image) {
    let cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    const existingProduct = cartItems.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartItems.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}