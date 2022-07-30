var color = "#000000"
var secColor= "#ffffff"


var defSize = 16

var miniCanvas = document.getElementById("miniCanvas");
var miniCanvasContext = miniCanvas.getContext("2d");

var canvas = document.getElementById("myCanvas");
var canvasCont = document.getElementById("canvasCont");
var canvasContext = canvas.getContext("2d");
var mouseShadow

var blockSize = canvas.width/16

//defaut tool pen draw a pixel 
var  mousedIsDown=false
var tool="pen"
var drawMatrix = [];


for(var i=0; i<16;i++){
    var line = [];
    for(var j=0; j<16;j++){
        line.push(0);
    }
    drawMatrix.push(line)
}

canvasContext.fillStyle = "black";//procitional ultil more tool are avaible(it gonna become obsolete)

//alert(blockSize)
ClearCanvas()
createMouseShadow()
//DrawPixel(2,0,blockSize)


function createMouseShadow(){
    mouseShadow = document.createElement("div")
    mouseShadow.setAttribute("class","shadowMarker")
    let bsize= blockSize.toString()+"px"

    mouseShadow.style.minWidth= bsize
    mouseShadow.style.minHeight=bsize
    
    canvas.parentElement.appendChild(mouseShadow)

    
}
function updateMouseShadowPosition(px,py){
   let percentx =px/16*100
   let percenty =py/16*100
   //limit shadow to canvas
   if(percentx<=0){percentx=0}
   if(percentx>=100){percentx=15/16*100}
   if(percenty<=0){percenty=0}
   if(percenty>=100){percenty=15/16*100}

   mouseShadow.style.left=percentx.toString()+"%"
   mouseShadow.style.top=percenty.toString()+"%"
  // mouseShadow.style.top=((py*16)/canvas.height*100).toString()+"%"
}


function NewCanvas(){
    if(confirm("changes can't be recovered you really want a new Canvas?")){
        ClearCanvas()
    }
}

function ClearCanvas(){
   
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    miniCanvasContext.fillStyle="white"
    miniCanvasContext.fillRect(0,0,miniCanvas.width,miniCanvas.height);


   drawMatrix = [];


    for(var i=0; i<16;i++){
        var line = [];
        for(var j=0; j<16;j++){
            line.push(0);
        }
        drawMatrix.push(line)
    }

    //setToolPen()
   // setTool("pen")
}


function DrawPixel(posx, posy,bsize){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
   // canvasContext.fillStyle = "black";
    
    var px = posx*bsize
    var py = posy*bsize
    var pline =drawMatrix[posx]
   

    if(this.tool =="pen"){
        pline[posy]=1
    }

    if(this.tool =="eraser"){
        
        pline[posy]=0
        
    }
    
    

    ctx.fillRect(px,py,bsize,bsize);
    
}

function setTool(choosedTool){
    //alert("chosse.;",choosedTool)
    tool= choosedTool
    switch(tool){
        case "pen":
            setToolPen()
            break;
        case "bucket":
            setToolEraser()
            break;
        case "fill":
            canvasContext.fillStyle = "black";
            break;
        default:
            setToolPen()
            break;
    }
    setToolText()
}

function setToolPen(){
    //provitional
    tool="pen"
    canvasContext.fillStyle = "black";
    setToolText()
}

function setToolEraser(){
    //alert("setToll erarese")
    tool="eraser"
    //provitional // only until new tools being added
    canvasContext.fillStyle = "white";
    setToolText()
}

function setToolText(){
    var label = document.getElementById("currentTool");
    label.textContent=tool;
}



// draw click
var container = document.getElementsByClassName('container')[0];
document.addEventListener('click', function( event ) {
  DrawPixelInMosusePos(event)
  updateMiniCanvas()
});

function DrawPixelInMosusePos(event){

   // if (canvas == event.target && canvas.contains(event.target)) {    
    
    //calculatemouse position on 
        var mPos= getMousePos(canvas,event)
        
        var tpx=Math.floor(mPos.x/blockSize)
        var tpy=Math.floor(mPos.y/blockSize)

        updateMousePos(mPos)
        
        DrawPixel(tpx,tpy,blockSize)
    //}
}

addEventListener("mousedown", function(event ){
    mousedIsDown=true
});

addEventListener("mouseup", function(event ){
    mousedIsDown=false
});

addEventListener("mousemove",function(event){
    if(mousedIsDown){
        DrawPixelInMosusePos(event)
    }else{
        var mPos= getMousePos(canvas,event)
        updateMousePos(mPos)
    }

    
})
function updateMousePos(mPos){
    var tpx=Math.floor(mPos.x/blockSize)
    var tpy=Math.floor(mPos.y/blockSize)
    
    updateMouseShadowPosition(tpx,tpy)
    
    

    if(tpx<0 ||tpy<0 ||tpx>=16 ||tpy>=16 )
    {
        document.getElementById("mousex").textContent="--"
        document.getElementById("mousey").textContent="--"
    }else{
        document.getElementById("mousex").textContent=tpx.toString()
        document.getElementById("mousey").textContent=tpy.toString() 
    }
  
}
function getMousePos(_canvas, evt) {
    var rect = _canvas.getBoundingClientRect();
    //console.log(rect)

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function GridFixer(){

}


function saveAsImage(){
 updateMiniCanvas()

  let factorMultiplier=1
  let image = miniCanvas.toDataURL("image/png", factorMultiplier).replace("image/png", "image/octet-stream");
  let link = document.createElement('a');
  let format=".png"
  let name=document.getElementById("imgname").textContent.toString()+format

  
  link.download = name;
  link.href = image;
  link.click();
}

function updateMiniCanvas(){
    //alert("update minicanvas");
    miniCanvasContext = miniCanvas.getContext("2d");
    miniCanvasContext.fillStyle="white"
    miniCanvasContext.fillRect(0,0,miniCanvas.width,miniCanvas.height);
    
    miniCanvasContext.fillStyle="black"

    for(var i=0;i<drawMatrix.length;i++){

        var pixelLine=drawMatrix[i];
     
        for(var j=0;j< pixelLine.length;j++){
            if(pixelLine[j]==1){
             
                miniCanvasContext.fillRect(i,j,1,1);
            }
    
        }
    }
   //alert("updatedx");
  
}


function resizeCanvas(size){
    
}

function bucket(px=0, py=0){


}

function colorSwap(){
   

}