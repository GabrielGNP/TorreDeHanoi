function PressButton(id){
    let button = document.getElementById(id);
    if(id == "BReset" || id == "BEnter"){
        button.style.color = "#b01010";
        button.style.borderBottom = "0.6vh solid transparent";
        button.style.borderTop = "0.6vh solid transparent";
        setTimeout(function(){
            button.style.color = "#390606";
            button.style.borderBottom = "0.6vh solid #171717";
            button.style.borderTop = "0.6vh solid #313131";
        }, 150);
        if(id=="BEnter"){
            ConstructGame();
        }
    }else{
        button.style.color = "#b01010";
        button.style.borderBottom = "1vh solid transparent";
        button.style.borderTop = "1vh solid transparent";
        setTimeout(function(){
            button.style.color = "#390606";
            button.style.borderBottom = "1vh solid #171717";
            button.style.borderTop = "1vh solid #313131";
        }, 150);
        PressKey(button.id);
    }
    

    

}

let timeS = 0;
let timeM = 0;
let timeH = 0;/*
setInterval(()=>{
    timeS++;
    if(timeS>59){
        timeS=0;
        timeM++;
    }
    if(timeM>59){
        timeM=0;
        timeH++;
    }
    changePointer();
},1000)*/

document.addEventListener('keydown', logKey);
function logKey(e){
    console.log(e.code);
    //console.log(e.key);
    let button;
    switch (e.code){
        case "ArrowUp":
            button = document.getElementById("BUp");
            PressKey(button.id);
            break;
        case "ArrowDown":
            button = document.getElementById("BDown");
            PressKey(button.id);
            break;
        case "ArrowLeft":
            button = document.getElementById("BLeft");
            PressKey(button.id);
            break;
        case "ArrowRight":
            button = document.getElementById("BRight");
            PressKey(button.id);
            break;
        case "Enter" || "NumpadEnter":
            button = document.getElementById("BEnter");
            if(posMenuOP==0){
                ConstructGame();
            }
            break;
        case "Escape":
            button = document.getElementById("BReset");
            Reset();
            break;
    }
    
    if(button.id == "BEnter" || button.id == "BReset"){
        button.style.color = "#b01010";
        button.style.borderBottom = "0.6vh solid transparent";
        button.style.borderTop = "0.6vh solid transparent";
        setTimeout(function(){
            button.style.color = "#390606";
            button.style.borderBottom = "0.6vh solid #171717";
            button.style.borderTop = "0.6vh solid #313131";
        }, 150);
    }else{
        button.style.color = "#b01010";
        button.style.borderBottom = "1vh solid transparent";
        button.style.borderTop = "1vh solid transparent";
        setTimeout(function(){
            button.style.color = "#390606";
            button.style.borderBottom = "1vh solid #171717";
            button.style.borderTop = "1vh solid #313131";
        }, 150);
    }
    

}

let posMenuOP = 0;
let cantDisc = 3;
function PressKey(id){
    if(document.getElementById("screen").className == "screen menu"){
        switch (id){
            case "BUp":
                if(posMenuOP>0){
                    posMenuOP--;
                }
                break;
            case "BDown":
                if(posMenuOP<1){
                    posMenuOP++;
                }
                break;
            case "BLeft":
                if(posMenuOP==1){
                    if(cantDisc>3){
                        cantDisc--;
                    }
                    document.getElementById("OPM1").innerHTML = "Discs <CR><</CR> "+cantDisc+" <CR>></CR>";
                }
                break;
            case "BRight":
                if(posMenuOP==1){
                    if(cantDisc<10){
                        cantDisc++;
                    }
                    document.getElementById("OPM1").innerHTML= "Discs <CR><</CR> "+cantDisc+" <CR>></CR>";
                }
                break;
        }

        switch(posMenuOP){
            case 0:
                document.getElementById("OPM0").className="OP OPSELECT";
                document.getElementById("OPM1").className="OP";
                break;
            case 1:
                document.getElementById("OPM0").className="OP";
                document.getElementById("OPM1").className="OP OPSELECT";
                break;
        }
    }else{
        if(document.getElementById("screen").className == "screen"){
            if(!cronometroOn){
                startTime = Date.now()-tiempoTot;
                cronometroOn = true; 
            }
            switch (id){
                case "BUp":
                    if(take=="<i class='fa-solid fa-angles-down'></i>"){
                        console.log("takedisc");
                        takeDisc();
                    }
                    break;
                case "BDown":
                    if(take!="<i class='fa-solid fa-angles-down'></i>"){
                        console.log("takedisc");
                        dropDisc();
                    }
                    break;
                case "BLeft":
                    if(pointer>1){
                        pointer--;
                        changePointer();
                    }
                    break;
                case "BRight":
                    if(pointer<3){
                        pointer++;
                        changePointer();
                    }
                    break;
                case "BReset":
                    Reset();
                    break;
            }
        }
    }
}

let weightAr = -1;
let weightT1 = new Array();
let weightT2 = new Array();
let weightT3 = new Array();
let pointer = 1;
let stack1 = new Array();
let stack2 = new Array();
let stack3 = new Array();
let take = "<i class='fa-solid fa-angles-down'></i>";
let colorsAvailable = ["goldenrod","#da2020","#20da32","#2080da","#7f20da","#da2080","#ff8686","#e3ff86","#8db0ff","#ce9cff"];

function ConstructGame(){
    let screen = document.getElementById("screen");
    weightT1= new Array();
    weightT2 = new Array();
    weightT3 = new Array();
    stack1 = new Array();
    stack2 = new Array();
    stack3 = new Array();
    pointer = 1;
    weightAr = -1;

    startTime = Date.now()-tiempoTot;
    tiempoTot = 0;
    posMenuOP = 0;
    cronometroOn = false;

    take = "<i class='fa-solid fa-angles-down'></i>";

    weightT1.push(cantDisc+1);
    for(var i=cantDisc;i>0;i--){
        weightT1.push(i)
    }
    weightT2.push(cantDisc+1);
    weightT3.push(cantDisc+1);

    stack1 = new Array();
    stack1.unshift("<div class='base'></div>");
    stack2 = new Array();
    stack2.unshift("<div class='base'></div>");
    stack3 = new Array();
    stack3.unshift("<div class='base'></div>");
    screen.className = "screen";

    for(var i=cantDisc;i>0;i--){
        stack1.unshift("<div class='disc' style='width:"+i+"0%; border: 0.3vh dashed "+colorsAvailable[i-1]+";'></div>");
    }
    let column1="";
    let column2="";
    let column3="";
    console.log(stack1.length);
    console.log(stack2.length);
    console.log(stack3.length);
    for(var i=0;i<stack1.length;i++){
        console.log(stack1[i]);
        column1=column1+stack1[i];
    }
    for(var i=0;i<stack2.length;i++){
        column2=column2+stack2[i];
    }
    for(var i=0;i<stack3.length;i++){
        column3=column3+stack3[i];
    }
    let arrowPointer ="";
    switch (pointer){
        case 1:
            arrowPointer = 
                '<div id="pos1" class="arrow">'+take+'</div>'+
                '<div id="pos2" class="arrow"></div>'+
                '<div id="pos3" class="arrow"></div>';
            break;
        case 2:
            arrowPointer = 
                '<div id="pos1" class="arrow"></div>'+
                '<div id="pos2" class="arrow">'+take+'</div>'+
                '<div id="pos3" class="arrow"></div>';
            break;
        case 3:
            arrowPointer = 
                '<div id="pos1" class="arrow"></div>'+
                '<div id="pos2" class="arrow"></div>'+
                '<div id="pos3" class="arrow">'+take+'</div>';
            break;
    }
    let stringHTML =  
        '<div id="timer" class="timer">00:00:00.00</div>'+
        '<div id="arrowSpace" class="arrowSpace">'+
            arrowPointer+
        '</div>'+
        '<div id="screenGame" class="game">'+
            '<div id="post1"  class="post">'+
                column1+ 
            '</div>'+
            '<div  id="post2" class="post">'+
                column2+
            '</div>'+
            '<div  id="post3"  class="post">'+
                column3+
            '</div>'+
        '</div>';
    


    screen.innerHTML= stringHTML;
       
    
        


}


function changePointer(){
    let arrowSpace = document.getElementById("arrowSpace");

    switch (pointer){
        case 1:
            arrowPointer = 
                '<div id="pos1" class="arrow">'+take+'</div>'+
                '<div id="pos2" class="arrow"></div>'+
                '<div id="pos3" class="arrow"></div>';
            break;
        case 2:
            arrowPointer = 
                '<div id="pos1" class="arrow"></div>'+
                '<div id="pos2" class="arrow">'+take+'</div>'+
                '<div id="pos3" class="arrow"></div>';
            break;
        case 3:
            arrowPointer = 
                '<div id="pos1" class="arrow"></div>'+
                '<div id="pos2" class="arrow"></div>'+
                '<div id="pos3" class="arrow">'+take+'</div>';
            break;
    }
    arrowSpace.innerHTML = arrowPointer;
}

function takeDisc(){
    if(take=="<i class='fa-solid fa-angles-down'></i>"){
        switch (pointer){
            case 1:
                if(stack1.length>1){
                    take = stack1.shift();
                    changePointer();
                    weightAr = weightT1.pop();
                }
                break;
            case 2:
                if(stack2.length>1){
                    take = stack2.shift();
                    changePointer();
                    weightAr = weightT2.pop();
                }
                break;
            case 3:
                if(stack3.length>1){
                    take = stack3.shift();
                    changePointer();
                    weightAr = weightT3.pop();
                }
                break;
        }
        console.log("weightAr: "+weightAr);
        console.log(" weightT1:"+weightT1[weightT1.length-1]);
        console.log(" weightT2:"+weightT2[weightT2.length-1]);
        console.log(" weightT3:"+weightT3[weightT3.length-1]);
        rewrite();
    }
    
}
function dropDisc(){
    if(take!="<i class='fa-solid fa-angles-down'></i>"){
        console.log("dropDisc");
        switch (pointer){
            case 1:
                if(weightT1[weightT1.length-1]>weightAr){
                    weightT1.push(weightAr);
                    weightAr = -1;
                    console.log("weightAr: "+weightAr+"   weightT1:"+weightT1 );
                    stack1.unshift(take);
                    take = "<i class='fa-solid fa-angles-down'></i>";
                    changePointer();
                }
                break;
            case 2:
                if(weightT2[weightT2.length-1]>weightAr){
                    weightT2.push(weightAr);
                    weightAr = -1;
                    console.log("weightAr: "+weightAr+"   weightT2:"+weightT2 );
                    stack2.unshift(take);
                    take = "<i class='fa-solid fa-angles-down'></i>";
                    changePointer();
                }
                break;
            case 3:
                if(weightT3[weightT3.length-1]>weightAr){
                    weightT3.push(weightAr);
                    weightAr = -1;
                    console.log("weightAr: "+weightAr+"   weightT2:"+weightT3);
                    stack3.unshift(take);
                    take = "<i class='fa-solid fa-angles-down'></i>";
                    changePointer();
                }
                break;
        }
        console.log("weightAr: "+weightAr);
        console.log(" weightT1:"+weightT1[weightT1.length-1]);
        console.log(" weightT2:"+weightT2[weightT2.length-1]);
        console.log(" weightT3:"+weightT3[weightT3.length-1]);
        rewrite();
    }
    if(weightT3.length==cantDisc+1){
        ENDGAME()
    }
}
function rewrite(){
    let column1="";
    let column2="";
    let column3="";
    for(var i=0;i<stack1.length;i++){
        //console.log(stack1[i]);
        column1=column1+stack1[i];
    }
    for(var i=0;i<stack2.length;i++){
        column2=column2+stack2[i];
    }
    for(var i=0;i<stack3.length;i++){
        column3=column3+stack3[i];
    }
    let screen = document.getElementById("screenGame");
    screen.innerHTML =
            '<div id="post1"  class="post">'+
                column1+ 
            '</div>'+
            '<div  id="post2" class="post">'+
                column2+
            '</div>'+
            '<div  id="post3"  class="post">'+
                column3+
            '</div>';

}

function ENDGAME(){
    cronometroOn = false;
    let screen = document.getElementById("screen");
    screen.className = "screen endGame";
    screen.innerHTML= 
        "<h1>END GAME</h1>"+
        "<br>"+
        "Time: <div style='color:green'>"+formatearMS(tiempoTot).toString()+"</div>" +
        "<br><br>"+
        "Reiniciar? <br><br>"+
        "Enter: Reiniciar <br>"+
        "Escape: volver al menú <br>";
}

function Reset(){
    posMenuOP = 0;
    cantDisc = 3;
    tiempoTot = 0;
    cronometroOn = false;
    let screen = document.getElementById("screen");
    screen.className = "screen menu";
    screen.innerHTML= 
        "<div class='OP OPSELECT' id='OPM0'>Start</div>"+
        "<div class='OP' id='OPM1'>Discs <CR><</CR> 3 <CR>></CR></div>";
}

var tiempoTot = 0;
var startTime = Date.now()-tiempoTot;
var cronometroOn = false;
setInterval(() =>{
    if(cronometroOn){
        let tiempo = document.getElementById("timer");
        tiempoTot = Date.now()-startTime;
        tiempo.innerHTML= formatearMS(tiempoTot).toString();
    }
},1000/60)

function formatearMS(tiempo_ms){
    let MS = tiempo_ms % 1000;
    
    
    const total_seconds = Math.floor(tiempo_ms / 1000);
    const total_minutes = Math.floor(total_seconds / 60);
    const total_horas = Math.floor(total_minutes / 60);

    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    const display_minutes = total_minutes.toString().padStart(2,"0");
    const display_horas = total_horas.toString().padStart(2,"0");

    return `${display_horas}:${display_minutes}:${display_seconds}.${MS}`;
}


function MessageInfo(){

    text =  
    "<h1>Torres de Hanói<br> </h1>"+
    "Un juego tradicional.<br>"+
    "Puede elegir jugar con un rango de entre 3 y 10 discos.<br>"+
    "<br>"+
    "Tendrá un cronometro para conocer el tiempo que ha tardado en resolver el juego.<br>"+
    "<br>"+
    "Podrá reiniciar el juego con el botón <i style='color:#ca0000;' class='fa-solid fa-rotate-right'></i> (o Escape del teclado).<br>"+
    "Para iniciar el juego solo presione <i style='color:#ca0000;' class='fa-regular fa-square-caret-right'></i> (o Enter del teclado).<br>"+
    "<br>"+
    "Para moverse a la izquierda presione <i style='color:#ca0000;' class='fa-solid fa-left-long'></i> (o ← del teclado).<br>"+
    "Para moverse a la derecha presione <i style='color:#ca0000;' class='fa-solid fa-right-long'></i> (o → del teclado).<br>"+
    "Para tomar un disco presione <i style='color:#ca0000;' class='fa-solid fa-up-long'></i> (o ↑ del teclado).<br>"+
    "Para dejar un disco presione <i style='color:#ca0000;' class='fa-solid fa-down-long'></i> (o ↓ del teclado).<br>"+
    "<br>"+
    "Reglas de juego <br>"+
    "-	Solo se pude mover un disco a la vez.<br>"+
    "-	No se puede ubicar un disco más grande sobre un disco más pequeño.<br>"+
    "-	El juego finaliza cuando todos los discos están en la posición de la rececha.<br>"+
    "<br>"+
    "Ya está listo para jugar ;) <br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "Portafolio del creador (para ver más cositas): <a target='_blank' href='https://gabrielgnp.github.io/Portafolio/index.html'>Portafolio</a><br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "</div><br>";

    var plantilla = 
    '<div id="MensInf">'+
        '<div class="HeaderMensInf" >'
            +'<button class="ButOPCont" style=" color:white; margin: 0px; border: 0px; height: 100%; background:transparent;" onclick="DeleteHTML(`MensInf`)"> X</button>'
        +'</div>'
        +'<div style="text-align:center; padding-top: 35px; overflow-y: auto; height: 100%; width: 100%;">'+text+'</div>'
    +'</div>';

    var block = '<div id="displayblack" style=" position:absolute; top:0px; background : #181818d9; height: 100%; width:100%; display: flex; justify-content: center; align-content: center; flex-wrap: wrap; flex-direction: row;"></div>';

    document.getElementById("body").insertAdjacentHTML("beforeend", block) ;
    document.getElementById("body").style.overflow = "hidden";
    document.getElementById("displayblack").insertAdjacentHTML("beforeend", plantilla) ;



}



function DeleteHTML(ObjId){
    document.getElementById(ObjId).remove();
    if (!!document.getElementById("displayblack")){
        document.getElementById("displayblack").remove();
    }
}