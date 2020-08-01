const canvas = document.getElementById('responsiveCanvas');
const c = canvas.getContext("2d");
let grd;
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const T_INCREMENT = 0.01;

let X = 0;
let Y = 0;
let pX, pY;
let t = 0;
let rX, gX, bX, cR, cG, cB;
let redPrimary, yellowPrimary, bluePrimary;
let setPrimary, coeff, iterations, dist;
let capArray = ['butt', 'round', 'square'];

setup();

function setup() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    grd = c.createLinearGradient(10, 10, width, height);
    resetCanvas();
    draw();
};

function draw() {
    t += T_INCREMENT;
    pX = X;
    pY = Y;
    X = (width / 2) + (0.5 * Math.cos(t) * width);
    Y = (height / 2) - (0.5 * Math.sin(2 * t) * height);
    console.log(X);
    
    generateBackground();
    let r = rX - (X + Y) / 5;
    let g = gX - (X + Y) / 5;
    let b = bX - (X + Y) / 10;

    makeGrid();

    for (i = 1; i <= iterations; i++) {
        if (i != 1) {
            c.lineWidth = ((X * Y)) * (i * coeff);
            c.strokeStyle = `rgba(${(cR * (i - 1)/2) * rX}, ${(cG * (i-1)/2) * gX}, ${(cB * (i-1)/2) * bX}`;
        } else {
            c.strokeStyle = `rgba(${r}, ${g}, ${b}, .75)`;
        }

        c.beginPath();
        c.moveTo(pX / (i * dist), pY / (i * dist));
        c.lineTo(X / (i * dist), Y / (i * dist));
        c.stroke();
        c.closePath();

        c.beginPath();
        c.moveTo(width - pX / (i * dist), pY / (i * dist));
        c.lineTo(width - X / (i * dist), pY / (i * dist));
        c.stroke();
        c.closePath();

        c.beginPath();
        c.moveTo(width - pX / (i * dist), height - pY / (i * dist));
        c.lineTo(width - X / (i * dist), height - Y / (i * dist));
        c.stroke();
        c.closePath();

        c.beginPath();
        c.moveTo(pX / (i * dist), height - pY / (i * dist));
        c.lineTo(X / (i * dist), height - Y / (i * dist));
        c.stroke();
        c.closePath();
    }
    setTimeout(draw, 10);
};

function makeGrid() {
    for (let i = 0; i < width / 20; i++) {
        c.strokeStyle = 'rgba(155, 155, 155, .05)';
        c.lineWidth = '0.25';
        c.beginPath();
        c.moveTo(i * 20, 0);
        c.lineTo(i * 20, height);
        c.stroke();
        c.beginPath();
        c.moveTo(0, i * 20);
        c.lineTo(width, i * 20);
        c.stroke();
    }
}

function generateBackground() {
    grd.addColorStop(0, `rgba(${rX + 25}, ${gX + 25}, ${bX + 25}, 0.075)`);
    grd.addColorStop(1, `rgba(${(255 - cR)}, ${(255 - cG)}, ${(255 - cB)}, 0.075)`);

    c.fillStyle = grd;
    c.fillRect(0, 0, width, height);
}

function resetCanvas() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.lineCap = `${capArray[Math.floor(Math.random() * (capArray.length))]}`;
    c.lineJoin = `${capArray[Math.floor(Math.random() * (capArray.length))]}`;

    dist = 0.5;
    coeff = Math.random() * (.0001 - .00005) + .00005;
    iterations = Math.floor(Math.random() * (8 - 2) + 2);
    setPrimary = Math.random();

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

    console.log(coeff, iterations);
}
