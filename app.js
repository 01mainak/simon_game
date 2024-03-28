let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let max =0 ;
let btn = ["one","two","three","four"];
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelUP();
    }
})

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    },300);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },200);
}

function levelUP(){
    userSeq=[];     // as the level up's the user has to ente rht egame seq. from the start
    level++;
    h2.innerText=`Level ${level}`;
    let randIndx = Math.floor(Math.random()*3);
    let randColor = btn[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(indx){
    if(userSeq[indx]===gameSeq[indx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUP,1000);
        }
    }else{
        if(max<level-1){
            max = level-1;
            h2.innerHTML=`Game Over ! <br> Your Score is <b>${level-1}</b><br> You got a New High Score of ${max} <br> press any key to continue<br>`;
        }
        else{
            h2.innerHTML=`Game Over ! <br> Your Score is <b>${level-1}</b><br> Max score was ${max} <br> press any key to continue`;
        }
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },300);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(press of allBtns){
    press.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}