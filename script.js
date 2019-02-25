let tiles = document.querySelectorAll(".square");
let flipped = 0;
let flippedImages= [];
let openImages = [];
let h2 = document.querySelector("#score");
let score = 0;
let gameDiv = document.querySelector(".gameDiv");
let livesDiv = document.querySelector(".livesDiv");
let lives =5;
let clearBoard = document.getElementById("reset");


const setBoard = ()=>{
    let squares = document.querySelectorAll(".square"); 
    let indices = [0,1,2,3,4,5,0,1,2,3,4,5]
    squares.forEach((square)=>{
        gameDiv.classList="gameDiv";
        let hero = document.createElement("img");
        square.className="square";
        hero.className="hidden"
        square.addEventListener("click",flipTile);
        let index=indices.splice(Math.floor(Math.random()*indices.length), 1);
        hero.setAttribute('src',`img/${index}.png`);
        square.appendChild(hero);
    })
}

const flipTile=(e)=>{
    
    let tile = e.target;
    let img = e.target.firstChild;
   
    if(flipped<2 && img.classList.contains("hidden")){
        flipped+=1;
        openImages.push(tile);
        tile.classList.add("flip-horizontal-top");
        
        flippedImages.push(img.getAttribute("src"))
        setTimeout(()=>{
            tile.classList.remove("flip-horizontal-top");
            tile.classList.toggle("opacity");
            img.classList.toggle("hidden")
        },400)
    }
    setTimeout(()=>{
        if(flipped==2){
            gameDiv.classList.add("done");
            checkTiles(e);
            
        }
    },600);
    
}

const checkTiles = (e)=>{
   
    if(flippedImages[0]===flippedImages[1]){
        score+=1;
        h2.textContent=" " + score;
        openImages.forEach((tile)=>{
           
            
            
            tile.classList.toggle("blink-1");
            
        })
        flippedImages=[];
        openImages=[];
        flipped=0;
        
    }
    else{
        lives=lives-1;
        openImages.forEach((tile)=>{
           
            tile.className="square";
       
            tile.classList.toggle("shake-lr");
            setTimeout(()=>{
                tile.classList.remove("shake-lr");
                tile.firstChild.classList.toggle("hidden")
               
            },900)
            tile.classList.add("flip-horizontal-bottom");
            
            setTimeout(()=>{
                
                tile.classList.toggle("flip-horizontal-bottom");
                tile.classList.toggle("blend");
                
            },1200);
            
            
            
        })
        
        livesDiv.lastElementChild.classList.add("blink-1");
        if(lives==0){
            console.log("lives done")
            gameDiv.classList.add("gameOver");
            document.getElementById("reset").classList.remove("hidden");
        }
        
        setTimeout(()=>{
            livesDiv.removeChild(livesDiv.lastElementChild);
        },1000);
        
    }
    setTimeout(()=>{
    flippedImages=[];
    openImages=[];
    flipped=0;
    },800)
    console.log(lives);
    if(score===6){

        gameDiv.classList.add("gameOver");
        gameDiv.classList.add("disable");
        resetTiles();
    }
    
    setTimeout(()=>{
        gameDiv.classList.remove("done");
    },1000);

}

const reset = ()=>{
    location.reload();
}

clearBoard.addEventListener("click",reset);
setBoard();