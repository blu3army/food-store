import type { Product } from "../../../types/product";

export const addProduct = (product: Product) => {

    const productsInCart: Product[] = getProducts();

    // if (!productsInCart.find((p: Product) => p.id === product.id)) {
    // }
    productsInCart.push(product);

    localStorage.setItem("cart", JSON.stringify(productsInCart));
}


export const substractProduct = (product: Product) => {

    const productsInCart: Product[] = getProducts();
    const index = productsInCart.findIndex((p: Product) => p.id === product.id);

    if (index !== -1) {
        productsInCart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(productsInCart));
    }
}


export const deleteProduct = (product: Product) => {

    const productsInCart: Product[] = getProducts();
    const filteredProducts = productsInCart.filter((p: Product) => p.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(filteredProducts));
}

export const getProducts = (): Product[] => {

    return  JSON.parse(localStorage.getItem("cart") as string) || [];
}

export const clearCart = () => {
    localStorage.removeItem("cart");
}