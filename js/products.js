import { getProducts } from "./api.js";
export let data = JSON.parse(localStorage.getItem("dataStock")) || [];
let cuurentPage = 1;
const iteamsPerPage = 8;
export function afficher() {
  const productsEL = document.getElementById("products");
  const btnLeft = document.getElementById("preBtn");
  const btnRight = document.getElementById("svtBtn");
  const numbrePage = document.getElementById("curPage");
  const select = document.getElementById("categorieFilter");
  const rechercher = document.getElementById("searchBarre");

  function rendre() {
    productsEL.innerHTML = "";
    let filterProduct = filterByCategory(data, select.value);
    filterProduct = filterByName(filterProduct, rechercher.value);
    let start = (cuurentPage - 1) * iteamsPerPage;
    let divPage = filterProduct.slice(start, start + iteamsPerPage);

    divPage.map((element) => {
      let card = document.createElement("div");
      card.dataset.productId = element.id;
      card.innerHTML = `
      <img class = "w-full h-32 object-contain" src="${element.image}">
      <div class="flex justify-between">
      <div>
      <h3 class="pl-2 font-bold">${element.title}</h3>
        <p class="pl-2 font-bold">${element.category}</p>
        <p class="pl-2 font-bold">${element.price}</p>
      </div>
      <button type="button" class="btn-ajout bg-red-400 font-bold border rounded-lg m-4 text-white w-20">Ajouter</button>
      </div>
      `;
      card.classList.add(
        "product-card",
        "p-4",
        "rounded-lg",
        "shadow",
        "hover:shadow-lg",
        "hover:shadow-red-200",
      );
      card.draggable = true;
      card.dataset.image = element.image
      card.dataset.title = element.title 
      card.dataset.price = element.price

      productsEL.append(card);
    });
    let totalPage = Math.ceil(filterProduct.length / iteamsPerPage);
    btnLeft.disabled = cuurentPage === 1;
    btnRight.disabled = cuurentPage >= totalPage;
    numbrePage.textContent = cuurentPage;
  }
  btnLeft.addEventListener("click", () => {
    if (cuurentPage > 1) {
      cuurentPage--;
      rendre();
    }
  });

  btnRight.addEventListener("click", () => {
    if (cuurentPage < Math.ceil(data.length / iteamsPerPage)) {
      cuurentPage++;
      rendre();
    }
  });
  select.addEventListener("change", () => {
    cuurentPage = 1;
    rendre();
  });
  rechercher.addEventListener("input", () => {
    cuurentPage = 1;
    rendre();
  });
  rendre();
}
getProducts();

function filterByCategory(productsEL, categories) {
  return productsEL.filter((data) => {
    return categories === "all" || data.category === categories;
  });
}

function filterByName(products, search) {
  console.log("Products:", products);
  console.log("Search:", search);
  return products.filter((datas) => {
    return datas.title.toLowerCase().includes(search.toLowerCase());
  });
}
