export function setupMenu(){
    const btnMenu = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const btnClose = document.getElementById("closeBtn");
    const background = document.getElementById("background");

    if(!btnMenu || !sidebar || !btnClose || !background){
        return;
    }

    btnMenu.addEventListener('click', ()=> {
        sidebar.classList.remove("hidden")
        background.classList.remove("hidden")
    });
    btnClose.addEventListener('click', ()=> {
        sidebar.classList.add("hidden")
        background.classList.add("hidden")
    });
    background.addEventListener('click', ()=> {
        sidebar.classList.add("hidden")
        background.classList.add("hidden")
    });
}