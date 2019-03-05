/* ------------------------------------------------------------------------------ */
/* --                          Compte à rebours                                -- */
/* ------------------------------------------------------------------------------ */



var Canvas = {
    // Attributs de référencement du contexte canvas et 2dcanvas
    canvas : "",
    ctx : "",
    // Attributs pour garder la trace de la position de la souris et de l'état du bouton gauche
    mouseX : 0,
    mouseY : 0,
    mouseDown : 0,
    // garde la trace de l’ancienne / dernière position lorsqu’on trace une ligne
    lastX : -1,// On le met à -1 au début pour indiquer que nous n'avons pas encore de valeur
    lastY : -1,// On le met à -1 au début pour indiquer que nous n'avons pas encore de valeur
    // Attributs pour garder la trace de la position tactile
    touchX : 0,
    touchY : 0,
    lineThickness : 4, //Epaisseur du trait
    clearCanvas : document.getElementById("clearCanvasSimple"),
    buttonValider : document.getElementById("signUp"),

    //Méthode d'initialisation et configuration du Canvas
    init : function() {
        this.canvas = document.getElementById("newSignature");// Récupère l'élément canvas spécifique du document HTML
        if (this.canvas.getContext) // Si le navigateur prend en charge la balise canvas, ctx 2d sur toile canvas
            this.ctx = Canvas.canvas.getContext("2d");
        // Vérifie que nous avons un contexte valide pour dessiner sur / avec avant d'ajouter des gestionnaires d'événement
        if (this.ctx) {
            // Réagir aux événements de la souris sur la toile, et mouseup sur l'ensemble du document
            Canvas.canvas.addEventListener("mousedown", Canvas.sketchpad_mouseDown, false);
            Canvas.canvas.addEventListener("mousemove", Canvas.sketchpad_mouseMove, false);
            window.addEventListener("mouseup", Canvas.sketchpad_mouseUp, false);
            // Réagir pour toucher les événements sur la toile
            Canvas.canvas.addEventListener("touchstart", Canvas.sketchpad_touchstart, false);
            Canvas.canvas.addEventListener("touchmove", Canvas.sketchpad_touchMove, false);
            Canvas.canvas.addEventListener('touchend', Canvas.sketchpad_touchEnd, false);
        }
    },

    //Méthode de dessin sur le canvas en passant le context les position xy et taille du point
    dessinLigne : function(ctx,x,y,size) {
        // Si lastX n'est pas défini, définissez lastX et lastY sur la position actuelle
        if (Canvas.lastX==-1) {
            Canvas.lastX=x;
	    Canvas.lastY=y;
        }
        r=0; g=0; b=0; a=255; //couleur noir pour le trait défini ici
        ctx.strokeStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";// Style de remplissage avec couleur défini dans les var plus haut
        ctx.lineCap = "round";// Défini le style "rond" pour en faire un point
        ctx.beginPath();// Dessine une ligne remplie
	    ctx.moveTo(Canvas.lastX,Canvas.lastY);  // Ancienne position du point
	    ctx.lineTo(x,y);// Dessine maintenant une ligne à la position actuelle du pointeur / contact
        ctx.lineWidth = size;// Défini l'épaisseur du trait et tracer la ligne
        ctx.stroke();
        ctx.closePath(); //arrêt du dessin
        // Mettre à jour la dernière position pour référencer la position actuelle
	    Canvas.lastX=x;
	    Canvas.lastY=y;
    },
    // Methode d'appel à dessinLigne lorsque le bouton de la souris est en bas.
    sketchpad_mouseDown : function() {
        Canvas.mouseDown=1;
        Canvas.dessinLigne(Canvas.ctx,Canvas.mouseX,Canvas.mouseY,Canvas.lineThickness);
    },
    // Méthode de conservation de la position de la souris
    sketchpad_mouseUp : function() {
        Canvas.mouseDown=0;
        Canvas.lastX=-1;
        Canvas.lastY=-1;
    },
     sketchpad_touchEnd : function() {
         // Methode de réinitialisation axes X et Y. L'écran n'est plus préssé, donc fin du dessin
         Canvas.lastX=-1;
         Canvas.lastY=-1;
    },
    // Methode de dessins tactile. empêche le défilement par défaut lorsque le mouvement tactile est détecté
    sketchpad_mouseMove(e) {
        // Mettre à jour les coordonnées de la souris lorsqu'il est déplacé
        Canvas.getMousePos(e);
        // Dessine un point si le bouton de la souris est pressé
        if (Canvas.mouseDown==1){
            Canvas.dessinLigne(Canvas.ctx,Canvas.mouseX,Canvas.mouseY,Canvas.lineThickness);
            Canvas.buttonValider.style.display = 'inline-block';
        }
    },
    // Récupère la position actuelle de la souris par rapport à la partie supérieure gauche de la toile
    getMousePos : function(e) {
        if (!e)
            var e = event;
        if (e.offsetX) {
            Canvas.mouseX = e.offsetX;
            Canvas.mouseY = e.offsetY;
        }
        else if (e.layerX) {
            Canvas.mouseX = e.layerX;
            Canvas.mouseY = e.layerY;
        }
    },
    // Dessine quelque chose quand un démarrage tactile est détecté
    sketchpad_touchstart : function() {
        // Mettre à jour les coordonnées tactiles
        Canvas.getTouchPos();
        Canvas.buttonValider.style.display = 'inline-block'
        // Empêche le déclenchement d'un événement mousedown supplémentaire
        Canvas.dessinLigne(Canvas.ctx,Canvas.touchX,Canvas.touchY,Canvas.lineThickness);
        event.preventDefault();
    },
    // Dessine quelque chose et empêche le défilement par défaut lorsque le mouvement tactile est détecté
    sketchpad_touchMove : function(e) {
        // Mettre à jour les coordonnées tactiles
        Canvas.getTouchPos(e);
        // Lors d'un événement touchmove, contrairement à un événement mousemove, il n'est pas nécessaire de vérifier si le toucher est activé, car il y aura toujours un contact avec l'écran par définition
        Canvas.dessinLigne(Canvas.ctx,Canvas.touchX,Canvas.touchY,Canvas.lineThickness);
        // Empêche le déclenchement d'un événement mousedown supplémentaire
        event.preventDefault();
    },
    // Obtenir la position tactile par rapport à la partie supérieure gauche de la toile
    // Quand nous obtenons les valeurs brutes de pageX et pageY ci-dessous, ils prennent en compte le défilement sur la page
    // mais pas la position relative à notre div cible. Nous allons les ajuster en utilisant "target.offsetLeft" et
    // "target.offsetTop" pour obtenir les bonnes valeurs par rapport à la partie supérieure gauche du canevas.
    getTouchPos : function(e) {
        if(!e)
            var e = event;
        if(e.touches) {
            if (e.touches.length == 1) { // Ne traite qu'avec un doigt
                var touch = e.touches[0];// Récupère les informations pour le doigt # 1
                Canvas.touchX=touch.pageX-touch.target.offsetLeft;
                Canvas.touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    },
};
// Efface le contexte du canevas en utilisant la largeur et la hauteur du canevas
    Canvas.clearCanvas.addEventListener("click", function() {
    Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
    Canvas.buttonValider.style.display = 'none';
})

Canvas.init();





