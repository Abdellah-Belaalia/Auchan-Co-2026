const panier1 = document.getElementById("panier");
const main = document.getElementById("main");
const popUp = document.createElement("dialog");
export function showPanier() {
  panier1.addEventListener("click", () => {
    popUp.showModal();
  });
  function createPopup() {
    popUp.className =
      "fixed rigth-0 max-h-4/5 w-2/4 text-2xl rounded-2xl p-2 m-2 bg-red-100 font-bold text-[#333333] ";
    popUp.innerHTML = `
          <div class="flex justify-between">
            <h1 class="p-4">Panier</h1>
            <button id="btn-fermer" type="button" class="p-4">x</button>
          </div>
          <div></div>
          <div class="p-4">
          <h4>Total : <span>0</span><span>DH</span></h4>
          </div>
    `

    const btnFermer = popUp.querySelector('#btn-fermer')
    btnFermer.addEventListener('click', ()=>{
      console.log("button cliqué")
      popUp.close()
    })
    main.appendChild(popUp);
  }
  createPopup();
}
