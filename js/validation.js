const regexTitre = /^[A-Z a-z À-ÿ 0-9 '.,()-]{3,30}$/;
const regexCategories = /^[A-Z a-z À-ÿ 0-9 '.,()-]{3,30}$/;
const regexPrix = /^\d{1,4}(\.\d{1,2})?$/;



const regexNom = /^[A-Za-zÀ-ÿ'-]{3,30}$/;
const regexPrenom = /^[A-Za-zÀ-ÿ'-]{3,30}$/;
const regexPhone = /^0[67]\d{8}$/;
const regexMail = /^[A-Za-z0-9._-]+@[a-z.-]+\.[a-z]{2,}$/
const regexMsg = /^.{10,5000}$/;

export function produitValid() {
    const form = document.getElementById("produit-form")

    if (!form) {
        return;
    }

    const titre = document.getElementById("titre")
    const categorie = document.getElementById("categories")
    const prix = document.getElementById("price")

    const erreurTitre = document.getElementById("erreurTitre")
    const erreurCategorie = document.getElementById("erreurCategories")
    const erreurPrix = document.getElementById("erreurPrice")

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valide = true;

        if (regexTitre.test(titre.value.trim())) {
            erreurTitre.textContent = "";
        } else {
            erreurTitre.textContent = "le titre est invalid, entrer un titre entre 3 et 30 caractères"
            valide = false;
        }

        if (regexCategories.test(categorie.value.trim())) {
            erreurCategorie.textContent = "";
        } else {
            erreurCategorie.textContent = "Lettres seulement (3 à 30 caractères)";
            valide = false;
        }

        if (regexPrix.test(prix.value.trim())) {
            erreurPrix.textContent = ""
        } else {
            erreurPrix.textContent = "Prix invalid, Ex : 25 ou 25.00"
            valide = false;
        }

        if (valide) {
            console.log("Produit validé")
        }
    })
};

export function messageValide() {
    const form = document.getElementById("formMsg")

    if (!form) {
        return;
    }

    const nom = document.getElementById("Nom")
    const prenom = document.getElementById("prenom")
    const phone = document.getElementById("phone")
    const mail = document.getElementById("mail")
    const message = document.getElementById("msg")

    const erreurNom = document.getElementById("erreurNom")
    const erreurPrenom = document.getElementById("erreurPrenom")
    const erreurPhone = document.getElementById("erreurPhone")
    const erreurMail = document.getElementById("erreurMail")
    const erreurMsg = document.getElementById("erreurMsg")

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let valide = true;

        if (regexNom.test(nom.value.trim())) {
            erreurNom.textContent = ""
        } else {
            erreurNom.textContent = "Nom invalid"
            valide = false;
        }

        if (regexPrenom.test(prenom.value.trim())) {
            erreurPrenom.textContent = ""
        } else {
            erreurPrenom.textContent = "Prénom invalid"
            valide = false;
        }

        if (regexPhone.test(phone.value.trim())) {
            erreurPhone.textContent = ""
        } else {
            erreurPhone.textContent = "Numéro de télephone invalid"
            valide = false
        }

        if (regexMail.test(mail.value.trim())) {
            erreurMail.textContent = ""
        } else {
            erreurMail.textContent = "Mail entrée invalid"
            valide = false;
        }

        if (regexMsg.test(message.value.trim())) {
            erreurMsg.textContent = ""
        } else {
            erreurMsg.textContent = "Entrer un message entre 10 et 5000 caractères"
            valide = false;
        }

        if (valide) {
            console.log("Message valide !")
        }
    })
}

