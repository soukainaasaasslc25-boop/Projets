let form = document.getElementById("form");
form.style.border = "2px solid #d88837ff";
form.style.padding = "20px";
form.style.borderRadius = "10px";
form.style.width = "300px";
form.style.backgroundColor = "#f9f9f9";
form.style.display = "flex";
form.style.flexDirection = "column";
form.style.gap = "10px";

document.getElementById("form").onsubmit = function(e) {
  e.preventDefault();

  
  const imageInput = document.getElementById("image");
  const fichier = imageInput.files[0];

  
  let imageData = ""; 

  if (fichier) {
    imageData = URL.createObjectURL(fichier); 
  } else {
    imageData = ""; 
  }

 
  const livre = {
    code: parseInt(document.getElementById("code").value),
    titre: document.getElementById("Titre").value,
    auteur: document.getElementById("Auteur").value,
    annee: parseInt(document.getElementById("Annee").value),
    prixDh: parseFloat(document.getElementById("Prix").value),
    image: imageData, 
    disponible: document.getElementById("disponible").checked
  };

  if (window.opener && !window.opener.closed) {
    window.opener.ajouterLivre(livre); 
    alert("Livre ajouté !");
    window.close();
  } else {
    alert("La page catalogue n'est pas ouverte !");
  }
};