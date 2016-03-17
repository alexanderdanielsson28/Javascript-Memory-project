"use strict";

var Memory = {

    myArray: [],
    rows: 2,
    colum: 4,
    arrayCheck: [],
    arrayCheckId: [],
    imagesShown: 0,
    matchPairs: 0,
    x: 0,
    turns:0,
                                
    init: function (e){             /*Raden under skickar jag in antal rows och colum som jag deklarerat 
                                    lite  längre upp. vad jag gör är att gör ett anrop till funktionen
                                    'getPicsArray' som finns i objectet 'RandomGenerator'
                                    och får tillbaka en referens av objektet som ja kan jobba vidare 
                                    med i denna fil alltså  'myArray' i detta fallet=)
                                    ja kan förklara bättre på måndag om någon tycker ja förklarar dålig;)
                                    */
            this.myArray=RandomGenerator.getPicsArray(this.rows,this.colum);
    
        
    },
    
    getPicture:function(){
        return this.myArray;
    },
    
    showPicture:function(id){
        var lastElement=Memory.arrayCheckId.length-1;
        
        if(Memory.arrayCheckId[lastElement]!=id){       //här kontrollerar jag om 
            Memory.imagesShown++;                       //man klickar på samma bild två gånger efter varan
            
        var image=document.getElementById(id);
        
        image.firstChild.src="pics/" +Memory.myArray[id] + ".png";   // om man klickar visas motsvarande bild från arrayen
        image.firstChild.className=("front");
        Memory.arrayCheck.push(Memory.myArray[id]);                 //bildens nummer;
        Memory.arrayCheckId.push(id);                               // kollar positionsnumret man klickat på
                                                                  // detta sett att hitta en specifik postion hittade ja från en som gjort    
                                                                    // en liknande funktion för kordinater
        lastElement=Memory.arrayCheck.length-1;                    //sista klicket i en gissning o värdet sparas ner i 'lastElem...'                            
                                                                            
        if(Memory.imagesShown==2 && Memory.arrayCheck.length > 1 && (Memory.arrayCheck[lastElement]==Memory.arrayCheck[lastElement-1])) {
            
            Memory.turns++;
           // image.style.transform:"rotateY(180deg)";
           
            image.firstChild.src="pics/" + Memory.myArray[id] + ".png";
            
          //  image.removeClass("flip").addClass("onFlip");
            image.value=1;
            
            var prior =document.getElementById([Memory.arrayCheckId[lastElement-1]]);
            prior.firstChild.src = "pics/" + Memory.myArray[id] + ".png";
            prior.value=1;
            Memory.imagesShown=0;
            
            Memory.matchPairs++;
            console.log(Memory.imagesShown);
            var audio = new Audio('validGuesses.mp3');
            audio.play();
                 setTimeout(function(){
                    if(image.value===1 && prior.value===1){                            //kollar så att bilden inte ingår i tidigare hittad par
                        image.style.visibility="hidden";
                        prior.style.visibility="hidden";
                    }
                },1000);
        }
        if(Memory.matchPairs==Memory.myArray.length /2){
         //  var text = document.createElement("p");
         //  text.innerHTML="Grattis du klarade det på " + Memory.turns +" försök";
         //   var cont=document.getElementById("content");
         // cont.appendChild(text);
        //    alert();
            alert("Grattis du klarade det på "+ Memory.turns + " försök ");
           
            
        
            reloadFunction();
         
             
             //cont.appendChild(sub);
            
                
            
          }else{
            if(Memory.imagesShown==2){      //om spelaren vänt två kort
                Memory.turns++;             //om två bilder visas  plusas med ett
                
                setTimeout(function(){
                    if(image.value===0){                            //kollar så att bilden inte ingår i tidigare hittad par
                        image.firstChild.src="pics/0.png";
                       var  imageBefore = document.getElementById(Memory.arrayCheckId[Memory.arrayCheckId.length-2]);
                        imageBefore.firstChild.src="pics/0.png";
                        Memory.imagesShown=Memory.imagesShown-2;
                       
                    }else{
                        image.firstChild.src="pics/"+ Memory.myArray[id] +".png";
                     }
                    Memory.arrayCheck=[];
                    Memory.arrayCheckId=[];
                   Memory.imagesShown=0;
                },1000);
              
            }
           // image.firstChild.className=("back");
            
        }
        
        
            
        }
    },
    
    drawPicture : function(){
        var content =document.getElementById("container");
        var row;
        var box;
        var boxcounter=0;
        var image;
        
            //spelplan
            for(var i=0;i<this.rows;i++){
                row=document.createElement("div");
                row.className="row";
                
                for(var j=0;j < this.colum; j++ ){          //antal colum
                    box=document.createElement("a");
                    box.setAttribute("href","#");
                    box.id=boxcounter;
                    box.value=0;
                    image=document.createElement("img");        //genererar ut img taggar
                    image.className="back";
                    
                    image.setAttribute("src", "pics/0.png");
                    box.appendChild(image);                 //The Node.appendChild() 
                                                            //method adds a node to the end 
                    content.appendChild(box);                                        //of the list of children of a
                                                            //specified parent node
                    
                    
                box.onclick = function(){
                        if(Memory.imagesShown < 2){
                            Memory.showPicture(this.id);
                        }
                };
                
                row.appendChild(box);
                boxcounter++;
                                                                 /*   Using setAttribute()
                                                                    to modify certain attributes,
                                                                    most notably value in XUL,
                                                                    works inconsistently,
                                                                    as the attribute specifies the default value.
                                                                    To access or modify the current values, you should use the properties.
                                                                    For example, use elt.value instead of elt.setAttribute('value', val).         
                                                                      */ 
                                                                      // content.insertAdjacentHTML("afterbegin", "<div> asdasd </div>")
                }
                content.appendChild(row);
            }
            
        
    },
    
}

    window.onload = function(){
        Memory.init();
        Memory.drawPicture();
    }
    
    function reloadFunction() {
      var audio1 = new Audio('sound.mp3');
      audio1.play();   
        setTimeout(function(){
       
       
            location.reload();
        },3000);     
  //  
}