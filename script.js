// Les variables
const uppercaseChars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars    = "abcdefghijklmnopqrstuvwxyz";
const numberChars       = "0123456789";
const symbolChars       = "!@#$%^&*()_+-=[]{}|;:,.<>?";
let masque = true;
let motDePasseTemporaire;

// Variables pour le localStorage
let sauvegardeMinuscule = localStorage.getItem("minusculeStorage");
let sauvegardeMajuscule = localStorage.getItem("majusculeStorage");
let sauvegardeChiffre   = localStorage.getItem("chiffreStorage");
let sauvegardeSymbole   = localStorage.getItem("symboleStorage");


// Selectionner les elements
const btnGenerator      = document.querySelector("button");
const minuscules        = document.querySelector("#minuscules");
const majuscules        = document.querySelector("#majuscules");
const chiffres          = document.querySelector("#chiffres")
const symboles          = document.querySelector("#symboles")
const rangeInput        = document.querySelector("#nombre");
const nbrCaracteres     = document.querySelector("#nombreDeCaracteres");
const avertissement     = document.querySelector("#avertissement");
const textInput         = document.querySelector("#caracteresGeneres");
const copier            = document.querySelector("#fa-copy");
const masquer           = document.querySelector("#fa-eye");

verifierSauvegarde();

// Les fonctions
function chainageETlocalStorage() {
    let chaines = "";
    if (minuscules.checked) {
        chaines += lowercaseChars;
        localStorage.setItem("minusculeStorage", "true");
    } else {
        localStorage.setItem("minusculeStorage", "false");
    }

    if (majuscules.checked) {
        chaines += uppercaseChars;
        localStorage.setItem("majusculeStorage", "true");
    } else {
        localStorage.setItem("majusculeStorage", "false");
    }

    if (chiffres.checked) {
        chaines += numberChars;
        localStorage.setItem("chiffreStorage", "true");
    } else {
        localStorage.setItem("chiffreStorage", "false");
    }

    if (symboles.checked) {
        chaines += symbolChars;
        localStorage.setItem("symboleStorage", "true");
    } else {
        localStorage.setItem("symboleStorage", "false");
    }

    if (chaines === "") {
        chaines += uppercaseChars + lowercaseChars + symbolChars + numberChars;
        return chaines;
    }
    return chaines;
}

function actualiserValeur() {
    let valeur = rangeInput.value;
    nbrCaracteres.textContent = valeur;
    return Number(valeur);
}

function generator() {
    const nbr = actualiserValeur();
    const chainesRecues = chainageETlocalStorage();
    const tableau = new Uint32Array(nbr);
    let string = "";
    window.crypto.getRandomValues(tableau);
    for (let i = 0; i < tableau.length; i++) {
        const randomIndex = tableau[i] % chainesRecues.length;
        string += chainesRecues[randomIndex];
    }
    motDePasseTemporaire = string;
    afficher(string);
    // indicateur(string);
}

function afficher(motDePasse) {
    textInput.style.color = "white";
    textInput.value = motDePasse;
}

function modifierIcone() {
    copier.innerHTML = '<i class="fa-slab-press fa-regular fa-copy"></i>';
    masquer.innerHTML = '<i class="fa-slab-press fa-regular fa-eye"></i>'
}

async function copierMotDePasse() {
    try {
        if (textInput.value === "") return;
        await navigator.clipboard.writeText(textInput.value);
        copier.innerHTML = '<i class="fa-solid fa-check"></i>';
    } catch (error) {
        console.log(error);
    } 
}

function afficherMasquer() {
    if (textInput.value === "") return;
    if (masque) {
        masquer.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        masquer.style.cursor = 'pointer';
        textInput.value = "*".repeat(textInput.value.length);
        masque = false;
    } else {
        masquer.innerHTML = '<i class="fa-slab-press fa-regular fa-eye">';
        textInput.value = motDePasseTemporaire;
        masquer.style.cursor = 'pointer';
        masque = true;
    }
}

function verifierSauvegarde() {
    sauvegardeMinuscule === "true" ? minuscules.checked = true : minuscules.checked = false;
    sauvegardeMajuscule === "true" ? majuscules.checked = true : majuscules.checked = false;
    sauvegardeChiffre   === "true" ?   chiffres.checked = true : chiffres.checked = false;
    sauvegardeSymbole   === "true" ?   symboles.checked = true : symboles.checked = false;
}

// function sauvegarde() {
//     if (localStorage.getItem("minusculeStorage") !== null) {
//         conserverParamètres();
//     } else {
//         localStorage.setItem("minusculeStorage", true);
//     }
// }

// function conserverParamètres() {
//     if (localStorage.getItem("minusculeStorage")) {
//         minuscules.checked = true;
//     } else {
//         minuscules.checked = false;
//     }
// }

// detection des evenements
rangeInput.addEventListener('input', actualiserValeur);
btnGenerator.addEventListener('click', () => {
    generator();
    modifierIcone();
});
copier.addEventListener('click', copierMotDePasse);
masquer.addEventListener('click', afficherMasquer)







