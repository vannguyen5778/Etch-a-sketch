const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let shadingCounter = 1;

const colorWheel = document.getElementById("colorWheel");
const grid = document.getElementById('drawing-board');
const clearBtn = document.getElementById("clearBtn");
const eraserBtn = document.getElementById("eraserBtn");
const sizeText = document.getElementById("sizeValue");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const shadingBtn = document.getElementById("shadingBtn");
const sizeSlider = document.getElementById("sizeSlider");

colorWheel.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
shadingBtn.onclick = () => setCurrentMode('shading');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);



function createGrid(size) {
    let drawingBoard = document.getElementById('drawing-board');
    let cells = drawingBoard.querySelectorAll("div");
    cells.forEach((div) => div.remove());
    drawingBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    drawingBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size ** 2; i++) {
        let cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        drawingBoard.insertAdjacentElement('beforeend', cell);
    }
}
createGrid(currentSize);

function changeSize(gridSize){
    createGrid(gridSize);
    updateSizeValue(gridSize);
    reloadGrid();
}

function updateSizeValue(gridSize) {
    sizeText.innerHTML = `${gridSize} x ${gridSize}`;
}

function setCurrentColor(newColor){
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'fff';
    } else if (currentMode === 'shading') {
        if (this.style.backgroundColor == 'rgb(0, 0, 0)'){
            return;
        }
        else if (this.style.backgroundColor.match(/rgba/)) {
            let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
            if (currentOpacity <= 0.9) {
                this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                this.classList.add('gray');
            } 
        } else {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
        }
    }
}


function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    } else if (currentMode ==='shading') {
        shadingBtn.classList.remove('active');
    }
    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else  if (newMode === 'color') {
        colorBtn.classList.add('active');
    }  else  if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    } else if (newMode === 'shading') {
        shadingBtn.classList.add('active');
    }
}


window.onload = () => {
    createGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
    
}


