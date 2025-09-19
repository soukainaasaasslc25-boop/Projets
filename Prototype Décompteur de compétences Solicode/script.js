function nombreOccurence() {
    let competence  = ["c1", "c2","c3","c5","c1","c6","c1","c7","c1","c8"];

let elementchercher = prompt("enterer elementchercher c  : ");
let compteur= 0;

for (let i = 0; i < competence.length; i++) {
    
    if (competence[i] === elementchercher) {

        compteur ++;

        // console.log("le nombre de "+ elementchercher +"est"+ compteur );
    }
  
    
}
console.log("le nombre  delement   "+ elementchercher +" est "+ compteur );
}
nombreOccurence();



