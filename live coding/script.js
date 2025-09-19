function nombreC() {

    let table=["c2","c1","c1","c6"];

   let element="c1";
   let conteur=0;
   for (let i = 0; i < table.length; i++) {
    if (table[i]===element) {

        conteur++;
      
    }
    
   }
   console.log("le nombre totale est" + conteur);  
}
nombreC();
