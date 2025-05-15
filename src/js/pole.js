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
let tab=[];
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

function cos(i, startX, startY)
{
    console.log("startX = " + startX);
    console.log("startY = " + startY);
    console.log("tab.x = " + tab[i].x);
    console.log("tab.y = " + tab[i].y);
    console.log((startX-tab[i].x)*(startX-tab[i].x)+(startY-tab[i].y)*(startY-tab[i].y)<=(15*15));
    if((startX-tab[i].x)*(startX-tab[i].x)+(startY-tab[i].y)*(startY-tab[i].y)<=(15*15))return true;
    else return false;
}

var selected = -1;

function handleMouseDown(e) {
    console.log("cos");
    e.preventDefault();
    canvasOffset = $canvas.offset();
    scrollX = window.pageXOffset;
    scrollY = window.pageYOffset;
    console.log("offsetx = " + offsetX);
    console.log("offsety = " + offsetY);
    console.log("scrollx = " + scrollX);
    console.log("scrolly = " + scrollY);
    console.log("magicy = " + e.clientY);
    startX = parseInt(e.clientX+scrollX-offsetX);
    startY = parseInt(e.clientY+scrollY-offsetY);
    for(var i=0; i<tab.length; i++) {
        if(cos(i, startX, startY)) {
            selected = i;
        }
    }
}

function handleMouseUp(e) {
    e.preventDefault();
    selected = -1;
}

function handleMouseOut(e) {
    e.preventDefault();
    selected = -1;
}

function handleMouseMove(e) {
    if(selected < 0)
        return;
    e.preventDefault();
    scrollX = window.pageXOffset;
    scrollY = window.pageYOffset;
    mouseX = parseInt(e.clientX+scrollX-offsetX);
    mouseY = parseInt(e.clientY+scrollY-offsetY);
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    var q = tab[selected];
    q.x += dx;
    q.y += dy;
    draw();
}

$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
});

window.addEventListener("load", ()=>{

    //zmiana rozmiaru okienka
    window.onload = window.onresize = function() {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
    }
    width = canvas.width;
    height = canvas.height;
    prepare();
    draw();

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
    draw();
});
document.getElementById("addp").onclick = addp;
document.getElementById("addm").onclick = addm;

function addp() {
    ch=new Charge(width/2, height/2, 1);
    tab.push(ch);
    draw();
}
function addm() {
    ch=new Charge(width/2, height/2, -1);
    tab.push(ch);
    draw();
}

function canvas_arrow(fromx, fromy, tox, toy) {
    console.log("arrow");
    var headlen = 5; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    //ctx.beginPath();
    var kol = "black";
    seg(fromx, fromy, tox, toy, kol, 1);
    seg(tox, toy, tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6), kol, 1);
    seg(tox, toy, tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6), kol, 1);
    /*ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), );
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.beginPath();*/
  }

function draw() {
    ctx.clearRect(0, 0, width, height);
    var gX = [], gY = [], max = -1000000000, min = 1000000000;
    var g = [], gV = [];
    var dd = 1000000000;
    for(i=0; i<width; i+=3)
    {
        for(j=0; j<height; j+=3)
        {
            var E=0;
            var Ex=0;
            var Ey=0;
            var V=0;
            for(u=0;u<tab.length;u++) {
                var r=((tab[u].x-i)*(tab[u].x-i)+(tab[u].y-j)*(tab[u].y-j));
                if(r <= (12*12))
                    continue;
                dd = Math.min(((tab[u].x-i)*(tab[u].x-i)+(tab[u].y-j)*(tab[u].y-j)), dd);
                var dE = k*tab[u].q/r;
                var dV = k*tab[u].q/(Math.sqrt(r));
                E += dE;
                var dEx = ((i-tab[u].x) * dE) / (Math.sqrt(r));
                var dEy = ((j-tab[u].y) * dE) / (Math.sqrt(r));
                Ex += dEx; Ey += dEy;
                V += dV;
            }
            Ex /= (tab.length);
            Ey /= (tab.length);
            gV.push(V);
            max = Math.max(max, V); min = Math.min(min, V);
            gX.push(Ex); gY.push(Ey); g.push(E)
        }
    }
    var cg = 0;
    for(i=0;i<width;i+=3) {
        for(j=0;j<height;j+=3) {
            var V = gV[cg];
            if(V > 0) {
                var ratio = V*20/ max;
                rect(i, j, 3, 3, 1, "white", "rgba(255, 0, 0, " + ratio + ")", -1);
            }
            else if(V < 0) {
                var ratio = V*20/ min;
                rect(i, j, 3, 3, 1, "white",  "rgba(0, 0, 255, " + ratio+")", -1);
            }
            cg++;
        }
    }
    cg = 0;
    for(i=0; i<width; i+=3) {
        for(j=0; j<height; j+=3) {
            if(i % 27 == 0 && j % 27 == 0) {
                var Ex = gX[cg], Ey = gY[cg];
                var E = Math.sqrt(Ex*Ex + Ey*Ey);
                var dx = (Ex*20)/E, dy = (Ey*20)/E;
                /*
                    Ex / x = E / 15 => x = Ex * 15 / E
                */
                canvas_arrow(i, j, i+dx, j+dy);
            }
            cg++;
        }
    }
    for(i=0;i<tab.length;i++) {
        tab[i].draw();
    }
}

function xx() {
    console.log(window.pageYOffset);
    console.log(window.scrollY);
}

function prepare() {
    ;
}