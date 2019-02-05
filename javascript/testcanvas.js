var myCanvas = {
        drawing: false,
        mousePos: {
          x: 0,
          y: 0
        },
        radius: 2,
        canvas: document.getElementById("newSignature"),


        style: function () {
            ctx.strokeStyle = "#222222";
            ctx.lineWith = 2;
        },

         lastPos: function () {
            var lastPos = myCanvas.mousePos
        },
        mouseDown: function () {
            this.canvas.addEventListener("mousedown", function (e) {
                myCanvas.drawing = true;
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

        signatureClear : function(){
          this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        }


    };
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimaitonFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
var ctx = myCanvas.canvas.getContext("2d");
myCanvas.mouseDown();
myCanvas.mouseUp();
myCanvas.mouseMove();
myCanvas.touchStart();
myCanvas.touchEnd();
myCanvas.touchMove();
myCanvas.drawLoop();
