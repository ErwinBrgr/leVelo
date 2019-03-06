/* ------------------------------------------------------------------------------ */
/* --                          Compte à rebours                                -- */
/* ------------------------------------------------------------------------------ */



var CountDownObj  = {
	//properties
	countDownDate : 0,
	distance:0,
	interval : null,
	//methods
//Méthode permettant de la définition de la distance étant la différence entre la date du jour et l'instant T
	
	ct : function(){
		if (sessionStorage.getItem("nomStation")!==null) {
			sessionStorage.setItem("distance", CountDownObj.distance);
		}else{
			sessionStorage.removeItem("distance");
			clearInterval(CountDownObj.interval);
		}
		
		var now = new Date().getTime(); //stockage de la date du jour en variable
		CountDownObj.distance = CountDownObj.countDownDate  - now ;//définition de la distance
		var minutes = Math.floor((CountDownObj.distance % (1000 * 60 * 60)) / (1000 * 60)); //conversion des millisecond en minutes
		var seconds = Math.floor((CountDownObj.distance % (1000 * 60)) / 1000);//conversion en secondes
		document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s "; //affichage minutes et secondes
		

		if (CountDownObj.distance < 0) {
            clearInterval(CountDownObj.interval);
            sessionStorage.clear();
            document.getElementById("timer").innerHTML = "Réservation non valide"; //gestion en cas de session expiré
        }

	},
//cette méthode initialise le timer avec un interval de 1 secs (1000 millisecondes)
	timer : function(distance = 1200000 ){ //mise en parametre de 20 mins en millisecondes d
		CountDownObj.distance = distance;
		CountDownObj.countDownDate = new Date().getTime() + parseInt(distance); // date du jour + 20mins 
		setInterval(CountDownObj.ct,1000);//définition de l'interval 1000 millisecondes pour 1sec

	},

	clearInt : function(){
		 clearInterval(this.interval);
		 
	}
};

//déclanchement du timer au clic
$('#valid').on('click', function(){
    CountDownObj.timer();
});
