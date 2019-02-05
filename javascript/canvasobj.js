var canvasObj = {

	//propriétés

	canvasWidth : "320px", //définition largeur
	canvasHeight : "220px", //définition hauteur canvas
	canvasDiv : document.getElementById('canvasDiv'), //Récupération de l'élément "canvasDiv" dans la variable
	canvas : document.createElement('canvas'), //création d'un élement canvas dans le document
	clickX : new Array(),
	clickY : new Array(),
	clickDrag : new Array(),
  pixels : [],
  cpixels : [],
  xyLast : {},
  xyAddLast : {},
  xyAdd:{},
  calculate : {},

//Méthode de l'objet


	addClick : function(x, y, dragging) //Fonction gérant les clique sur axe x et y + click & drag
	{
		  this.clickX.push(x);
  		this.clickY.push(y);
  		this.clickDrag.push(dragging);
	},


	redraw : function() // gestion du style de trait
	{
		  this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
  		this.context.strokeStyle = "#000000"; //couleur
  		this.context.lineJoin = "round"; // "style du trait"
  		this.context.lineWidth = 5; // épaisseur du trait


  		for(var i=0; i < this.clickX.length; i++) {
   			this.context.beginPath();
		    if(this.clickDrag[i] && i){
		      this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
		     }else{
		      this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
		     }
		     this.context.lineTo(this.clickX[i], this.clickY[i]);
		     this.context.closePath();
		     this.context.stroke();
  		}

	},

      remove_event_listeners: function() {
      this.canvas.removeEventListener('mousemove', on_mousemove, false);
      this.canvas.removeEventListener('mouseup', on_mouseup, false);
      this.canvas.removeEventListener('touchmove', on_mousemove, false);
      this.canvas.removeEventListener('touchend', on_mouseup, false);
      document.body.removeEventListener('mouseup', on_mouseup, false);
      document.body.removeEventListener('touchend', on_mouseup, false);
    },


      get_coords : function(e) {
      var x, y;

      if (e.changedTouches && e.changedTouches[0]) {
        var offsety = canvas.offsetTop || 0;
        var offsetx = canvas.offsetLeft || 0;

        x = e.changedTouches[0].pageX - offsetx;
        y = e.changedTouches[0].pageY - offsety;
      } else if (e.layerX || 0 == e.layerX) {
        x = e.layerX;
        y = e.layerY;
      } else if (e.offsetX || 0 == e.offsetX) {
        x = e.offsetX;
        y = e.offsetY;
      }

      return {
        x : x, y : y
      };
    },




};
canvasObj.context = canvasObj.canvas.getContext("2d");
var paint;
canvasObj.canvas.setAttribute('width',canvasObj.canvasWidth);
canvasObj.canvas.setAttribute('height', canvasObj.canvasHeight);
canvasObj.canvas.setAttribute('id', 'canvas');
canvasObj.canvasDiv.appendChild(canvasObj.canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}

function on_mousedown(e) {
      e.preventDefault();
      e.stopPropagation();

      canvasObj.canvas.addEventListener('mouseup', on_mouseup, false);
      canvasObj.canvas.addEventListener('mousemove', on_mousemove, false);
      canvasObj.canvas.addEventListener('touchend', on_mouseup, false);
      canvasObj.canvas.addEventListener('touchmove', on_mousemove, false);
      document.body.addEventListener('mouseup', on_mouseup, false);
      document.body.addEventListener('touchend', on_mouseup, false);

      empty = false;
      var xy = canvasObj.get_coords(e);
      var xy = canvasObj.get_coords(e);
      canvasObj.context.beginPath();
      canvasObj.pixels.push('moveStart');
      canvasObj.context.moveTo(xy.x, xy.y);
      canvasObj.pixels.push(xy.x, xy.y);
      canvasObj.xyLast = xy;
    };

    function on_mousemove(e, finish) {
      e.preventDefault();
      e.stopPropagation();

      var xy = canvasObj.get_coords(e);
      var xyAdd = {
        x : (canvasObj.xyLast.x + xy.x) / 2,
        y : (canvasObj.xyLast.y + xy.y) / 2
      };

      if (canvasObj.calculate) {
        canvasObj.xLast = (canvasObj.xyAddLast.x + canvasObj.xyLast.x + canvasObj.xyAdd.x) / 3;
        canvasObj.yLast = (canvasObj.xyAddLast.y + canvasObj.xyLast.y + canvasObj.xyAdd.y) / 3;
        canvasObj.pixels.push(canvasObj.xLast,canvasObj.yLast);
      } else {
        canvasObj.calculate = true;
      }

      canvasObj.context.quadraticCurveTo(canvasObj.xyLast.x, canvasObj.xyLast.y, canvasObj.xyAdd.x, canvasObj.xyAdd.y);
      canvasObj.pixels.push(canvasObj.xyAdd.x,canvasObj.xyAdd.y);
      canvasObj.context.stroke();
      canvasObj.context.beginPath();
      canvasObj.context.moveTo(canvasObj.xyAdd.x, canvasObj.xyAdd.y);
      canvasObj.xyAddLast = xyAdd;
      canvasObj.xyLast = xy;

    };

    function on_mouseup(e) {
      canvasObj.remove_event_listeners();
      disableSave = false;
      canvasObj.context.stroke();
      canvasObj.pixels.push('e');
      canvasObj.calculate = false;
    };
  


//gestion de l'évènement mousedown (clique de souris)
$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  canvasObj.paint = true;
  canvasObj.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  canvasObj.redraw();
});

$('#canvas').mousemove(function(e){
  if(canvasObj.paint){
    canvasObj.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    canvasObj.redraw();
  }
});

$('#canvas').mouseup(function(e){
  canvasObj.paint = false;
});

$('#canvas').mouseleave(function(e){
  canvasObj.paint = false;
});
  

  canvasObj.canvas.addEventListener('touchstart', on_mousedown, false);
  canvasObj.canvas.addEventListener('mousedown', on_mousedown, false);




$('#clearCanvasSimple').mousedown(function(e)
  {
    canvasObj.clickX = new Array();
    canvasObj.clickY = new Array();
    canvasObj.clickDrag = new Array();
    canvasObj.redraw();
    document.getElementById('signUp').style.display = "none";
});





   $('#canvas').on('click', function(){
        document.getElementById('signUp').style.display = "block";
        });