// Les variables
const uppercaseChars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars    = "abcdefghijklmnopqrstuvwxyz";
const numberChars       = "0123456789";
const symbolChars       = "!@#$%^&*()_+-=[]{}|;:,.<>?";
let estMasque = true;

// Variables pour le localStorage
let sauvegardeMinuscule = localStorage.getItem("minusculeStorage");
let sauvegardeMajuscule = localStorage.getItem("majusculeStorage");
let sauvegardeChiffre   = localStorage.getItem("chiffreStorage");
let sauvegardeSymbole   = localStorage.getItem("symboleStorage");


// Selectionner les elements
const btnGenerator      = document.querySelector("#bouton");
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


function chaineDeCaractere() {
    let chaines = "";
    if (minuscules.checked) chaines += lowercaseChars;
    if (majuscules.checked) chaines += uppercaseChars;
    if (chiffres.checked)   chaines += numberChars;
    if (symboles.checked)   chaines += symbolChars;
    sauvegarderPreferences();
    return chaines;
}

function sauvegarderPreferences() {
    if (minuscules.checked) {
        localStorage.setItem("minusculeStorage", "true");
    } else {
        localStorage.setItem("minusculeStorage", "false");
    }

    if (majuscules.checked) {
        localStorage.setItem("majusculeStorage", "true");
    } else {
        localStorage.setItem("majusculeStorage", "false");
    }

    if (chiffres.checked) {
        localStorage.setItem("chiffreStorage", "true");
    } else {
        localStorage.setItem("chiffreStorage", "false");
    }

    if (symboles.checked) {
        localStorage.setItem("symboleStorage", "true");
    } else {
        localStorage.setItem("symboleStorage", "false");
    }
}

function actualiserValeur() {
    let valeur = rangeInput.value;
    nbrCaracteres.textContent = valeur;
    return Number(valeur);
}

function generator() {
    const longueurMotDePasse = actualiserValeur();
    const chainesRecues = chaineDeCaractere();
    console.log(chainesRecues);
    // Gestion chaine vide
    if (chainesRecues === "") {
        avertissement.style.display = "block";
        textInput.style.borderColor = "red";
        return;
    }
    const nombresAleatoires = new Uint32Array(longueurMotDePasse);
    let motDePasse = "";
    window.crypto.getRandomValues(nombresAleatoires);
    for (let i = 0; i < nombresAleatoires.length; i++) {
        const randomIndex = nombresAleatoires[i] % chainesRecues.length;
        motDePasse += chainesRecues[randomIndex];
    }
    afficher(motDePasse);
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
    if (estMasque) {
        masquer.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        masquer.style.cursor = 'pointer';
        textInput.type = "password";
        estMasque = false;
    } else {
        masquer.innerHTML = '<i class="fa-slab-press fa-regular fa-eye">';
        textInput.type = "text";
        masquer.style.cursor = 'pointer';
        estMasque = true;
    }
}

function verifierSauvegarde() {
    if(sauvegardeMinuscule === null || sauvegardeMajuscule === null || sauvegardeChiffre === null || sauvegardeSymbole === null) return;
    // sauvegardeMinuscule === "true" ? minuscules.checked = true : minuscules.checked = false;
    // sauvegardeMajuscule === "true" ? majuscules.checked = true : majuscules.checked = false;
    // sauvegardeChiffre   === "true" ?   chiffres.checked = true : chiffres.checked = false;
    // sauvegardeSymbole   === "true" ?   symboles.checked = true : symboles.checked = false;
    minuscules.checked = sauvegardeMinuscule === "true";
    majuscules.checked = sauvegardeMajuscule === "true";
    chiffres.checked = sauvegardeChiffre === "true";
    symboles.checked = sauvegardeSymbole === "true";
}

avertissement.style.display = "none";
verifierSauvegarde();

// detection des evenements
rangeInput.addEventListener('input', actualiserValeur);
btnGenerator.addEventListener('click', () => {
    generator();
    modifierIcone();
});
copier.addEventListener('click', copierMotDePasse);
masquer.addEventListener('click', afficherMasquer);