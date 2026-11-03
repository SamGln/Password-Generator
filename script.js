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

// Masquer l'erreur
avertissement.style.display = "none";

// Les fonctions
function categories () {
    let chaines = "";
    if (minuscules.checked) {
        chaines += lowercaseChars;
    }
    if (majuscules.checked) {
        chaines += uppercaseChars;
    }
     if (chiffres.checked) {
        chaines += numberChars;
    }
     if (symboles.checked) {
        chaines += symbolChars;
    } 
    let caracteresRecuperes = chaines;
    chaines = "";
    return caracteresRecuperes;
}

function actualiserValeur() {
    let valeur = rangeInput.value;
    nbrCaracteres.textContent = valeur;
    return Number(valeur);
}

function verifier(chainesRecues) {
    if (chainesRecues === "") {
        avertissement.style.display = "block";
        textInput.value = "";
        return true;
    }
    return false;
}

function generator() {
    const nbr = actualiserValeur();
    const chainesRecues = categories();
    const verification = verifier(chainesRecues);
    if (verification) {
        return;
    }
    avertissement.style.display = "none";
    const tableau = new Uint32Array(nbr);
    let string = "";
    window.crypto.getRandomValues(tableau);
    for (let i = 0; i < tableau.length; i++) {
        const randomIndex = tableau[i] % chainesRecues.length;
        string += chainesRecues[randomIndex];
    }
    afficher(string);
}

function afficher(motDePasse) {
    textInput.style.color = "white";
    textInput.value = motDePasse;
}


// detection des evenements
rangeInput.addEventListener('input', actualiserValeur);
btnGenerator.addEventListener('click', generator);




