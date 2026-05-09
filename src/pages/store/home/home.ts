import { getCategories, PRODUCTS } from "../../../data/data";
import type { ICategory } from "../../../types/category";
import type { Product } from "../../../types/product";
import { addProduct } from "../cart/cartStorage";

const ulCategories = document.getElementById("ul-categories") as HTMLUListElement;
const ulProducts = document.getElementById("ul-products") as HTMLUListElement;
const inputSearch = document.getElementById("input-search") as HTMLInputElement;

const pCriteriaSelected = document.getElementById("criteria") as HTMLSelectElement;

let selectedCriteria: string = "";
let searchTerm: string = "";
let selectedCategory: string = "";


inputSearch.addEventListener("input", () => {
  searchTerm = inputSearch.value.trim().toLocaleLowerCase();
  selectedCriteria = "search";
  renderProducts();
});




const renderCategories = () => {

  const li = document.createElement("li");

  li.addEventListener("click", () => {
    selectedCategory = "";
    selectedCriteria = "";
    pCriteriaSelected.textContent = "";
    renderProducts();
  });

  li.textContent = "Todas las categorías";
  ulCategories.appendChild(li);


  getCategories().forEach((category: ICategory ) => {
    const li = document.createElement("li");

    li.addEventListener("click", () => {
      selectedCategory = category.nombre;
      selectedCriteria = "category";
      renderProducts();
    });

    li.textContent = category.nombre;
    ulCategories.appendChild(li);
});

}

const renderProducts = () => {  

  ulProducts.innerHTML = "";

  let filteredProducts: Product[] = [];
  let countProducts: number = 0;

  if (selectedCriteria === "category") {
    filteredProducts = PRODUCTS.filter((product: Product) => product.categorias[0].nombre.includes(selectedCategory) );
    countProducts = filteredProducts.length;

    pCriteriaSelected.textContent = `Categoría seleccionada: ${selectedCategory}, ${countProducts} productos encontrados`;

  } else if (selectedCriteria === "search") {
    

    filteredProducts = PRODUCTS.filter((product: Product) => product.nombre.toLocaleLowerCase().includes(searchTerm));
    countProducts = filteredProducts.length;

    if (searchTerm === "") {
      pCriteriaSelected.textContent = "";
    }
    else {
      pCriteriaSelected.textContent = `Búsqueda, ${countProducts} productos encontrados`;
    }
  
  } else {

    filteredProducts = PRODUCTS;

  }

  
  

  filteredProducts.forEach((product: Product) => {
    const li = document.createElement("li");
    
    const img = document.createElement("img");
    img.src = "https://www.cronista.com/resizer/v2/NYN6HJ4M7NA7NLQ5ZRSSZOO3TM.jpg?auth=4fbd9b1bfcfcbe055b10a37ee77d4238afdf5678731b489b96bc64732e7c2cbe&height=533&width=800&quality=70&smart=true";
    img.classList.add("home-image");

    const pCategory = document.createElement("p");
    pCategory.textContent = product.categorias[0].nombre;
    pCategory.classList.add("home-category");

    const title = document.createElement("h3");
    title.classList.add("home-title");
    title.textContent = product.nombre;

    const description = document.createElement("p");
    description.classList.add("home-description");
    description.textContent = product.descripcion;

    
    const price = document.createElement("p");
    

    const spanPrice = document.createElement("span");
    spanPrice.textContent = `$${product.precio.toFixed(0)}`;
    spanPrice.classList.add("home-price");
    

    const buttonAdd = document.createElement("button");
    buttonAdd.classList.add("home-button-add");
    buttonAdd.textContent = "Agregar";
    buttonAdd.addEventListener("click", () => {
      buttonAdd.textContent = "Agregando...";
      buttonAdd.disabled = true;
      buttonAdd.classList.remove("home-button-add");
      buttonAdd.classList.add("home-button-adding");
      addProduct(product);
      
      setTimeout(() => {
        buttonAdd.textContent = "Agregar";
        buttonAdd.disabled = false;
        buttonAdd.classList.remove("home-button-adding");
        buttonAdd.classList.add("home-button-add");
      }, 1500);
    });
    
    price.appendChild(spanPrice);
    price.appendChild(buttonAdd);
  
    li.appendChild(img);
    li.appendChild(pCategory);
    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(price);
    
    ulProducts.appendChild(li);
  });

}


renderCategories();
renderProducts();