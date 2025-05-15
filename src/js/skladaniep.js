/*
    Fizyka na Maksa
*/

class Circle{
    constructor(x, y, kol)
    {
        this.x=x;
        this.y=y;
        this.kol=kol;
    }
    draw(){
        circ(this.x, this.y, 1, 1, this.kol, this.kol, 1);
    }
}
let tab1=[], tab2=[];

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let A1, A2, w1, w2, phi;
let x, y, xp, yp, t;
var id = -1;

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


window.addEventListener("load", ()=>{

    window.onload = window.onresize = function() {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
    }
    width = canvas.width;
    height = canvas.height;
    prepare();
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
});

document.getElementById("submit").onclick = prepare;

function tick() {
    x=A1*Math.sin(w1*t) + width/2;
    y=A2*Math.sin(w2*t+phi)+height/2;
    t++;
    seg(xp, yp, x, y, "black", 1);
    xp = x;
    yp = y;
    id = requestAnimationFrame(tick);
}

function validate() {
    
   if(A1>500||A1<0) {
        alert("Amplituda A1 musi mieć wartość od 0 do 500!");
        A1 = 100;
   }
   if(A2>300||A2<0) {
        alert("Amplituda A2 musi mieć wartość od 0 do 300!");
        A2 = 200;
    }
    
}

function rad(a) {
    return (a/180) * Math.PI;
}

function prepare() {
    if(id != -1) cancelAnimationFrame(id);
    ctx.clearRect(0, 0, width, height);
    //sinusoida(100, 10000, "red");
    A1 = parseFloat(document.getElementById("A1").value);
    w1 = parseFloat(document.getElementById("w1").value);
    A2 = parseFloat(document.getElementById("A2").value);
    w2 = parseFloat(document.getElementById("w2").value);
    phi = rad(parseFloat(document.getElementById("phi").value));
    validate();
    w1 *= 0.001;
    w2 *= 0.001;
    t = 0;
    x=A1*Math.sin(w1*t) + width/2;
    y=A2*Math.sin(w2*t+phi)+height/2;
    xp = x;
    yp = y;
    tick();
}