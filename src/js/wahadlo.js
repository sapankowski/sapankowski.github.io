/*
    Fizyka na Maksa
*/

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let l, g, m, alpha;
let p = {x: 0, y: 0};
let x, xd, xdd;

//proste kształty
function rect(x, y, a, b, f, kol1, kol2, wid){  //x, y, a, b, wypełnienie(tak?nie), kolor obwódki, kolor wypełnienia, grubość krawędzi
    if(f){
        ctx.fillStyle=kol2;
        ctx.fillRect(x, y, a, b);
    }
    ctx.lineWidth=wid;
    ctx.strokeStyle=kol1;
   ctx.strokeRect(x, y, a, b);
}

function seg(x1, y1, x2, y2, kol, wid){  //początek, koniec, kolor, grubość
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle=kol;
    ctx.lineWidth=wid;
    ctx.stroke();
}

function arc(x, y, r, a0, ak, d, f, kol1, kol2, wid){  //x, y, r, a_0, a_k, kierunek, wypełnienie(tak?nie), kolor obwódki, kolor wypełnienia, grubość krawędzi
    ctx.beginPath();
    ctx.arc(x, y, r, a0, ak, d); 
    ctx.strokeStyle=kol1;
    ctx.lineWidth=wid;
    if(f){
        ctx.fillStyle=kol2;
        ctx.fill();
    }
    ctx.stroke();
    ctx.closePath();
}

function circ(x, y, r, f, kol1, kol2, wid){  //x, y, r, wypełnienie(tak?nie), kolor obwódki, kolor wypełnienia, grubość krawędzi
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI, ); 
    ctx.strokeStyle=kol1;
    ctx.lineWidth=wid;
    if(f){
        ctx.fillStyle=kol2;
        ctx.fill();
    }
    ctx.stroke();
    ctx.closePath();
}

function ellipse(x, y, r1, r2, rot, f, kol1, kol2, wid){ //x, y, rx, ry, obrót, wypełnienie(tak?nie), kolor obwódki, kolor wypełnienia, grubość krawędzi
    ctx.beginPath();
    ctx.ellipse(x, y, r1, r2, rot, 0, 2*Math.PI); 
    ctx.strokeStyle=kol1;
    ctx.lineWidth=wid;
    if(f){
        ctx.fillStyle=kol2;
        ctx.fill();
    }
    ctx.stroke();
    ctx.closePath();
}

//funkcja daje możliwość mazania po ekranie
/*function letdraw(){
    //zmienne
    let painting=false;

    function startPosition(e) {
        painting=true;
        draw(e);
    }
    function finishedPosition() {
        painting=false;
        ctx.beginPath();
    }
    function draw(e) {
        if(!painting) return;
        ctx.lineWidth=6;
        ctx.lineCap="round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
    ctx.beginPath();
    //Event listeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
}*/

window.addEventListener("load", ()=>{

    //zmiana rozmiaru okienka
    window.onload = window.onresize = function() {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
    }
    width = canvas.width;
    height = canvas.height;
    prepare();
    tick();

//rect(200, 200, 100, 100, 1, "blue", "red", 2);
//seg(100, 200, 200, 300, "red", 2);
//arc(200, 300, 50, 1, Math.PI, 1, 1, "green", "blue", 2);
//circ(50, 50, 48, 1, "green", "red", 2);
//ellipse(400, 400, 50, 100, 2, 1, "red", "yellow", 2);
//letdraw();

});
window.addEventListener("resize", ()=>{
    window.onload = window.onresize = function() {
        var canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
        width = canvas.width;
        height = canvas.height;
    }
    location.reload();
    prepare();
    //tick();
});

document.getElementById("submit").onclick = prepare;

function pos() {
    p.x = width/2 + l * Math.sin(((2*Math.PI)/360)*x);
    p.y = 0.1 * height + l * Math.cos(((2*Math.PI)/360)*x);
}

function tick() {
    ctx.clearRect(0, 0, width, height);
    pos();
    seg(width/2, 0.1*height, p.x, p.y, "blue", 2);
    circ(p.x, p.y, 20, 1, "red", "red", 0);
    circ(width/2, 0.1*height, 5, 1, "black", "black", 0);
    //console.log(p.x-width/2);
    console.log(p.y);
    xd += xdd;
    x += xd;
    let dlugosclinki = (p.x-width/2) * (p.x-width/2) + (p.y-0.1*height)*(p.y-0.1*height);
    console.log("Dlugosc linki: " + dlugosclinki);
    xdd = -(g/l) * Math.sin(((2*Math.PI)/360)*x);
    xdd += (-(alpha/m) * xd);
    console.log("xd: " + xd);
    console.log("xdd: " + xdd);
    requestAnimationFrame(tick);
}

function validate() {
    if(l < 1 || l > 5) {
        alert("Podaj wartość długości wahadła jako liczbę rzeczywistą od 1 do 5!");
        l = 3;
    }
    if(A < 0 || A > 90) {
        alert("Podaj wartość amplitudy od 0 do 90!");
        A = 60;
        document.getElementById("A").value = 60;
    }
}

function prepare() {
    m = parseFloat(document.getElementById("m").value);
    l = parseFloat(document.getElementById("l").value);
    g = parseFloat(document.getElementById("g").value);
    A = parseFloat(document.getElementById("A").value);
    alpha = parseFloat(document.getElementById("alpha").value);
    validate();
    x = A;
    l = (l/5) * (0.8 * height);
    alpha = alpha / 100.0;
    xd = 0;
    xdd = 0;
    console.log("m = " + m);
    console.log("l = " + l);
    console.log("g = " + g);
    p.x = width/2;
    p.y = l;
}