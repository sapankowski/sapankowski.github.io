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
let m1, m2, r, g = 10000;
let p1={x:0, y:0};
let p2={x:0, y:0};
let v1={x:0, y:0};
let v2={x:0, y:0};
let tickcnt = 0;

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
    tick();


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

var donut = new Image(), cookie = new Image();
donut.src = "/img/donut.png";
cookie.src = "/img/cookie.png";

function tick() {
    ctx.clearRect(0, 0, width, height);
    rect(0, 0, width, height, 1, "black", "black", 2);
    if(tickcnt%2==0)
    {
        let c1=new Circle(p1.x, p1.y, "pink");
        let c2=new Circle(p2.x, p2.y, "white");
        tab1.push(c1);
        tab2.push(c2);
    }
    for(i=0;i<tab1.length;i++)
    {

        tab1[i].draw();
        tab2[i].draw();
        
    }
    ctx.drawImage(cookie, p2.x-12.5, p2.y-12.5, 25, 25);
    ctx.drawImage(donut, p1.x-25, p1.y-25, 50, 50);
    p1.x += v1.x/60; p2.x += v2.x/60; p1.y += v1.y/60; p2.y += v2.y/60;
    let a1 = {x: 0, y: 0}, a2 = {x: 0, y: 0};
    let d = (p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y);
    let a=Math.atan2((p2.y-p1.y),(p2.x-p1.x));
    a1.x=(g*m2/d)*Math.cos(a);
    a1.y=(g*m2/d)*Math.sin(a);
    a2.x=-(g*m1/d)*Math.cos(a);
    a2.y=-(g*m1/d)*Math.sin(a);
    v1.x += a1.x/60; v1.y += a1.y/60; v2.x += a2.x/60; v2.y += a2.y/60;
    console.log(p1.x);
    console.log(p1.y);
    console.log(p2.x);
    console.log(p2.y);
    console.log("\n");
    tickcnt++;
    requestAnimationFrame(tick);
}

function validate() {
    if(v2.y <= 0) {
        alert("Podaj nieujemną prędkość początkową ciastka!");
        v2.y = 10;
        document.getElementById("v").value = 10;
    }
}

function prepare() {
    tab1=[];
    tab2=[];
    tickcnt = 0;
    m1 = parseFloat(document.getElementById("m1").value);
    m2 = parseFloat(document.getElementById("m2").value);
    r = parseFloat(document.getElementById("r").value);
    v1.x = 0; v1.y = 0; v2.x = 0; v2.y = 0;
    v2.y = parseFloat(document.getElementById("v").value);
    validate();
    p1.x=width/2;
    p1.y=height/2;
    p2.x=p1.x+r;
    p2.y=p1.y;
}