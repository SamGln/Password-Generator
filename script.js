// Les variables
const uppercaseChars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars    = "abcdefghijklmnopqrstuvwxyz";
const numberChars       = "0123456789";
const symbolChars       = "!@#$%^&*()_+-=[]{}|;:,.<>?";
// let caseCoche = false;

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

// Masquer l'erreur
avertissement.style.display = "none";

// Les fonctions
function categories() {
    let chaines = "";
    if (minuscules.checked) chaines += lowercaseChars;
    if (majuscules.checked) chaines += uppercaseChars;
    if (chiffres.checked)   chaines += numberChars;
    if (symboles.checked)   chaines += symbolChars;
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
    const chainesRecues = categories();
    const tableau = new Uint32Array(nbr);
    let string = "";
    window.crypto.getRandomValues(tableau);
    for (let i = 0; i < tableau.length; i++) {
        const randomIndex = tableau[i] % chainesRecues.length;
        string += chainesRecues[randomIndex];
    }
    afficher(string);
    // indicateur(string);
}

function afficher(motDePasse) {
    textInput.style.color = "white";
    textInput.value = motDePasse;
}

function modifierIcone() {
    copier.innerHTML = '<span><i class="fa-slab-press fa-regular fa-copy"></i></span>';
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


// detection des evenements
rangeInput.addEventListener('input', actualiserValeur);
btnGenerator.addEventListener('click', () => {
    generator();
    modifierIcone();
});
copier.addEventListener('click', copierMotDePasse);




