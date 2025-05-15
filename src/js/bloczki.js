/*
    Fizyka na Maksa
*/

const canvas=document.querySelector("#canvas");
const ctx=canvas.getContext("2d");
let width, height;
let m1, m2, y1, y2, a1, a2, v1, v2, x = [];
let r;
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
    v1+=a1;
    v2+=a2;
    y1+=v1;
    y2+=v2;
    seg(0, 40, width, 40, "black", 1);
    circ(x[3], y2-100, r, 1, "black", "white", 1);
    circ(x[1], r+70, r, 1, "black", "white", 1);
    rect(x[0]-25, y1, 50, 50, 1, "black", "green", 1);
    rect(x[3]-25, y2, 50, 50, 1, "black", "cyan", 1);
    seg(x[0], y1, x[0], r+70, 1, "black", "black", 1);
    seg(x[1], 40, x[1], r+70, 1, "black", "black", 1);
    seg(x[3], y2-100, x[3], y2, "black", 1);
    seg(x[2], r+70, x[2], y2-100, "black", 1);
    seg(x[4], y2-100, x[4], 40, 0, "black", "black", 1);
    ctx.font = "20px Arial";
    ctx.fillStyle="black";
    ctx.fillText("m1", x[0]-12, y1+30);
    ctx.fillText("m2", x[3]-12, y2+30);
    for (i = 0; i<69;i++) {
        seg(i*width/69, 0, (i+1)*width/69, 40, "black", 2);
    }
    if(Math.min((y2-100), y1) <= (r+70)) {
        pausecomp(1000);
        prepare();
    }
    rect(720, 40, (width-720), 70, 1, "black", "white", 2)
    
    ctx.fillStyle = "blue";
    ctx.fillText("przyspieszenie a1 = " + (100*a1).toPrecision(3) + " m/s", 730, 60);
    ctx.fillStyle = "red";
    ctx.fillText("przyspieszenie a2 = " + (100*a2).toPrecision(3) + " m/s", 730, 90);
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
}

function prepare() {
    m1 = parseFloat(document.getElementById("m1").value);
    m2 = parseFloat(document.getElementById("m2").value);
    validate();
    a1= ((g*(2*m1-m2))/((2*m1)+(m2/2))) / 100;
    a2=-a1/2;
    v1=0;
    v2=0;
    y1=200;
    y2=450;
    r=width/20;
    for(i=8;i<=12;i++)
    {
        x.push(width*i/20);
        //x[i-4]=width*i/10
    }
}