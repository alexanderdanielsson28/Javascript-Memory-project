"use strict";

var RandomGenerator={
    
    /*Denna metod tar antalet rader och columner som inparameter.
		Metoden returnerar en array innehållandes utslumpade tal mellan 1 och (rows*cols)/2. Varje tal representeras två
		gånger och kommer visa antal spelbrickor spelet. Om ni inte hänger med på vad som händer på
		någon rad så säg till så ska jag försöka hjälpa till...jag har ej provkört spelet än=) //Alex
		
	getPicsArray
	*/
    
    getPicsArray:function(rows, colum){         //jag skickar in antal rader o columer 
        var numberOfImages=rows*colum;          //gångar ihop för att bestämma antal spelbrickor
        var maxImagesNumber=numberOfImages/2;   //delar upp i antal unika nummer på brickan
        
        var imgPlace=[];
        
        //utplasering av bilderna i en array
        for(var i=0;i< numberOfImages;i++){
            imgPlace[i]=0;
            console.log(imgPlace);
        }
        
        for(var currentImageNumber=1;currentImageNumber <= maxImagesNumber;currentImageNumber++){
            var imageOneOK=false;
            var imageTwoOk=false;
            
            do{
                if(imageOneOK==false){
                    var randomOne=Math.floor( (Math.random() *(rows*colum-0) + 0));
                
                    if(imgPlace[randomOne]==0){
                        imgPlace[randomOne]=currentImageNumber;
                        imageOneOK=true;
                    }
                }
                 if(imageTwoOk==false){
                    var randomTwo=Math.floor( (Math.random() *(rows*colum) + 0));
                
                    if(imgPlace[randomTwo]==0){
                        imgPlace[randomTwo]=currentImageNumber;
                        imageTwoOk=true;
                    }
                }
            }
            while(imageOneOK == false || imageTwoOk == false);
        }
        return imgPlace;
    }
    
}