/*
    Fizyka na Maksa
*/

class Circle{
        constructor(x, y)
        {
            this.x=x;
            this.y=y;
        }
        draw(){
            circ(this.x, this.y, 1, 1, "black", "black", 1)
        }
}

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let v = {x: 0, y: 0};
let p = {x: 0, y: 0};
let a = {x:0 , y: 0};
let h;
let F = {x:0, y:0}
let isworking = false;
let tab=[];
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

function validate() {
    if(v.x < 0 || v.x > 100) {
        alert("Podaj wartość prędkości poziomej od 0 do 100");
        v.x = 5;
        document.getElementById("vx").value = 5;
    }
    if(v.y < -100 || v.y > 100) {
        alert("Podaj wartość prędkości pionowej od -100 do 100");
        v.y = 10;
        document.getElementById("vy").value = 10;
    }
    if(h < 0 || h > 100) {
        alert("Podaj wartość wysokości od 0 do 100");
        h = 20;
        document.getElementById("h").value = 20;
    }
    if(g < -100 || g > 100) {
        alert("Podaj wartość przyspieszenia od -100 do 100 (tak, możesz dać ujemną :) )");
        g = 10;
        document.getElementById("g").value = 10;
    }
    if(alpha < 0 || alpha > 100) {
        alert("Podaj wartość współczynnika alfa od 0 do 100");
        alpha = 1;
        document.getElementById("alpha").value = 1;
    }
    if(m <= 0 || m > 100) {
        alert("Podaj wartość masy większą niż 0 i mniejszą równą 100");
        m = 5;
        document.getElementById("m").value = 5;
    }
}

function prepare(){
    tab=[];
    p.x = 0;
    v.x = parseFloat(document.getElementById("vx").value);
    v.y = parseFloat(document.getElementById("vy").value);
    h = parseFloat(document.getElementById("h").value);
    alpha = parseFloat(document.getElementById("alpha").value);
    g = parseFloat(document.getElementById("g").value);
    m = parseFloat(document.getElementById("m").value);
    validate();
    p.y=(100-h)*(canvas.height)/100-24;
    if(!isworking)
        tick();
}

window.addEventListener("load", ()=>{

    //zmiana rozmiaru okienka
    window.onload = window.onresize = function() {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
    }
    width = canvas.width;
    height = canvas.height;
    prepare();
    //tick();

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
    isworking = true;
    ctx.clearRect(0, 0, width, height);
    p.x+=v.x;
    p.y-=v.y;
    v.y-=g/60;
    v.x-=alpha*v.x/(m*60);

    let c=new Circle(p.x, p.y);
    tab.push(c);

    for(i=0;i<tab.length;i++)
    {
        if(i%1==0)tab[i].draw();
    }
    if(v.y<0)
        v.y+=alpha*v.y/(m*60);
    else
        v.y-=alpha*v.y/(m*60);
    circ(p.x, p.y, 20, 1, "red", "red", 1);
    seg(0, height, width, height, "black", 2);
    seg(0, 0, 0, height, "black", 2);

    if(p.y<=height-23) {
        window.requestAnimationFrame(tick);
    }
    else {
        ctx.clearRect(0, 0, width, height);
        seg(0, height, width, height, "black", 2);
        seg(0, 0, 0, height, "black", 2);
        for(i=0;i<tab.length;i++)
    {
        if(i%1==0)tab[i].draw();
    }

        circ(p.x, height-22, 20, 1, "red", "red", 1);
        isworking = false;
    }
}

function reload() {
    window.requestAnimationFrame(tick);
}