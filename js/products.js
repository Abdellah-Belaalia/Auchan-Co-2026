import { getProducts } from "./api.js";
let data = JSON.parse(localStorage.getItem("dataStock")) || [];
let cuurentPage = 1;
const iteamsPerPage = 8;
export function afficher() {
  const productsEL = document.getElementById("products");
  const btnLeft = document.getElementById("preBtn");
  const btnRight = document.getElementById("svtBtn");
  const numbrePage = document.getElementById("curPage");

  function rendre() {
    productsEL.innerText = "";
    let start = (cuurentPage - 1) * iteamsPerPage;
    // let filterProduct = filterProduct(data, select.value);
    let divPage = data.slice(start, start + iteamsPerPage);

    divPage.map((element) => {
      let card = document.createElement("div");
      card.innerHTML = `
      <img class = "w-full h-32 object-contain" src="${element.image}">
      <h3  class="pl-2 font-bold">${element.title}</h3>
      <p  class="pl-2 font-bold">${element.category}</p>
      <p  class="pl-2 font-bold">${element.price}</p>
      `;
      card.classList.add(
        "p-4",
        "rounded-lg",
        "shadow",
        "hover:shadow-lg",
        "hover:shadow-red-200",
      );
      productsEL.append(card);
    });
    // let totalPage = Math.ceil(filterProduct.length / iteamsPerPage);
    btnLeft.disabled = cuurentPage === 1;
    btnRight.disabled = cuurentPage === Math.ceil(data.length / iteamsPerPage);
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
  rendre();
}
getProducts();

// function filterProduct(productsEL, categories) {
//   return productsEL.filter((data) => {
//     return categories === "all" || data.category === categories;
//   });
// }
