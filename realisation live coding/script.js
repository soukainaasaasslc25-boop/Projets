
let   personalP = prompt("Veuillez entrer votre nom pour commencer le jeu:");


const codes = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"];

const noms = [
     "Maquettage",
      "HTML / CSS", 
      "JS", 
      "SQL",
       "AccèsBDD",
        "PHP",
        "CMS",
        "FrameworkJS"
    ];  
 let score=0;

function jeu() {
   

for (let i= 0; i< noms.length; i++) {
    console.log("question" +(i+1))
     
let repence= prompt("Quel est le code de la compétence: " +noms[i]);
if (repence !== "" && repence.toUpperCase() === codes[i]) {

    console.log(" Correct! La réponse est bien " +codes[i])
    score++;
   
    
}else(
    
    console.log("Incorrect. La bonne réponse pour  "+noms[i]+" est "+codes[i])
)

    
}

    console.log("Score total  " +score + " /8")

if ( score <= noms.length / 2) {
        console.log( `Merci d'avoir joué, ${personalP}! Vous pouvez réessayer pour améliorer votre score.`)   
}
else if (score === noms.length) {

    console.log(` Bravo ${personalP}! Excellent travail!`)
  }

  else if (score >= noms.length / 2) {

      console.log(" Bien joué ! Continue de t'entraîner.");
  }
}
       
jeu();