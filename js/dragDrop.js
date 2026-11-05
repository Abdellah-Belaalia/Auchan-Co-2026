import { data } from "./products.js";
const panier1 = document.getElementById("panier");
const productEL = document.getElementById('products')
const btnAjout = document.querySelectorAll('.btn-ajout');
export function dragDrop() {
    productEL.addEventListener('dragstart', (e) => {
        const produitCarte = e.target.closest(".product-card");
        if (!produitCarte) return;
        const produitId = produitCarte.dataset.productId;
        e.dataTransfer.setData("text/plain", produitId);
        console.log(produitId)
    })
};
panier1.addEventListener("dragover", (e) => {
    e.preventDefault()
});
panier1.addEventListener("drop", (e) => {
    e.preventDefault();
    const produitId = e.dataTransfer.getData("text/plain")
    const produit = data.find(element => element.id == produitId)
    if (!produit) return;
    const dropZone = document.querySelector('#drop');
    const unProduit = document.createElement('div');
    unProduit.innerHTML = `
    <div class="flex m-2 bg-white rounded-lg">
    <img class = "w-fit h-32 m-4 p-4 object-contain" src="${produit.image}">
    <div class="flex flex-col justify-center">
    <h3 class="pl-2 font-bold">${produit.title}</h3>
    <p class="pl-2 font-bold">${produit.category}</p>
    <p class="pl-2 font-bold">${produit.price}</p>
    </div>
    </div>
    `
    dropZone.append(unProduit)
});

