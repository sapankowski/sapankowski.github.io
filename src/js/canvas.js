/*
    Fizyka na Maksa
*/

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let v1 = {x: 0, y: 0};
let v2 = {x: 0, y: 0};
let p1 = {x: 0, y: 0};
let p2 = {x: 0, y: 0};
let m1, m2;

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
    tick();
});

document.getElementById("submit").onclick = prepare;

function prepare() {
    p1.x = 0.2 * width; p1.y = 0.5 * height;
    p2.x = 0.8 * width; p2.y = 0.5 * height;
    v1.x = parseInt(document.getElementById("v1x").value);
    v2.x = parseInt(document.getElementById("v2x").value);
    v1.y = parseInt(document.getElementById("v1y").value);
    v2.y = parseInt(document.getElementById("v2y").value);
    m1 = parseInt(document.getElementById("m1").value);
    m2 = parseInt(document.getElementById("m2").value);
    //console.log(m2);
}

function boomy() {
    let tmpv1 = {x: 0, y:0};
    let tmpv2 = {x: 0, y:0};
    tmpv1.y = (v1.y*(m1-m2)+2*m2*v2.y)/(m1+m2);
    tmpv2.y = ((v2.y*(m2-m1))+(2*m1*v1.y))/(m1+m2);
    v1.y = tmpv1.y;
    v2.y = tmpv2.y;
    while((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)<=400) {
        p1.y += v1.y;
        p2.y += v2.y;
    }
}
function boomx() {
    //let x=(m1+m2);
    //console.log(x);
    let tmpv1 = (v1.x*(m1-m2)+2*m2*v2.x)/(m1+m2);
    let tmpv2 = ((v2.x*(m2-m1))+(2*m1*v1.x))/(m1+m2);
    v1.x = tmpv1;
    v2.x = tmpv2;
    while((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)<=1600) {
        p1.x += v1.x;
        p2.x += v2.x;
    }
}
function boom() {

    let tmpv2 = {x: 0, y:0};
    tmpv2.x=v1.x-v2.x;
    tmpv2.y=v1.y-v2.y;
    //console.log(tmpv2.y/tmpv2.x);
    let b=Math.atan((p1.y-p2.y)/(p1.x-p2.x));
    let a=Math.atan(tmpv2.y/tmpv2.x)-Math.atan((p1.y-p2.y)/(p1.x-p2.x));
    console.log(a);
    console.log(b);
    let P1 = (m2*(Math.sqrt((tmpv2.x*tmpv2.x)+(tmpv2.y*tmpv2.y))))/(Math.cos(a)+(Math.sin(a)*Math.sin(a))/Math.cos(a));
    let P2 = P1*Math.tan(a);
    P1/=m1;
    P2/=m2;
    v2.y=v1.y+P2*Math.cos(b);
    v2.x=v1.x-P2*Math.sin(b);
    v1.y+=P1*Math.sin(b);
    v1.x+=P1*Math.cos(b);
    while((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)<=1600) {
        p1.x += v1.x;
        p2.x += v2.x;
        p1.y += v1.y;
        p2.y += v2.y;
    }
}

function tick() {
    console.log("2137");
    //console.log(p1.x);
    //console.log(p2.x);
    ctx.clearRect(0, 0, width, height);
    p1.x += v1.x;
    p2.x += v2.x;
    p1.y += v1.y;
    p2.y += v2.y;
    circ(p1.x, p1.y, 20, 1, "red", "red", 2);
    circ(p2.x, p2.y, 20, 1, "blue", "blue", 2);
    if((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)<=1600) {
        boomx();
        boomy();
        //boom();
    }
    if((p1.x <= 20 || p1.x >= width-20)) {
        v1.x *= -1;
        p1.x += v1.x;
    }
    if((p2.x <= 20 || p2.x >= width-20)) {
        v2.x *= -1;
        p2.x += v2.x;
    }
    if((p1.y <= 20 || p1.y >= height-20)) {
        v1.y *= -1;
        p1.y += v1.y;
    }
    if((p2.y <= 20 || p2.y >= height-20)) {
        v2.y *= -1;
        p2.y += v2.y;
    }
    
    window.requestAnimationFrame(tick);
}

function reload() {
    console.log("V1: " + v1.x);
    console.log("V2: " + v2.x);
    console.log("width: " + width);
    console.log("height: " + height);
    window.requestAnimationFrame(tick);
}