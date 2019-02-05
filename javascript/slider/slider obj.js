var Slider = {
	//Propriétés
	slideIndex : 1,

	//Methodes

	plusDivs : function(n) {
		this.showDivs(this.slideIndex += n)
	},

	showDivs : function(n) {
		var i;
    	var x = $(".mySlides");
    	if (n > x.length) {this.slideIndex = 1}
    	if (n < 1) {this.slideIndex = x.length} ;
    	/*for (i = 0; i < x.length; i++) {
        	x[i].style.display = "none";
    	} */
        x.css("display", "none");


    			//x[this.slideIndex-1].style.display = "block";
                x.eq(this.slideIndex-1).css("display", "block");
	},

    infosClavier : function(e){
            if (e.keyCode === 39) {Slider.plusDivs(1)} // Droite
            if (e.keyCode === 37) {Slider.plusDivs(-1)};// Gauche
    },

};

// A $( document ).ready() block.
$( document ).ready(function() {
    Slider.showDivs();
});


$("#button_left").on('click', function(){
    Slider.plusDivs(-1);
});

$("#button_right").on('click', function(){
    Slider.plusDivs(1);
});

$( document ).on('keydown', function(e){
    Slider.infosClavier(e);
})

