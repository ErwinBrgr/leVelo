var canvasObj = {

//propriétés

canvas : document.getElementById("canvasDiv"),
//context : canvas.getContext("2d"),
canvasWidth : "320px",
//canvasHeight : "220px",
disableSave : true,
pixels : [],
cpixels : [],
xyLast : {},
xyAddLast : {},
calculate : false,

//méthodes
signatureCapture : function()
{
  this.context = canvas.getContext("2d");
  this.canvas.width = 276;
  this.canvas.height = 180;
  this.context.fillStyle = "#fff";
  this.context.strokeStyle = "#444";
  this.context.lineWidth = 1.5;
  this.context.lineCap = "round";
  this.context.fillRect(0, 0, canvas.width, canvas.height);
},


remove_event_listeners : function()
{
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

 on_mousedown : function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.canvas.addEventListener('mouseup', on_mouseup, false);
      this.canvas.addEventListener('mousemove', on_mousemove, false);
      this.canvas.addEventListener('touchend', on_mouseup, false);
      this.canvas.addEventListener('touchmove', on_mousemove, false);
      document.body.addEventListener('mouseup', on_mouseup, false);
      document.body.addEventListener('touchend', on_mouseup, false);

      this.empty = false;
      var xy = get_coords(e);
      this.context.beginPath();
      this.pixels.push('moveStart');
      this.context.moveTo(xy.x, xy.y);
      this.pixels.push(xy.x, xy.y);
      this.xyLast = xy;
    },

on_mousemove : function (e, finish) {
      e.preventDefault();
      e.stopPropagation();

      var xy = get_coords(e);
      var xyAdd = {
        x : (xyLast.x + xy.x) / 2,
        y : (xyLast.y + xy.y) / 2
      };

      if (calculate) {
        var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
        var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
        pixels.push(xLast, yLast);
      } else {
        calculate = true;
      }

      this.context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
      this.pixels.push(xyAdd.x, xyAdd.y);
      this.context.stroke();
      this.context.beginPath();
      this.context.moveTo(xyAdd.x, xyAdd.y);
      this.xyAddLast = xyAdd;
      this.xyLast = xy;

    },
on_mouseup : function(e) {
      remove_event_listeners();
      this.disableSave = false;
      this.context.stroke();
      this.pixels.push('e');
      this.calculate = false;
    },


};//fin objet


  canvasObj.canvas.addEventListener('touchstart', canvasObj.on_mousedown, false);
  canvasObj.canvas.addEventListener('mousedown', canvasObj.on_mousedown, false);
/*
function signatureCapture() {
  //var canvas = document.getElementById("newSignature");
  //var context = canvas.getContext("2d");
  //canvas.width = 276;
  //canvas.height = 180;
  //context.fillStyle = "#fff";
  //context.strokeStyle = "#444";
  //context.lineWidth = 1.5;
  //context.lineCap = "round";
  //context.fillRect(0, 0, canvas.width, canvas.height);
  //var disableSave = true;
  //var pixels = [];
  //var cpixels = [];
  //var xyLast = {};
  //var xyAddLast = {};
  //var calculate = false;
  {   //functions
    //function remove_event_listeners() {
      //canvas.removeEventListener('mousemove', on_mousemove, false);
      //canvas.removeEventListener('mouseup', on_mouseup, false);
      //canvas.removeEventListener('touchmove', on_mousemove, false);
      //canvas.removeEventListener('touchend', on_mouseup, false);

      //document.body.removeEventListener('mouseup', on_mouseup, false);
      //document.body.removeEventListener('touchend', on_mouseup, false);
    //}

  /*  function get_coords(e) {
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
      };*/
    //};
/*
    function on_mousedown(e) {
      e.preventDefault();
      e.stopPropagation();

      canvas.addEventListener('mouseup', on_mouseup, false);
      canvas.addEventListener('mousemove', on_mousemove, false);
      canvas.addEventListener('touchend', on_mouseup, false);
      canvas.addEventListener('touchmove', on_mousemove, false);
      document.body.addEventListener('mouseup', on_mouseup, false);
      document.body.addEventListener('touchend', on_mouseup, false);

      empty = false;
      var xy = get_coords(e);
      context.beginPath();
      pixels.push('moveStart');
      context.moveTo(xy.x, xy.y);
      pixels.push(xy.x, xy.y);
      xyLast = xy;
    };*/
/*
    function on_mousemove(e, finish) {
      e.preventDefault();
      e.stopPropagation();

      var xy = get_coords(e);
      var xyAdd = {
        x : (xyLast.x + xy.x) / 2,
        y : (xyLast.y + xy.y) / 2
      };

      if (calculate) {
        var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
        var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
        pixels.push(xLast, yLast);
      } else {
        calculate = true;
      }

      context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
      pixels.push(xyAdd.x, xyAdd.y);
      context.stroke();
      context.beginPath();
      context.moveTo(xyAdd.x, xyAdd.y);
      xyAddLast = xyAdd;
      xyLast = xy;

    };*/
/*
    function on_mouseup(e) {
      remove_event_listeners();
      disableSave = false;
      context.stroke();
      pixels.push('e');
      calculate = false;
    };
  }
  canvas.addEventListener('touchstart', on_mousedown, false);
  canvas.addEventListener('mousedown', on_mousedown, false);
}

function signatureSave() {
  var canvas = document.getElementById("newSignature");// save canvas image as data url (png format by default)
  var dataURL = canvas.toDataURL("image/png");
  document.getElementById("saveSignature").src = dataURL;
};

function signatureClear() {
  var canvas = document.getElementById("newSignature");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);*/