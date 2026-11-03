import { getProducts } from "./api.js";
let data = JSON.parse(localStorage.getItem("dataStock")) || [];
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
      <h3  class="pl-2 font-bold">${element.title}</h3>
      <p  class="pl-2 font-bold">${element.category}</p>
      <p  class="pl-2 font-bold">${element.price}</p>
      `;
      card.classList.add(
        "product-card",
        "p-4",
        "rounded-lg",
        "shadow",
        "hover:shadow-lg",
        "hover:shadow-red-200",
      );
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

