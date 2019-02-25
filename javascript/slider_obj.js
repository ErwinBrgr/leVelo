/* ------------------------------------------------------------------------------ */
/* --                           slider                                         -- */
/* ------------------------------------------------------------------------------ */


var Slider = {
    // Define current slide
    currentIndex: 0,
//initialisation des autres méthodes de l'objet
    init: function () {
        Slider.autoSlide();
        Slider.playAutoClick();
        Slider.nextSlideOnClick();
        Slider.prevSlideOnClick();
        Slider.changeSlideOnKeypress();
    },

    // affiche l'image en cours
    activeSlide: function () {
        var slides = $('.mySlides');
        var slide = slides.eq(Slider.currentIndex);
        slides.hide();
        slide.css('display', 'flex');
    },

    // image suivante
    indexPlus: function () {
        var slides = $('.mySlides');
        var slidesNumber = slides.length;
        Slider.currentIndex += 1;
        if (Slider.currentIndex > slidesNumber - 1) {
            Slider.currentIndex = 0;
        }
    },

    // image précédente
    indexMinus: function () {
        var slides = $('.mySlides');
        var slidesNumber = slides.length;
        Slider.currentIndex -= 1;
        if (Slider.currentIndex < 0) {
            Slider.currentIndex = slidesNumber - 1;
        }
    },

    // automatisation du passage des images sur slider
    autoSlide: function () {
        var play = $('.play');
        play.click(function () {
            var timer = setInterval(function () {
                Slider.indexPlus();
                Slider.activeSlide();
            }, 5000);//affichage puis passage slider suivant à intervalle de 5 secs
            var stop = $('.stop');//stockage bouton stop
            stop.click(function () {
                clearInterval(timer);//arrêt de l'interval, donc du slider
            });
        });

    },

    // lecture auto slider
    playAutoClick: function () {
        var play = $('.play'); //stockage pouton en variable
        play.trigger('click');//on déclanche au clic le slider
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
