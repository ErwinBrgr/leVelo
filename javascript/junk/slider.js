var Slider = {
	slideIndex : 0,
	int : 0 ,

	carousel : function(){
		var i;
  		var x = $(".mySlides");
  		for (i = 0; i < x.length; i++) {
    		x[i].style.display = "none";
  		}
  		Slider.slideIndex++;
  		if (Slider.slideIndex > x.length) {Slider.slideIndex = 1}
  		x[Slider.slideIndex-1].style.display = "block";
  		 // Change image every 2 seconds
	},

	int : function(){
		setInterval(this.carousel,1000);	
	},

	stop : function(){
		clearInterval(Slider.slideIndex);
	},

};

 $(".trigger_popup_slider").click(function(){
       $('.hover_bkgr_slider').show();
       Slider.int();

    });
    $('.popupCloseButton_slider').click(function(){
        $('.hover_bkgr_slider').hide();
        //Slider.carousel();
    });

$("#button_left").on("click",function(){
	window.clearInterval(Slider.interval);
	console.log(Slider.slideIndex);
});
