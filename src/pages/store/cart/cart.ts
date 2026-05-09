import type { Product } from "../../../types/product";
import { addProduct, clearCart, deleteProduct, getProducts, substractProduct } from "./cartStorage";

const cartProducts = document.getElementById("cart-products") as HTMLDivElement;
const clearCartButton = document.getElementById("clear-cart-button") as HTMLButtonElement;


const renderCartProducts = () => {

    const productsInCart = getProducts();

    cartProducts.innerHTML = "";

    if (productsInCart.length === 0) {
        const emptyMessage = document.createElement("h2");
        emptyMessage.classList.add("empty-cart-message");
        emptyMessage.textContent = "El carrito está vacío";
        cartProducts.appendChild(emptyMessage);
        return;
    }

    const agrupados = productsInCart.reduce((acc: { [key: number]: { product: Product, quantity: number } }, product: Product) => {

        if (!acc[product.id]) {
            acc[product.id] = { product, quantity: 1 };
        } else {
            acc[product.id].quantity += 1;
        }       
        return acc;
    }, {});

    Object.entries(agrupados).forEach( ([key, value]) => {

        const {product, quantity}: {product: Product, quantity: number} = value; 
        
        const liProduct = document.createElement("li");
        liProduct.classList.add("cart-product");
    
        const img = document.createElement("img");
        img.src = "https://www.cronista.com/resizer/v2/NYN6HJ4M7NA7NLQ5ZRSSZOO3TM.jpg?auth=4fbd9b1bfcfcbe055b10a37ee77d4238afdf5678731b489b96bc64732e7c2cbe&height=533&width=800&quality=70&smart=true";
    

        const divInfo = document.createElement("div");
        divInfo.classList.add("cart-div-info");

        const divButtons = document.createElement("div");
        divButtons.classList.add("cart-div-buttons");

        const name = document.createElement("h3");
        name.textContent = product.nombre;
    
        const price = document.createElement("p");
        price.textContent = `Subtotal: $${ product.precio * quantity}`;

        const quantityElement = document.createElement("p");
        quantityElement.textContent = `${quantity}`;
    
        const addButton = document.createElement("button");
        const substractButton = document.createElement("button");
        const deleteButton = document.createElement("button");


        addButton.classList.add("adding-button");
        substractButton.classList.add("adding-button");
        deleteButton.classList.add("delete-button");

        addButton.innerHTML = "+";
        substractButton.innerHTML = "-"
        deleteButton.innerHTML = "Eliminar";

        addButton.addEventListener("click", ()=>{
            addProduct(product);
            renderCartProducts();
            renderTotalPrice();
        });

        substractButton.addEventListener("click", ()=>{
            substractProduct(product);
            renderCartProducts();
            renderTotalPrice();
        });

        deleteButton.addEventListener("click", ()=>{
            deleteProduct(product);
            renderCartProducts();
            renderTotalPrice();
        });


   

        divInfo.appendChild(name);
        divInfo.appendChild(price);
        
        divButtons.appendChild(addButton);
        divButtons.appendChild(quantityElement);
        divButtons.appendChild(substractButton);
        divButtons.appendChild(deleteButton);

        liProduct.appendChild(img);
        liProduct.appendChild(divInfo);
        liProduct.appendChild(divButtons);

        cartProducts.appendChild(liProduct);
    })
    
}



const renderTotalPrice = () => {

    const productsInCart = getProducts();
    
    const totalPrice = productsInCart.reduce((total: number, product: Product) => {
        return total + product.precio;
    }, 0);

    const totalPriceElement = document.getElementById("total-price") as HTMLParagraphElement;
    
    totalPriceElement.textContent = `Total: $${totalPrice}`;
}


clearCartButton.addEventListener("click", () => {
    clearCart();
    renderCartProducts();
    renderTotalPrice();
});


renderCartProducts();
renderTotalPrice();
