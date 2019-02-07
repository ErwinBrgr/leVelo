var myCanvas = {
        canvasWidth : "320px", //définition largeur
        canvasHeight : "220px", //définition hauteur canvas
        drawing: false,
        mousePos: {
          clickX: 0,
          clickY: 0
        },
        clickDrag : new Array(),
        radius: 2,
        canvas: document.getElementById("newSignature"),

/*
        style: function () {
            ctx.strokeStyle = "#222222";
            ctx.lineWith = 10;
        },*/

         lastPos: function () {
            var lastPos = myCanvas.mousePos
        },
        mouseDown: function () {
            this.canvas.addEventListener("mousedown", function (e) {
                myCanvas.drawing = true;
                redraw()
                myCanvas.lastPos = myCanvas.getMousePos(myCanvas.canvas, e);
            }, false);
        },
        mouseUp: function () {
                myCanvas.canvas.addEventListener("mouseup", function (e) {
                myCanvas.drawing = false;
            }, false);
        },
        mouseMove: function () {
                this.canvas.addEventListener("mousemove", function (e) {
                myCanvas.mousePos = myCanvas.getMousePos(myCanvas.canvas, e);
            }, false);
        },
        getMousePos: function (canvasDom, mouseEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - rect.left,
                y: mouseEvent.clientY - rect.top
            };
        },
        renderCanvas: function () {
            if (myCanvas.drawing) {
                ctx.lineTo(myCanvas.mousePos.x, myCanvas.mousePos.y);
                ctx.stroke();

                lastPos = myCanvas.mousePos;
            }
        },
        drawLoop: function () {
            (function drawLoop() {
                requestAnimFrame(drawLoop);
                myCanvas.renderCanvas();
            })();
        },
        getTouchPos: function (canvasDom, touchEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: touchEvent.touches[0].clientX - rect.left,
                y: touchEvent.touches[0].clientY - rect.top
            };
        },
        touchStart: function () {
            myCanvas.canvas.addEventListener("touchstart", function (e) {
                myCanvas.mousePos = myCanvas.getTouchPos(myCanvas.canvas, e);
                var touch = e.touches[0];
                var mouseEvent = new MouseEvent("mousedown", {
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                });
                myCanvas.canvas.dispatchEvent(mouseEvent);
            }, false);
        },
        touchEnd: function () {
            myCanvas.canvas.addEventListener("touchend", function (e) {
                var mouseEvent = new MouseEvent("mouseup", {});
                myCanvas.canvas.dispatchEvent(mouseEvent);
            }, false);
        },
        touchMove: function () {
            myCanvas.canvas.addEventListener("touchmove", function (e) {
                var touch = e.touches[0];
                var mouseEvent = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                });
                myCanvas.canvas.dispatchEvent(mouseEvent);
            }, false);
        },
        touchS: function () {
            document.body.addEventListener("touchstart", function (e) {
                if (e.target == canvas) {
                    e.preventDefault();
                }
            }, false);
        },
        touchE: function () {
            document.body.addEventListener("touchend", function (e) {
                if (e.target == canvas) {
                    e.preventDefault();
                }
            }, false);
        },
        touchM: function () {
            document.body.addEventListener("touchmove", function (e) {
                if (e.target == canvas) {
                    e.preventDefault();
                }
            }, false);
        },


        redraw : function() // gestion du style de trait
        {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
        ctx.strokeStyle = "#000000"; //couleur
        ctx.lineJoin = "round"; // "style du trait"
        ctx.lineWidth = 5; // épaisseur du trait


        for(var i=0; i < clickX.length; i++) {
            ctx.beginPath();
            if(this.clickDrag[i] && i){
              ctx.moveTo(clickX[i-1], clickX[i-1]);
             }else{
              ctx.moveTo(clickX[i]-1, clickX[i]);
             }
             ctx.lineTo(clickX[i], clickX[i]);
             ctx.closePath();
             ctx.stroke();
        }

    },

        signatureClear : function(){
         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }


    };
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimaitonFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
myCanvas.canvas.setAttribute('width',myCanvas.canvasWidth);
myCanvas.canvas.setAttribute('height', myCanvas.canvasHeight);
var ctx = myCanvas.canvas.getContext("2d");
myCanvas.mouseDown();
myCanvas.mouseUp();
myCanvas.mouseMove();
myCanvas.touchStart();
myCanvas.touchEnd();
myCanvas.touchMove();
myCanvas.drawLoop();

  $('#canvas').on('click', function(){
        document.getElementById('signUp').style.display = "block";
        });
$('#clearCanvasSimple').mousedown(function(e)
  {
    myCanvas.clickX = new Array();
    myCanvas.clickY = new Array();
    myCanvas.clickDrag = new Array();
    myCanvas.redraw();
    document.getElementById('signUp').style.display = "none";
});