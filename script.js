let tiles = document.querySelectorAll(".square");
let flipped = 0;
let flippedImages= [];
let openImages = [];
let h1 = document.querySelector("#score");
let score = 0;
let container = document.querySelector(".container");
const flipTile = (e)=>{
    
    let tile = e.target.parentElement;
    let img = e.target;
    if(flipped<2 && img.classList.contains("hide")){
        flipped+=1;
        openImages.push(tile);
        tile.classList.add("flip-horizontal-top");
        tile.style.background="orange";
        console.log(img.getAttribute("src"))
        flippedImages.push(img.getAttribute("src"))
        setTimeout(()=>{
            tile.classList.remove("flip-horizontal-top");
            img.classList.toggle("hide")
        },400)
    
    
    }
    setTimeout(()=>{
        if(flipped==2){
            checkTiles(e);
        }
    },500)
}

const checkTiles = (e)=>{
    console.log(flippedImages)
    if(flippedImages[0]===flippedImages[1]){
        score+=1;
        h1.textContent=score;
        openImages.forEach((tile)=>{
            tile.style.background="green";
            tile.classList.toggle("blink-1");
            setTimeout(()=>{
                tile.className="square";
                tile.classList.add("disable");
            },1200);

        })
        flippedImages=[];
        openImages=[];
        flipped=0;
    }
    else{
        openImages.forEach((tile)=>{
            tile.className="square";
            console.log(tile)
            tile.classList.toggle("shake-lr");
            setTimeout(()=>{
                tile.classList.remove("shake-lr");
                tile.firstChild.classList.toggle("hide")
            },1000)
            tile.classList.add("flip-horizontal-bottom");
            
            setTimeout(()=>{
                tile.style.background='yellow';
                tile.classList.toggle("flip-horizontal-bottom");
                
            },1600)

            
        })
        flippedImages=[];
        openImages=[];
        flipped=0;
    }
    if(score===6){
        setBoard();
        container.classList.add("disable");
        resetTiles();
    }


}


const resetTiles = ()=>{
    tiles
}
const setBoard = ()=>{
    let squares = document.querySelectorAll(".square"); 
    let indices = [0,1,2,3,4,5,0,1,2,3,4,5]
    squares.forEach((square)=>{
        let hero = document.createElement("img");
        hero.className="hide";
        square.className="square";
        
        square.addEventListener("click",flipTile)
        let index=indices.splice(Math.floor(Math.random()*indices.length), 1);
        hero.setAttribute('src',`img/${index}.png`);
        square.appendChild(hero)
        
    })
    

}


setBoard();

 

