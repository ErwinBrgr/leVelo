/* ------------------------------------------------------------------------------ */
/* --                            MAP                                           -- */
/* ------------------------------------------------------------------------------ */

var Map = {
//properties
	token : "43ca35bbc25b63d176479f8846a2026bb7f0175f",
	urlapi : "https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=43ca35bbc25b63d176479f8846a2026bb7f0175f",
	latitude : 43.275070,
	longitude : 5.379264,
	zoom : 13,
	mymap : null,




//methods

    //initialisation des méthodes de l'objet
    init : function() {
            this.mapMethod();
            this.getMarkers();
            this.verifStation();
            this.signUpM();
            this.closeB();
            this.validResa();
            this.clearBooking();

    },
    //méthode de récupération de la carte
	mapMethod : function(){
		this.mymap = L.map('mapid').setView([this.latitude, this.longitude], this.zoom);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		    maxZoom: 18,
		    id: 'mapbox.streets',
		    accessToken: 'pk.eyJ1IjoiZXJ3aW5icmdyIiwiYSI6ImNqbnQ1czl6cTBvYWEzcHBqOXBkMDB2bzcifQ.YfJ2wPJux8VPSoLBbXMgLA'
		}).addTo(this.mymap);

	},

    //méthode de récupération des icônes et afficage sur la carte leaflet
	getMarkers : function(){
		ajaxGet(this.urlapi, function (reponse) {
			var stations = JSON.parse(reponse);
    		var LeafIcon = L.Icon.extend({
    		  options: {
        		iconSize:     [50, 50], //taille de l'icône
        		iconAnchor:   [0, 50], //ancrage de l'icône
    			}
			});
			//création de variables pour stackage des 3 différentes icônes (verte, orange, rouge)
            var greenIcon = new LeafIcon({iconUrl: './images/green_icon.png'}),
            redIcon = new LeafIcon({iconUrl: './images/red_icon.png'}),
            orangeIcon = new LeafIcon({iconUrl: './images/orange_icon.png'});

        L.icon = function (options) {
        return new L.Icon(options);
    	};

        Map.markers = new L.MarkerClusterGroup();

        stations.forEach(function (station) {
            var tableau_name = station.name.split("-"); //
            var station_name = tableau_name[1] ;
            var station_status = "Fermée";
            var marker ;
             
            //Choix des markers selons statuts des stations et nombres de vélos présents dans la station
            //Si nb vélo supérieur ou égal à 1 alors on affiche un marker vert et on affiche ouvert en Station Staus
            if ( station.available_bikes >= 1 ) {
                marker = L.marker([station.position.lat, station.position.lng], {icon: greenIcon});
                station_status = "Ouvert"}
            //Si 0 vélo alors on affiche un marker orange    
            else if (station.available_bikes === 0 ) {
                 marker = L.marker([station.position.lat, station.position.lng], {icon: orangeIcon});
                 station_status = "Ouvert"
            }
            //si le statut de la station est "CLOSE" alors on affiche un marker rouge
            else if (station.status = "CLOSE") {
                marker = L.marker([station.position.lat, station.position.lng], {icon: redIcon});
                station_status = "Fermée";
            }
            


            marker.on('click',function(){
                if (station.available_bikes === 0){
                    $("#infoStation").show();
                    $("#nomStation").html(station_name);
                    $("#adresseStation").html(station.address);
                    $("#etatStation").html("<p>réservation impossible</p>");
                    $("#veloDispo").html(station.available_bikes); //affichage de nombre de de vélos disponible
                    $("#attacheDispo").html(station.available_bike_stands);
                    $("#canvas").hide();
                    $("#clearCanvasSimple").hide();

                    } else {
                    $("#infoStation").show(); //affichage div en display none par défault
                    $("#nomStation").html(station_name);
                    $("#adresseStation").html(station.address); //affichage du nom de la station
                    $("#etatStation").html(station_status); //affichage statut open ou close de la station
                    $("#veloDispo").html(station.available_bikes); //affichage de nombre de de vélos disponible
                    $("#attacheDispo").html(station.available_bike_stands);
                    $("#canvas").show();
                    $("#clearCanvasSimple").show()
                     //affichage du nombre d'attache dispo
                }
            });

            Map.markers.addLayer(marker);
        }); //fin for each boucle pour ajout des points sur la carte
Map.mymap.addLayer(Map.markers);//marker clusters



		});// fin fonction ajax get

	},//fin getMarkers

    //méthode de validation de la réservation : validation du nom et prénom + sauvegarde des informations en sessions storage. Lorsque conditions remplies, lancement du décompte
	valid : function(){

        sessionStorage.setItem("nomStation", $("#nomStation").html());
            //déclaration variables reprenant informations nécessaires à la réservation
            var nom = $("#Formnom").val();
            var prenom = $("#Formprenom").val();
            var missNom=$("#missNom");
            var missPrenom = $("#missPrenom");
            var saisieValid = false;
            missNom.hide();
            missPrenom.hide();
                //gestion condition avec prise en compte espace dans le formulaire ->espace considéré comme form vide
                if($.trim(nom) === '' || $.trim(prenom) === '' ){

                    	if($.trim(nom) === ''){
                    		missNom.show();
                        	missNom.text("Nom manquant");
                        	missNom.css('color','red');
                    	}
                    	if ($.trim(prenom) === ''){
                        	missPrenom.show();
                        	missPrenom.text("Prénom manquant");
                        	missPrenom.css('color','red');
                        }

                }else{
                        //si les deux conditions non validées alors le formulaire est ok et la réservation peut se lancer
                        localStorage.setItem("Formprenom", $("#Formprenom").val());
                        localStorage.setItem("Formnom", $("#Formnom").val());
                       $('#selectionStation').html("Votre vélo est réservé à la station "
                        + sessionStorage.getItem("nomStation") + " pour " + localStorage.getItem("Formprenom")
                        +" "
                        + localStorage.getItem("Formnom"));
                        
                         saisieValid = true;
                }


                    return saisieValid;


	}, //fin valid
    //méthode de vérification de réservation pour si reservation en cours ou temps restant, nom station, et utlisateur ayant fait la réservation
    verifStation : function(){
        if(sessionStorage.getItem("nomStation") == null) {
            $("#selectionStation").html("Pas de réservation en cours");
            $("#Formnom").val(localStorage.getItem("Formnom"));
            $("#Formprenom").val(localStorage.getItem("Formprenom"));
        } else {

                $("#Formnom").val(localStorage.getItem("Formnom"));
                $("#Formprenom").val(localStorage.getItem("Formprenom"));
                $("#selectionStation").html("<p>Votre vélo est réservé à la station</p> "
                + sessionStorage.getItem("nomStation")
                +" pour " + localStorage.getItem("Formprenom")
                +" "
                + localStorage.getItem("Formnom"));
                

            CountDownObj.timer(sessionStorage.getItem("distance"));
                $("#cancelBooking").show();
        }

    },

    
    clearBooking : function(){
        var clearB =$("#cancelBooking");
        clearB.click(function(){
            console.log("test");
            sessionStorage.clear();
            localStorage.clear();
            $("#selectionStation").html("Pas de réservation en cours");
            CountDownObj.clearInt();
            Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
            $("#timer").hide();
            $("#clearCanvasSimple").hide()
        });
    },    
    //methode permettant la validation de la signature
    signUpM : function(){
        var sUp = $('#signUp');
        sUp.click(function(){
            $('.hover_bkgr_fricc').show();
        });
    },
    //méthode permettant de fermeture du pop up de réservation
    closeB : function (){
        var closeButton = $('.popupCloseButton');
        closeButton.click(function(){
             $('.hover_bkgr_fricc').hide();
        });
    },
    //methode validation de la réservation
    validResa : function(){
        var validR = $('#valid');
        validR.click(function(){
            if(Map.valid() ){
                 CountDownObj.timer();
                 $("#cancelBooking").show();
                 $("#timer").show();
                 $('.hover_bkgr_fricc').fadeOut(3000, function() {
                                  });

            }
        });
    },

};

$(function() {
    Map.init();//initialisation des méthodes de l'objet
});

