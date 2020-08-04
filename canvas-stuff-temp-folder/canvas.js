var canvas = document.getElementById('responsiveCanvas');
var c = canvas.getContext("2d");
var grd;
width = window.innerWidth;
height = window.innerHeight;
canvas.width = width;
canvas.height = height;

var mouseX, mouseY, pMouseX, pMouseY;
let rX, gX, bX, cR, cG, cB;
let redPrimary, yellowPrimary, bluePrimary;
let setPrimary, coeff, iterations, dist;
let capArray = ['butt', 'round', 'square'];
let gridSize;
let lightMode = true;

setup();

function setup() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    grd = c.createLinearGradient(10, 10, width, height);
    resetCanvas();
    draw();
};

function draw() {
    generateBackground();
    let r = rX - (mouseX + mouseY) / 5;
    let g = gX - (mouseX + mouseY) / 5;
    let b = bX - (mouseX + mouseY) / 10;

    makeGrid();

    for (i = 1; i <= iterations; i++) {
        if (i != 1) {
            c.lineWidth = ((mouseX * mouseY)) * (i * coeff);
            c.strokeStyle = `rgba(${(cR * (i - 1)/2) * rX}, ${(cG * (i-1)/2) * gX}, ${(cB * (i-1)/2) * bX}`;
        } else {
            c.strokeStyle = `rgba(${r}, ${g}, ${b}, .75)`;
        }

        // let xOff = Math.random() * (150 - -150) -150;
        // let yOff = Math.random() * (75 - -75) -75;

        let xOff = 0;
        let yOff = 0;

        c.beginPath();
        c.moveTo(pMouseX / (i * dist) + xOff, pMouseY / (i * dist) - yOff);
        c.lineTo(mouseX / (i * dist) + xOff, mouseY / (i * dist));
        c.stroke();
        c.closePath();

        c.beginPath();
        c.moveTo(width - pMouseX / (i * dist), pMouseY / (i * dist) - yOff);
        c.lineTo(width - mouseX / (i * dist), mouseY / (i * dist));
        c.stroke();
        c.closePath();

        c.beginPath();
        c.moveTo(width - pMouseX / (i * dist), height - pMouseY / (i * dist) + yOff);
        c.lineTo(width - mouseX / (i * dist), height - mouseY / (i * dist));
        c.stroke();
        c.closePath();

        c.beginPath();
        c.moveTo(pMouseX / (i * dist), height - pMouseY / (i * dist) + yOff);
        c.lineTo(mouseX / (i * dist), height - mouseY / (i * dist));
        c.stroke();
        c.closePath();
    }
    setTimeout(draw, 10);
};

function makeGrid() {
    for (let i = 0; i < width / gridSize; i++) {
        c.strokeStyle = 'rgba(155, 155, 155, .1)';
        c.lineWidth = '0.25';
        c.beginPath();
        c.moveTo(i * gridSize, 0);
        c.lineTo(i * gridSize, height);
        c.stroke();
        c.beginPath();
        c.moveTo(0, i * gridSize);
        c.lineTo(width, i * gridSize);
        c.stroke();
    }
}

function generateBackground() {
    if (lightMode) {
        grd.addColorStop(0, `rgba(${rX + 50}, ${gX + 50}, ${bX + 50}, 0.065)`);
        grd.addColorStop(1, `rgba(${(255 - cR)}, ${(255 - cG)}, ${(255 - cB)}, 0.065)`);
    } else {
        grd.addColorStop(0, `rgba(${cR * 2}, ${cG * 2}, ${cB * 2}, 0.035)`);
        grd.addColorStop(1, `rgba(${(cR * 2)}, ${(cG * 2)}, ${(cB * 2)}, 0.035)`);
    }

    c.fillStyle = grd;
    c.fillRect(0, 0, width, height);
}

document.onmousemove = function (e) {
    pMouseX = mouseX;
    pMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
};

function morph(axis, min, max, deltaMin, deltaMax){

}

function resetCanvas() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.lineCap = `${capArray[Math.floor(Math.random() * (capArray.length))]}`;
    c.lineJoin = `${capArray[Math.floor(Math.random() * (capArray.length))]}`;

    dist = Math.random() * (0.65 - 0.35) + 0.35;
    coeff = Math.random() * (.0001 - .00005) + .00005;
    iterations = Math.floor(Math.random() * (8 - 2) + 2);
    setPrimary = Math.random();
    gridSize = Math.floor(Math.random() * (100 - 20) + 20);

    if (setPrimary >= 0 && setPrimary <= .33) {
        redPrimary = true;
    } else if (setPrimary >= .34 && setPrimary <= .66) {
        yellowPrimary = true;
    } else if (setPrimary >= .67 && setPrimary <= 1) {
        bluePrimary = true;
    }

    if (redPrimary) {
        rX = Math.random() * (255 - 200) + 200;
        gX = Math.random() * (255 - 180) + 180;
        bX = Math.random() * (255 - 150) + 150;
    } else if (yellowPrimary) {
        rX = Math.random() * (255 - 250) + 250;
        gX = Math.random() * (255 - 250) + 250;
        bX = Math.random() * (180 - 100) + 100;
    } else if (bluePrimary) {
        rX = Math.random() * (255 - 100) + 100;
        gX = Math.random() * (150 - 0) + 0;
        bX = Math.random() * (255 - 180) + 180;
    }

    cR = Math.random() * 2;
    cG = Math.random() * 2;
    cB = Math.random() * 2;
}