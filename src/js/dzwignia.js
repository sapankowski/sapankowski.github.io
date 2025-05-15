/*
    Fizyka na Maksa
*/

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let m1, m2, x1, x2, w, e, x0, y0, a;
const g=9.81;
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function tick() {
    ctx.clearRect(0, 0, width, height);
    w += e;
    a += w;
    e=((m1*x1-m2*x2)*Math.cos(a))/(m1*x1*x1+m2*x2*x2);
    e /= 10;
    seg(x0, y0, x0-10, y0+60, "black", 1);
    seg(x0, y0, x0+10, y0+60, "black", 1);
    seg(x0-10, y0+60, x0+10, y0+60, "black", 1);
    ctx.translate(x0, y0);
    ctx.rotate(-a);
    seg(-width/2+100, 0, width/2-100, 0, "black", 2);
    rect(-x1-10, -10, 20, 20, 1, "red", "red", 1);
    rect(x2-10, -10, 20, 20, 1, "blue", "blue", 1);
    
    ctx.font = "15px Arial";
    ctx.fillStyle="black";
    ctx.fillText("m1", -x1-12, -15);
    ctx.fillText("m2", x2-12, -15);

    ctx.rotate(a);
    ctx.translate(-x0, -y0);
    requestAnimationFrame(tick);
}

function validate() {
    if(m1 <= 0) {
        alert("Masa musi być dodatnia!");
        m1 = 4;
    }
    if(m2 <= 0) {
        alert("Masa musi być dodatnia!");
        m2 = 1;
    }
    if(x1 <= 0 || x1 > 10) {
        alert("Odleglosc x1 musi byc w przedziale od 0 do 10 m!");
        x1 = 3;
    }
    if(x2 <= 0 || x2 > 10) {
        alert("Odleglosc x2 musi byc w przedziale od 0 do 10 m!");
        x2 = 5;
    }
}

function prepare() {
    m1 = parseFloat(document.getElementById("m1").value);
    m2 = parseFloat(document.getElementById("m2").value);
    x1 = parseFloat(document.getElementById("x1").value);
    x2 = parseFloat(document.getElementById("x2").value);
    validate();
    x0=width/2;
    y0=height/2;
    x1 = (x1 / 10) * (width/2 - 100);
    x2 = (x2 / 10) * (width/2 - 100);
    w=0;
    a=0;
    e=0;
}