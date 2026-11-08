import { data } from "./products.js";
let panier = JSON.parse(localStorage.getItem("panier")) || [];
const panier1 = document.getElementById("panier");
const productEL = document.getElementById('products')
// const btnAjout = document.querySelectorAll('.btn-ajout');
// const btnPlus = document.querySelectorAll('.btn-plus');
// const btnMoins = document.querySelectorAll('.btn-moins');
// const quantite = document.querySelectorAll('.quantite');
    const dropZone = document.querySelector('#drop');
export function ajouterBtn(produitId) {
    const produit = data.find(element => element.id == produitId)
    if (!produit) return;
    const dropZone = document.querySelector('#drop');
    const produitExist = dropZone.querySelector(
        `[data-product-id="${produitId}"]`);
    if (produitExist) {
        const quantite = produitExist.querySelector(".quantite")
        const prix = produitExist.querySelector(".prix")
        let nombre = Number(quantite.textContent)

        nombre++;

        quantite.textContent = nombre;

        let total = Number(produit.price) * nombre;

        prix.textContent = total.toFixed(2) + "DH";
        const article = panier.find(p => p.id == produitId);
        if (article) {
            article.quantite = nombre;
        }

        totalCalcul();
        saveBasket()
        return
    }
    const unProduit = document.createElement('div');
    unProduit.dataset.productId = produit.id;
    unProduit.innerHTML = `
        <div class="flex w-full items-center gap-4 p-4 bg-white rounded-xl shadow-md">
            <div class="w-1/3 h-36 flex items-center justify-center bg-gray-50 rounded-lg">
                <img class="max-h-full max-w-full object-contain" src="${produit.image}"/>
            </div>
            <div class="flex-1 min-w-0 flex flex-col justify-between h-36">
                <div>
                    <h3 class="pl-2 font-extralight text-lg">${produit.title}</h3>
                    <p class="pl-2 font-extralight text-lg">${produit.category}</p>
                    <p class="prix pl-2 font-extralight text-lg">${produit.price}DH</p>
                </div>
                <div class="flex items-center justify-between gap-3">
                    <button type="button" class="btn-delete w-10 h-10 rounded-lg bg-red-600 text-white hover:bg-red-300">X</button>    
                    <button type="button" class="btn-moins w-10 h-10 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold text-xl">
                         -
                    </button>
                    <span class="quantite">1</span>
                    <button type="button" class="btn-plus w-10 h-10 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold text-xl">
                         +
                    </button>
                     
                </div>
            </div>
        </div>
    `
    dropZone.append(unProduit);

    panier.push({
        ...produit,
        quantite: 1,
    });

    totalCalcul();
    saveBasket()

    unProduit.addEventListener('click', (e) => {
        const btnDelete = e.target.closest(".btn-delete");
        const btnPlus = e.target.closest(".btn-plus");
        const btnMoins = e.target.closest(".btn-moins");

        if (btnDelete) {
            unProduit.remove(),
                panier = panier.filter(p => p.id != produitId);

            totalCalcul()
            saveBasket()
            return;
        }

        if (!btnMoins && !btnPlus) return;
        const quantite = unProduit.querySelector(".quantite");
        const prix = unProduit.querySelector(".prix")
        let nombre = Number(quantite.textContent);

        if (btnPlus) {
            nombre++
        }
        if (btnMoins && nombre > 1) {
            nombre--
        }
        quantite.textContent = nombre;

        let total = Number(produit.price) * nombre;

        prix.textContent = total.toFixed(2) + "DH"

        const article = panier.find(p => p.id == produitId);
        if (article) {
            article.quantite = nombre;
        };

        totalCalcul();
        saveBasket()
    });

};

export function dragDrop() {
    const panier1 = document.getElementById("panier");
    const productEL = document.getElementById('products')

    if (!productEL || !panier1){
        return;
    }

    productEL.addEventListener('dragstart', (e) => {
        const produitCarte = e.target.closest(".product-card");
        if (!produitCarte) return;
        const produitId = produitCarte.dataset.productId;
        e.dataTransfer.setData("text/plain", produitId);
    })
    panier1.addEventListener("dragover", (e) => {
        e.preventDefault()
    });
    panier1.addEventListener("drop", (e) => {
        e.preventDefault();
        const produitId = e.dataTransfer.getData("text/plain")
        ajouterBtn(produitId);
    });
};

function totalCalcul() {
    const prixTotal = document.querySelectorAll(".prix");
    const totalElement = document.querySelector("#total")

    if(! totalElement) return;

    let total = 0;
    prixTotal.forEach(prix => {
        total += parseFloat(prix.textContent)
    });
    totalElement.textContent = total.toFixed(2);
}
function saveBasket() {
    localStorage.setItem("panier", JSON.stringify(panier))
}

// export function restaurePanier() {
//     panier.forEach(article => {
//         const card = document.createElement('div');
//         card.dataset.productId = article.id;
//         card.innerHTML = `
//         <div class="flex w-full items-center gap-4 p-4 bg-white rounded-xl shadow-md">
//             <div class="w-1/3 h-36 flex items-center justify-center bg-gray-50 rounded-lg">
//                 <img class="max-h-full max-w-full object-contain" src="${article.image}"/>
//             </div>
//             <div class="flex-1 min-w-0 flex flex-col justify-between h-36">
//                 <div>
//                     <h3 class="pl-2 font-extralight text-lg">${article.title}</h3>
//                     <p class="pl-2 font-extralight text-lg">${article.category}</p>
//                     <p class="prix pl-2 font-extralight text-lg">${(article.price * article.quantite).toFixed(2)}DH</p>
//                 </div>
//                 <div class="flex items-center justify-between gap-3">
//                     <button type="button" class="btn-delete w-10 h-10 rounded-lg bg-red-600 text-white hover:bg-red-300">X</button>    
//                     <button type="button" class="btn-moins w-10 h-10 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold text-xl">
//                          -
//                     </button>
//                     <span class="quantite">${article.quantite}</span>
//                     <button type="button" class="btn-plus w-10 h-10 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold text-xl">
//                          +
//                     </button>
                     
//                 </div>
//             </div>
//         </div>
//         `
//         dropZone.append(card);
//     }
//         card.addEventListener('click', (e) => {
//             const btnDelete = e.target.closest(".btn-delete");
//             const btnPlus = e.target.closest(".btn-plus");
//             const btnMoins = e.target.closest(".btn-moins");
//         })
//     )}

// const produits = document.querySelectorAll('.product-card')
// for (let x = 0; x < produits.length; x++) { console.log(produits[x].dataset.price) }

// document.querySelectorAll('#drop')[0].childNodes[i].children[0].children[1].childNodes[1].childNodes[5].innerText

// const produits = document.querySelectorAll('#drop')
// for (let x = 0; x < produits.length; x++) { console.log(produits[x]..childNodes[0].children[0].children[1].childNodes[1].childNodes[5].innerText) }

