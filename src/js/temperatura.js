/*
    Fizyka na Maksa
*/
class Charge{
    constructor(x, y, q){
        this.x=x;
        this.y=y;
        this.q=q;
    }
    draw()
    {
        if(this.q>0)circ(this.x, this.y, 15, 1, "black", "red", 1);
        else if(this.q<0)circ(this.x, this.y, 15, 1, "black", "blue", 1);
    }
}

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let t1, t2, c1, c2;
let temp = [];
let k = 1000000;
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

var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = window.pageXOffset;
var scrollY = window.pageYOffset;
var startX;
var startY;

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



/*function drag(){
    //zmienne
    let painting=false;
    function startPosition(e) {
        painting=true;
        move(e);
    }
    function finishedPosition() {
        painting=false;
        //ctx.beginPath();
    }
    function move(e) {
        if(!painting) return;
        ctx.lineWidth=6;
        ctx.lineCap="round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        tab[x].x=e.clientX;
        tab[x].y=e.clientY;
        tick();
    }
    //ctx.beginPath();
    //Event listeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", move);
}*/

document.getElementById("submit").onclick = prepare;

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

var t = 0;

function tick() {
    ctx.clearRect(0, 0, width, height);
    var dd = 1000000000;
    var tnew = [], ratio = [];
    tnew.push(temp[0]);
    if(t == 0) temp[width/2+1]=(t1+t2)/2;
    for(i=1; i<width; i++)
    {
        var c;
        if(i <= (width/2)) c = c1;
        else c = c2;
        tnew.push(temp[i]+((temp[i+1]+temp[i-1]-2*temp[i])/c));
        if(i == 260) console.log("tnew[260] = " + tnew[260]);
    }
    tnew.push(tnew[width-1]);
    for(i=0;i<=width;i++) {
        if(tnew[i] > (t1+t2)/2) {
            var ratio = 1-(Math.max(t2, t1)-tnew[i])/ (Math.max(t2, t1)-(t1+t2)/2);
            rect(i, 0, 1, height, 1, "white", "rgba(255, 0, 0, " + ratio + ")", 0);
        }
        else {
            var ratio = 1-(tnew[i]-Math.min(t1, t2))/((t1+t2)/2-Math.min(t1, t2));
            rect(i, 0, 1, height, 1, "white",  "rgba(0, 0, 255, " + ratio+")", 0);
        }
        rect(i, 50+height-100-((tnew[i]-Math.min(t1, t2))/(Math.max(t2, t1)-Math.min(t2, t1))*(height+-100)), 1, 1, 1, "black", "black", 0);
        
    }
    seg(width/2, 0, width/2, height, "black", 1);
    // [0, width]
    for(i=1;i<=width;i++)
    {
        temp[i]=tnew[i];
    }
    if(t == 0) temp[width/2+1]=(t1+t2)/2;
    temp[0]=temp[1];
    temp[width]=temp[width-1]
    ctx.font = "10px Arial";
    /*ctx.fillStyle = "blue";
    ctx.fillText("obiekt", 760, 20);
    ctx.fillStyle = "red";
    ctx.fillText("obraz", 760, 50);*/
    for(i=-10; i<=10; i++)
    {
        var j = width/2 + (i * (width/20));
        var x;
        x=Math.floor(temp[j]);
        ctx.fillText(x+" K", j-8,20);
    }
    //ctx.fillText("odleglość obrazu, y = " + parseInt(y/25), 760, 80)
    t++;
    requestAnimationFrame(tick);
}

function xx() {
    console.log(window.pageYOffset);
    console.log(window.scrollY);
}

function validate() {
    if(c1 <= 0) {
        alert("Ciepło właściwe C1 musi być wartością dodatnią!");
        c1 = 3000;
    }
    if(c2 <= 0) {
        alert("Ciepło właściwe C2 musi być wartością dodatnią!");
        c2 = 4000;
    }
    if(t1 <= 0) {
        alert("Temperatura T1 musi być wartością dodatnią!");
        t1 = 100;
    }
    if(t2 <= 0) {
        alert("Temperatura T2 musi być wartością dodatnią!");
        t2 = 150;
    }
    if(c1 < 200) {
        alert("Ustaw ciepło właściwe C1 na >= 200!");
        c1 = 200;
    }
    if(c2 < 200) {
        alert("Ustaw ciepło właściwe C2 na >= 200!");
        c2 = 200;
    }
}

function prepare() {
    t1 = parseFloat(document.getElementById("t1").value);
    t2 = parseFloat(document.getElementById("t2").value);
    c1 = parseFloat(document.getElementById("c1").value);
    c2 = parseFloat(document.getElementById("c2").value);
    t = 0;
    validate();
    c1 *= 0.01
    c2 *= 0.01;
    temp = [];
    for(i=0; i<=width/2; i++) temp.push(t1);
    for(i=width/2+1; i<=width; i++) temp.push(t2);
    if(t1 == t2) {
        $("#brakprzeplywu").modal("show");
    }
    else tick();
}