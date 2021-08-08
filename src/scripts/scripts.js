const defaultSize = 33;
const defaultColor = "black";
const defaultMode = "color";

let currentSize = defaultSize;
let currentColor = defaultColor;
let currentMode = defaultMode;

function updateSize(newSize)  {
    currentSize = newSize;
}

function updateColor(newColor) {
    currentColor = newColor;
}

function updateMode(newMode) {
    currentMode = newMode;
}

const color = document.getElementById("colorGradient");
const colorMode = document.getElementById("color");
const rainbowMode = document.getElementById("rainbow");
const redGreenBlue = document.getElementById("redGreenBlue");
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");
const range = document.getElementById("range");
const draw = document.getElementById("draw");
const p = document.getElementById("scale");
p.innerText = "33 x 33";

color.addEventListener("change", () => updateColor(color.value));
colorMode.addEventListener("click", () => updateMode("color"));
rainbowMode.addEventListener("click", () => updateMode("rainbow"));
redGreenBlue.addEventListener("click", () => updateMode("redGreenBlue"));
eraser.addEventListener("click", () => updateMode("eraser"));
clear.addEventListener("click", () => changeSize(range.value));
range.addEventListener("change", () => changeSize(range.value));
range.addEventListener("mousemove", () => showScale(range.value));

function showScale(value) {
    p.innerText = `${value} x ${value}`;
};

function changeSize(value) {
    clearDraw();
    setupDraw(value);
    console.log(value);
};

function clearDraw() {
    draw.innerHTML = "";
};

function setupDraw(value) {
    draw.style.gridTemplateRows = `repeat(${value}, 1fr)`;
    draw.style.gridTemplateColumns = `repeat(${value}, 1fr)`;

    for (let i = 1; i <= value * value; i++) {
        const div = document.createElement("div");
        div.style.backgroundColor = "white";
        div.addEventListener("mouseover", changeColor);
        draw.appendChild(div);
    }
}

function changeColor(e) {
    if (currentMode === "color") {
        e.target.style.backgroundColor = currentColor;
        colorMode.classList.add("focus");
        rainbowMode.classList.remove("focus");
        redGreenBlue.classList.remove("focus");
        eraser.classList.remove("focus");
    } else if (currentMode === "rainbow") {
        e.target.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
        rainbowMode.classList.add("focus");
        colorMode.classList.remove("focus");
        redGreenBlue.classList.remove("focus");
        eraser.classList.remove("focus");
    } else if (currentMode === "redGreenBlue") {
        rainbowMode.classList.remove("focus");
        colorMode.classList.remove("focus");
        redGreenBlue.classList.add("focus");
        eraser.classList.remove("focus");
        if ((value - 1) % 3 == 0) {
            div.addEventListener("mouseover", function(){
                e.target.style.backgroundColor = `red`;
            }) 
        } else if ((value + 1) % 3 == 0) {
            div.addEventListener("mouseover", function(){
                e.target.style.backgroundColor = `blue`;
            })
        } else {
            div.addEventListener("mouseover", function(){
                e.target.style.backgroundColor = `green`;
            })
        }
    } else if (currentMode === "eraser") {
        rainbowMode.classList.remove("focus");
        colorMode.classList.remove("focus");
        redGreenBlue.classList.remove("focus");
        eraser.classList.add("focus");
        e.target.style.backgroundColor = "white";
    }
}

window.onload = () => {
    setupDraw(defaultSize);
} 