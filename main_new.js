var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];
var fieldWidth = 0;
var blocks = 0;

var movePx = 7; // ball move Speed
var refreshTimer = 5; // ball move Speed

function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
        character.style.left = left - movePx + "px";
    }
}

function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<fieldWidth){
        character.style.left = left + movePx + "px";
    }
}
document.addEventListener("keydown", event => {
    if(both==0){
        both++;
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, movePx * refreshTimer );
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, movePx * refreshTimer);
        }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});

//var blocks = setInterval(function(){    

function runner () {
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));

    fieldWidth = document.getElementById("game").offsetWidth ;
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    if(blockLastTop<500||counter==0){ // 400 px height
        var block = document.createElement("div");
        var hole = document.createElement("div");

        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);

        block.style.top = blockLastTop + 45 + "px"; // 46
        hole.style.top = holeLastTop + 10+ "px"; // 90
       
        var random = Math.floor(Math.random() * (fieldWidth)-50); // using random generator we are placing the hole

        if(random < 30)
            random = 30; // min placement
        hole.style.left = random + "px";

        game.appendChild(block);
        game.appendChild(hole);

        currentBlocks.push(counter);
        counter++;
    }

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
   
    if(characterTop <= 0){
        //var gameRight = parseInt(window.getComputedStyle(game).getPropertyValue("right"));

        alert("Game over. Score: "+(counter-9)  ) ;
        clearInterval(blocks);
        location.reload();
    }
   
    if(characterLeft <= 0){
        alert("Touched left boundary. Game over. Score: "+(counter-9));        
        clearInterval(blocks);
        location.reload();
    }
   
    if(characterLeft  > fieldWidth-10){
        alert("Touched Right boundary. Game over. Score: "+(counter-9));
        clearInterval(blocks);
        location.reload();
    }

    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        //let ihole2 = document.getElementById("hole2"+current);

        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        //let ihole2Left = parseFloat(window.getComputedStyle(ihole2).getPropertyValue("left"));

        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
       // ihole2.style.top = ihole2Left - 0.5 + "px";

        if(iblockTop < -5){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove
            //ihole2.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0;
            }
        }
    }
    if(drop==0){
        if(characterTop < 500){
            character.style.top = characterTop + 2 + "px";
        }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }

  //document.getElementById("game").style.border = "thick solid #0000FF";
}

//},1);

function startGame(selectedValue){

    //alert(" Starting the game with " + selectedValue ) ;

    if(selectedValue == "0" ){
        //alert(" Starting 1 the game with " + selectedValue ) ;
        return;
    }
    else {
        //alert(" Starting 2 the game with " + selectedValue ) ;
        level = document.getElementById("level");
        level.disabled = true; // disable reselection
        blocks = setInterval(runner, selectedValue );
    }
   
}

//onChange="startGame(this.value)"
//setInterval(runner, 1 );
