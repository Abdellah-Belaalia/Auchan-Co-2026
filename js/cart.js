const panier1 = document.getElementById("panier");
const main = document.getElementById("main");
const popUp = document.createElement("dialog");
export function showPanier() {
  panier1.addEventListener("click", () => {
    popUp.showModal();
  });
  function createPopup() {
    popUp.className =
      "fixed rigth max-h-4/5 overflow-scroll text-2xl rounded-2xl p-2 m-2 w-60 bg-red-100 font-bold text-[#333333] ";
    popUp.innerHTML = `
          <div class="flex justify-between">
            <h1>Panier</h1>
            <button id="btnFermer" type="button">X</button>
          </div>
          <div> class="flex flex-wrap">
          
          </div>
    `;
    main.appendChild(popUp);
  }
  createPopup();
}
