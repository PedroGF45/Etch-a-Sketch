const scale = document.getElementById("range").value * document.getElementById("range").value;
const columns = "1fr ";
let gridColumns = columns.repeat(Math.sqrt(scale));



//Create Divs using css grid by creating columns and rows using square root of the scale --> 1x1 to 64x64
function createDivs () {
    for (let i = 1; i <= scale; i++) {
        const div = document.createElement("div");
        draw.style.cssText = `grid-template-columns: ${gridColumns}; grid-template-rows: ${gridColumns}`
        draw.appendChild(div);
        div.style.cssText = `background-color: white;`

        //is change scale reset draw
        document.getElementById("range").onchange = function () {
            div.style.cssText = `background-color: white;`
        }

        //draw color mode 
        document.getElementById(`color`).addEventListener("click", function() {
            div.addEventListener("mouseover", function(){
                div.style.backgroundColor = document.getElementById("colorGradient").value;
            })
        })   

        //draw rainbow using random numbers
        document.getElementById(`rainbow`).addEventListener("click", function() {
            div.addEventListener("mouseover", function(){
                div.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
            })   
        })

        //draw red green and blue
        document.getElementById(`redGreenBlue`).addEventListener("click", function() {
                if ((i - 1) % 3 == 0) {
                    div.addEventListener("mouseover", function(){
                        div.style.backgroundColor = `red`;
                    }) 
                } else if ((i + 1) % 3 == 0) {
                    div.addEventListener("mouseover", function(){
                        div.style.backgroundColor = `blue`;
                    })
                } else {
                    div.addEventListener("mouseover", function(){
                        div.style.backgroundColor = `green`;
                    })
                }       
        })

        //eraser
        document.getElementById(`eraser`).addEventListener("click", function() {
            div.addEventListener("mouseover", function(){
                div.style.backgroundColor = `white`;
            })   
        })

        //clear draw by pessing button "clear"
        document.getElementById(`clear`).addEventListener("click", () => div.style.cssText = `background-color: white;`);
    } 
}





createDivs();