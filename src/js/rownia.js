/*
    Fizyka na Maksa
*/

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let alpha, mus, muk, v0, v, w, h, pos, g;
let p = {x: 0, y: 0};
let p1 = {x: 0, y: 0}, p2 = {x: 0, y: 0};
let zatrzymana = false;

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

function rotrect(x, y) {
    ctx.translate(x, y);
    ctx.rotate((2*Math.PI/360)*alpha);
    ctx.translate(-x, -y);
    rect(x, y-20, 20, 20, 1, "red", "red", 0);
    ctx.translate(x, y);
    ctx.rotate(-((2*Math.PI/360)*alpha));
    ctx.translate(-x, -y);
}


//funkcja daje możliwość mazania po ekranie
/*function letdraw(){
    //zmienne
    let painting=false;
2
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
    canvas.addEventListener("mouseup", fini2shedPosition);
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

function tick() {
    if(zatrzymana)
        return;
    ctx.clearRect(0, 0, width, height);
    if(alpha<=30){
        seg(1, height-h, 1, height-1, "black", 2);
        seg(0, height-h, width, height, "black", 2);
        seg(1, height-1, width, height-1, "black", 2);
    }
    else {
        seg(1, height-1, 1, 0, "black", 2);
        seg(1, height-1, w, height-1, "black", 2);
        seg(1, 0, w, height-1, "black", 2);
    }
    rotrect(p.x, p.y);
    pos += v;
    if(pos > 1) {
        pos = 0.35;
        v = v0;
    }
    p.x = pos * (p2.x - p1.x) + p1.x;
    p.y = pos * (p2.y - p1.y) + p1.y;
    let stv = v;
    if(v < 0)
        v +=  (muk * g * Math.cos((2*Math.PI/360)*alpha))/10000.0;
    else
        v -=  (muk * g * Math.cos((2*Math.PI/360)*alpha))/10000.0;
    v += (g * Math.sin((2*Math.PI/360)*alpha))/10000.0;
    if(mus >= Math.tan((2*Math.PI)/360 * alpha) && (v0 == 0 || stv * v < 0)) {
        console.log("xx");
        zatrzymana = true;
        //$("#niezjezdzaj").modal("show");
    }
    console.log("v0 = " + v0);
    if(v >= 0 || v0<0) {
        requestAnimationFrame(tick);
    }
    else
        zatrzymana = true;
}

function validate() {
    if(alpha < 0 || alpha > 90) {
        alert("Wartość kąta nachylenia równi musi być liczbą rzeczywistą mieszczącą się w przedziale od 0 do 90 stopni!");
        alpha = 30;
        document.getElementById("alpha").value = 30;
    }
    if(mus < muk) {
        alert("Wartość współczynnika tarcia statycznego musi być większa bądź równa wartości współczynnika tarcia kinetycznego!");
        mus = 0.2;
        muk = 0.1;
        document.getElementById("mus").value = mus;
        document.getElementById("muk").value = muk;
    }
}

function prepare() {
    alpha = parseFloat(document.getElementById("alpha").value);
    muk = parseFloat(document.getElementById("muk").value);
    mus = parseFloat(document.getElementById("mus").value);
    v0 = parseFloat(document.getElementById("v0").value);
    validate();
    if(alpha <= 30) {
        w = width;
        h = w * Math.tan((2 * Math.PI / 360) * alpha);
        p1 = {x: 0, y: height-h};
        p2 = {x: width, y: height};
    }
    else {
        h = height;
        w = h * (1/Math.tan((2*Math.PI)/360 * alpha));
        p1 = {x: 0, y: 0};
        p2 = {x: w, y: height};
    }
    v0 /= 10000.0;
    v = v0;
    p.x = 0.35 * (p2.x - p1.x) + p1.x;
    p.y = 0.35 * (p2.y - p1.y) + p1.y;
    pos = 0.35;
    g = 2.137;
    console.log("tan = " + Math.tan((2*Math.PI)/360 * alpha));
    if(mus >= Math.tan((2*Math.PI)/360 * alpha) && v0 == 0) {
        console.log("xx");
        zatrzymana = true;
        $("#niezjezdzaj").modal("show");
    }
    else if(zatrzymana) {
        zatrzymana = false;
        tick();
    }
}