/* ------------------------------------------------------------------------------ */
/* --                           slider                                         -- */
/* ------------------------------------------------------------------------------ */


var Slider = {
    // Define current slide
    currentIndex: 0,
//initialisation méthodes de l'objet Slider
    init: function () {
        Slider.autoSlide();
        Slider.playAutoClick();
        Slider.nextSlideOnClick();
        Slider.prevSlideOnClick();
        Slider.changeSlideOnKeypress();
    },


//***Méthodes de fonctionnement du slider***//
    // Méthode d'initialisation des images du slider
    activeSlide: function () {
        var slides = $('.mySlides'); //stockage en variable des images en class .mySlides
        var slide = slides.eq(Slider.currentIndex);//selection l'élément et le stock
        slides.hide();//Permets de cacher les images du DOM
        slide.css('display', 'flex');//disposition des images les unes à coté des autres
    },

    // Méthode permettant de passer à l'image suivante
    indexPlus: function () {
        var slides = $('.mySlides');//stoacke des images
        var slidesNumber = slides.length; 
        Slider.currentIndex += 1; //on ajoute 1 à curentIndex
        if (Slider.currentIndex > slidesNumber - 1) {
            Slider.currentIndex = 0;
        }
    },

    // image précédente
    indexMinus: function () {
        var slides = $('.mySlides');
        var slidesNumber = slides.length; //stockage en variable de la longueur d'image. Une image = 1
        Slider.currentIndex -= 1;
        if (Slider.currentIndex < 0) { //si inférieure à 0
            Slider.currentIndex = slidesNumber - 1; // alors soustrait 1 à slidenumber
        }
    },

    // automatisation du passage des images sur slider
    autoSlide: function () {
        var play = $('.play'); //stockage en variable le bouton play
        play.click(function () { //au clic
            var timer = setInterval(function () { //stockage en variable d'une fonction activant l'activeSlide pour initialisation du slider en ajoutant 1 image (indexPlus)
                Slider.indexPlus(); //ajoute 1 à l'image
                Slider.activeSlide();//initialisation du slider
            }, 5000);//affichage puis passage slider suivant à intervalle de 5 secs
            var stop = $('.stop');//stockage bouton stop
            stop.click(function () {//au click
                clearInterval(timer);//arrêt de l'interval, donc du slider
            });
        });

    },


    //***Méthodes de contrôles du Slider***//     

    //Méthode pour activation lecture automatique du slider
    playAutoClick: function () {
        var play = $('.play'); //stockage pouton en variable
        play.trigger('click');//déclenchement sans l'utilisateur
    },

    // controle au clic pour boutou suivant
    nextSlideOnClick: function () {
        var next = $('#button_right');
        next.click(function () {
            Slider.indexPlus();
            Slider.activeSlide();
        });
    },

    // controle au clic pour pouton précédent
    prevSlideOnClick: function () {
        var prev = $('#button_left');
        prev.click(function () {
            Slider.indexMinus();
            Slider.activeSlide();
        });
    },

    // controle aux touches du clavier
    changeSlideOnKeypress: function () {
        $('body').keydown(function (e) {
            if (e.which === 39) {
                Slider.indexPlus();
                Slider.activeSlide();
            } else if (e.which === 37) {
                Slider.indexMinus();
                Slider.activeSlide();
            }
        })
    },
}


$(function () {
    Slider.init(); //appel à l'initialisation du slider
});
