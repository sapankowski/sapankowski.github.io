/*
    Fizyka na Maksa
*/

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let k, g, m, A, x0, l, x, omega, t;

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

function tick() {
    ctx.clearRect(0, 0, width, height);
    seg(0, x0+20, width, x0+20, "red", 2);
    seg(0, A+x0+20, width, A+x0+20, "blue", 2);
    seg(0, -A+x0+20, width, -A+x0+20, "blue", 2);
    ctx.font = "20px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Amplituda A", 3, -A+x0+20-20);
    ctx.fillStyle = "red";
    ctx.fillText("Stan równowagi", 3, x0+20-20);
    ctx.fillStyle = "blue";
    ctx.fillText("Amplituda A", 3, A+x0+20-20);
    spring(x);
    seg(0, 20, width, 20, "black", 2);
    for (i = 0; i<69;i++) {
        seg(i*width/69, 0, (i+1)*width/69, 20, "black", 2);
    }
    // 250 -> len
    rect((width/2-47.5), x+20, 45, 45, 1, "brown", "pink", 4);
    //ctx.clearRect(0, 0, width, height);
    x = x0 + A * Math.sin(omega * t) - (45/2);
    console.log("xx = " + (A * Math.sin(omega * t)));
    console.log(x);
    t += 0.1;
    requestAnimationFrame(tick);
}

function spring(len) {
    ctx.translate(width/2, (len)/2);
    ctx.rotate(0.5 * Math.PI);
    ctx.translate(-width/2, -(len)/2);
    ctx.drawImage(img, (width-len)/2+20, (len)/2 , len, 50);
    ctx.translate(width/2, (len)/2);
    ctx.rotate(-0.5 * Math.PI);
    ctx.translate(-width/2, -(len)/2);
}

var img = new Image();   // Create new img element
img.src = '/img/sprezyna.png'; // Set source path

function validate() {
    if(k <= 0) {
        alert("Współczynnik sprężystości k musi być dodatni!");
        k = 3;
        document.getElementById("k").value = 3;
    }
    if(m <= 0) {
        alert("Masa ciała m musi być dodatnia!");
        m = 10;
        document.getElementById("m").value = 10;
    }
}

function prepare() {
    k = parseFloat(document.getElementById("k").value);
    g = parseFloat(document.getElementById("g").value);
    m = parseFloat(document.getElementById("m").value);
    A = parseFloat(document.getElementById("A").value);
    validate();
    l = 200;
    x0 = l + (m*g)/k;
    x = x0;
    omega = Math.sqrt(k/m);
    t = 0;
    console.log("x0 = " + x0);
    console.log("omega = " + omega);
}