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


const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let f, x, y, p;

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
    //tick();


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

function canvas_arrow(fromx, fromy, tox, toy, kol) {
    console.log("arrow");
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    //ctx.beginPath();
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

document.getElementById("submit").onclick = prepare;

function dottedseg(x1, y1, x2, y2, kol, wid) {
    ctx.beginPath();
    ctx.setLineDash([2, 2]);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle=kol;
    ctx.lineWidth=wid;
    ctx.stroke();
    ctx.setLineDash([]);
    console.log("dotted");
}

function przezsrodek() {
    var a = ((height/2) - (height/2-100))/((width/2)-(width/2-x));
    var b = (height/2) - a*(width/2);
    console.log("a = " + a);
    console.log("b = " + b);
    var x1 = -1, y1 = a*(-1) + b;
    var x2 = width+1, y2 = a*(width+1) + b;
    dottedseg(x1, y1, x2, y2, "black", 0.5);
    seg(width/2-x, height/2-100, x2, y2, "black", 0.5);
}

function tick() {
    ctx.clearRect(0, 0, width, height);
    seg(0, height/2, width, height/2, "black", 1);
    seg(width/2, 100, width/2, height-100, "black", 1);
    seg(width/2-f, height/2-5, width/2-f, height/2+5 , "black", 1);   
    seg(width/2+f, height/2-5, width/2+f, height/2+5, "black", 1);
    //obiekt
    canvas_arrow(width/2-x, height/2, width/2-x, height/2-100, "blue");
    //obraz
    canvas_arrow(width/2+y, height/2, width/2+y, height/2-(p*100), "red");
    if(f<0)
    {
        canvas_arrow(width/2, 99, width/2, 100, "black");
        canvas_arrow(width/2, height-100+1, width/2, height-100, "black");
    }
    else{
        canvas_arrow(width/2, 100, width/2, 99, "black");
        canvas_arrow(width/2, height-100, width/2, height-99, "black");
    }
    przezsrodek();
    seg(width/2-x, height/2-100,width/2 , height/2-100, "black", 0.5);
    if(y>=0)
    {
        var ya=height/2-100;
        var xa=width/2;
        var yb=height/2;
        var xb=width/2+f;
        var a=(yb-ya)/(xb-xa);
        var b=ya-a*xa;
        seg(xa, ya, width, a*width+b, "black", 0.5);
    }
    else {
        var ya=height/2-100;
        var xa=width/2;
        var yb=height/2-(p*100);
        var xb=width/2+y;
        var a=(yb-ya)/(xb-xa);
        var b=ya-a*xa;
        seg(xa, ya, width, a*width+b, "black", 0.5);
        dottedseg(xa, ya, xb, yb, "black", 0.5);
    }

    rect(750, 0, 250, 90, 1, "black", "white", 2)
    ctx.font = "20px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("obiekt", 760, 20);
    ctx.fillStyle = "red";
    ctx.fillText("obraz", 760, 50);
    ctx.fillText("odleglość obrazu, y = " + parseInt(y/25), 760, 80)
}

function validate() {
    if(x <= 0) {
        alert("Odległość obrazu musi być liczbą dodatnią.")
        x = 10 * 25;
        document.getElementById("x").value = 10;
    }
    if(f == 0) {
        alert("Ogniskowa soczewki nie może być równa 0.")
        f = 5 * 25;
        document.getElementById("x").value = 5;
    }
}

function prepare() {
    f = parseFloat(document.getElementById("f").value) * 25;
    x = parseFloat(document.getElementById("x").value) * 25;
    validate();
    y = (x*f)/(x-f);
    p = -y/x;
    if(f > 0 && x == f)
        $("#niemaobrazu").modal("show");
    tick();
}