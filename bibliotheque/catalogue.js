
let bibliotheque = JSON.parse(localStorage.getItem("bibliotheque")) || [
  {code:1, titre:"histoire", auteur:"gaclin", annee:2006, prixDh:200, disponible:true},
  {code:2, titre:"history", auteur:"gaclin", annee:2006, prixDh:256, disponible:true}
];

function sauvegarder() {
  localStorage.setItem("bibliotheque", JSON.stringify(bibliotheque));
}

// Ouvrir ajouter.html
function ouvrirAjouter() {
  window.open("ajouter.html", "AjouterLivre");
}

// Afficher la liste des livres
function AfficherlistesLivres() {
  const liste = document.getElementById("liste");
  liste.innerHTML = "";

  bibliotheque.forEach(livre => {
    const carte = document.createElement("div");
    carte.classList.add("carte");
    carte.style.border = "2px solid #ffcd97ff";
    carte.style.borderRadius = "10px";
    carte.style.padding = "15px";
    carte.style.margin = "10px";
    carte.style.width = "250px";
    carte.style.display = "inline-block";
    carte.style.verticalAlign = "top";
    carte.style.boxShadow = "3px 3px 10px rgba(0,0,0,0.2)";
    carte.style.transition = "transform 0.2s";

    carte.onmouseover = () => {
      carte.style.transform = "scale(1.05)";
    };
    carte.onmouseout = () => {
      carte.style.transform = "scale(1)";
    };

    if (livre.reserve) {
      carte.style.background = "#fff3cd"; // jaune = réservé
    } else if (!livre.disponible) {
      carte.style.background = "#ffe5e5"; // Rouge = emprunté
    } else {
      carte.style.background = "#ffffff"; // Blanc = dispo
    }

    carte.innerHTML = `
    <img src="${livre.image || 'default.jpg'}" alt="Image du livre" width="120" height="160">
      <h3>${livre.titre}</h3>
      <p>Auteur : ${livre.auteur}</p>
      <p>Année : ${livre.annee}</p>
      <p>Prix : ${livre.prixDh} DH</p>
      <p>Statut : ${livre.reserve ? "📗 Réservé" : (livre.disponible ? "✅ Disponible" : "❌ Emprunté")}</p>
    `;

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "10px";

    // bouton Emprunter/Rendre
    const btnAction = document.createElement("button");
    btnAction.textContent = livre.disponible ? "Emprunter" : "Rendre";
    btnAction.style.backgroundColor = livre.disponible ? "#a34706" : "#fb9700";
    btnAction.style.border = "none";
    btnAction.style.borderRadius = "5px";
    btnAction.style.padding = "5px 10px";
    btnAction.onclick = () => changerDisponibilite(livre.code);
    actions.appendChild(btnAction);

    // bouton Supprimer
    const btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "Supprimer";
    btnSupprimer.style.backgroundColor = "#784f2c";
    btnSupprimer.style.color = "white";
    btnSupprimer.style.border = "none";
    btnSupprimer.style.borderRadius = "5px";
    btnSupprimer.style.padding = "5px 10px";
    btnSupprimer.onclick = () => supprimerLivre(livre.code);
    actions.appendChild(btnSupprimer);

    // bouton Réserver
    const btnReserver = document.createElement("button");
    btnReserver.textContent = "Réserver";
    btnReserver.style.backgroundColor = "#3498db";
    btnReserver.style.color = "white";
    btnReserver.style.border = "none";
    btnReserver.style.borderRadius = "5px";
    btnReserver.style.padding = "5px 10px";
    btnReserver.onclick = () => reserverLivre(livre.code);
    actions.appendChild(btnReserver);

    carte.appendChild(actions);
    liste.appendChild(carte);
  });
    sauvegarder();
  afficherstatus();
}

// changer disponibilité
function changerDisponibilite(code) {
  const livre = bibliotheque.find(l => l.code === code);
  if (livre) livre.disponible = !livre.disponible;
    sauvegarder();
  AfficherlistesLivres();
}

// supprimer livre
function supprimerLivre(code) {
  bibliotheque = bibliotheque.filter(l => l.code !== code);
    sauvegarder();
  AfficherlistesLivres();
}

// réserver livre
function reserverLivre(code) {
  const livre = bibliotheque.find(l => l.code === code);
  if (livre) {
    if (livre.disponible && !livre.reserve) {
      livre.reserve = true;
      livre.disponible = false;
      alert("📘 Livre réservé avec succès !");
    } else if (livre.reserve) {
      alert("⚠️ Livre déjà réservé !");
    } else {
      alert("❌ Livre non disponible !");
    }
  }
    sauvegarder();
  AfficherlistesLivres();
}

// rechercher
document.getElementById("search").oninput = function () {
  const mot = this.value.toLowerCase();
  const cartes = document.getElementsByClassName("carte");

  for (let i = 0; i < cartes.length; i++) {
    const titre = cartes[i].querySelector("h3").textContent.toLowerCase();
    if (titre.includes(mot)) {
      cartes[i].style.display = "block";
    } else {
      cartes[i].style.display = "none";
    }
  }
};

// trier
let ordreCroissant = true;
document.getElementById("btnTrier").addEventListener("click", () => {
  bibliotheque.sort((a, b) => ordreCroissant ? a.titre.localeCompare(b.titre) : b.titre.localeCompare(a.titre));
  ordreCroissant = !ordreCroissant;
  AfficherlistesLivres();
});

// stats
function afficherstatus() {
    let total = bibliotheque.length;
    let disponible = 0;
    let prixTotale = 0;
    let prixMax = 0;
    let prixMin = bibliotheque.length > 0 ? bibliotheque[0].prixDh : 0;
    let nomMax = "";
    let nomMin = bibliotheque.length > 0 ? bibliotheque[0].titre : "";

    bibliotheque.forEach(livre => {
        prixTotale += livre.prixDh;
        if(livre.disponible) disponible++;
        if (livre.reserve) {
          disponible--;
        }
        if(livre.prixDh > prixMax)
           { prixMax = livre.prixDh; nomMax = livre.titre; }
        if(livre.prixDh < prixMin)
           { prixMin = livre.prixDh; nomMin = livre.titre; }
    });

    let moyennePrix = total ? (prixTotale/total).toFixed(2) : 0;

    document.getElementById("stats").textContent =
    `Total livres: ${total} | Disponible: ${disponible} | Empruntés: ${total-disponible} | Total prix: ${prixTotale} DH | Plus cher: ${nomMax} (${prixMax} DH) | Moins cher: ${nomMin} (${prixMin} DH) | Prix moyen: ${moyennePrix} DH`;
}

// ajout depuis ajouter.html
function ajouterLivre(livre) {
  bibliotheque.push(livre);
  AfficherlistesLivres();
}

AfficherlistesLivres();