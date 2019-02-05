var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}

//Gestion des évènements au clic sur les "buttons left & right"

document.getElementById("button_left").addEventListener("click", function() {
    plusDivs(-1); //Affiche image gauche
  }, false);

document.getElementById("button_right").addEventListener("click", function() {
    plusDivs(1); //Affiche image droite
  }, false);

function infosClavier(e) { //Gestion des évènements claviers

    if (e.keyCode === 39) {plusDivs(1)} // Droite
    if (e.keyCode === 37) {plusDivs(-1)};// Gauche
}

// Gestion de l'appui et du relâchement d'une touche du clavier
document.addEventListener("keydown", infosClavier);

//Gestion des objets

