/*
    Fizyka na Maksa
*/

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let n, phi, alpha, beta1, beta2, alpha2;

//proste kształty
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

function rad(a) {
    return (a/360) * 2 * Math.PI;
}

function deg(r) {
    return (r/(2*Math.PI)) * 360;
}

function tick() {
    ctx.clearRect(0, 0, width, height);
    seg(0, height/2, 300, height/2, "red", 2);
    var ppx, ppy, pkx, pky;
    ppx=300-Math.tan(rad(alpha))*(height/3);
    pkx=300+Math.tan(rad(alpha))*(height/3);
    ppy=height*5/6
    pky=height/6;
    dottedseg(300-1/(Math.tan(rad(alpha)))*height/3, height/6, 300+(1/Math.tan(rad(alpha)))*height/3, height*5/6, "blue", 1);
    // a1, b1 - rownanie drugiego ramienia
    // a2, b2 - rownanie pierwszego zalamania
    // x1, y1 - punkt przeciecia a1 i a2
    var a1 = Math.tan(rad(90-phi+alpha));
    var b1 = pky - a1 * pkx;
    var a2 = Math.tan(rad(alpha-beta1));
    var b2 = height/2-a2*300;
    var x1=(b2-b1)/(a1-a2);
    var y1=a1*x1+b1;
    console.log("a1: " + a1);
    console.log("b1: " + b1);
    if(alpha==phi)
    {
        x1=pkx;
        y1=a2*pkx+b2;
    }
    seg(300, height/2, x1, y1, "red", 2);
    seg(ppx, ppy, pkx, pky, "black", 2);
    seg(pkx+(2/3)*height*(1/a1), ppy, pkx, pky, "black", 2);
    dottedseg(x1-((a1)*(5*height/6-y1)), 5*height/6, x1+((a1)*(y1-height/6)), height/6, "blue", 1);
    seg(x1, y1, (1/Math.tan(rad(alpha2-phi+alpha)))*((5/6) * height - y1) + x1, ppy, "red", 2);
    console.log(alpha2);
    rect(0, height*5/6, width, height/6, 1, "white", "white", 1);
    seg(0,5*height/6, width, 5*height/6, "black", 2);
    for (i = 0; i<69;i++) {
        seg(i*width/69, 5*height/6, (i+1)*width/69, 5*height/6+20, "black", 2);
    }
    rect(430, 0, width-430, 40, 1, "black", "white", 2);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("kąt w stopniach do osi optycznej po wyjściu z pryzmatu: " + alpha2.toPrecision(4), 440, 25);
    //ctx.fillText("odleglość obrazu, y = " + parseInt(y/25), 760, 80)
}

function validate() {
    if(n <= 0) {
        alert("Wartość współczynnika załamania musi być liczbą nieujemną!");
        n = 1.5;
    }
    if(alpha > 90 || alpha < 0) {
        alert("Kat padania musi być kątem ostrym!");
        alpha = 30;
    }
}

function prepare() {
    n = parseFloat(document.getElementById("n").value);
    phi = parseFloat(document.getElementById("phi").value);
    alpha = parseFloat(document.getElementById("alpha").value);
    validate();
    beta1 = deg(Math.asin(Math.sin(rad(alpha))/n));
    console.log("beta1: " + beta1);
    beta2 = phi - beta1;
    alpha2 = deg(Math.asin(n * Math.sin(rad(beta2))));
    var katgraniczny = deg(Math.asin(1/n));
    console.log("kat graniczny: " + katgraniczny);
    console.log("beta2: " + beta2);
    if((n * Math.sin(rad(beta2))) > 1) {
        $("#odbicie").modal("show");
        alpha2 = 90 + (90-beta2);
    }
    console.log(beta1);
    console.log(n);
    tick();
}