var Map = {
//properties	
	token : "43ca35bbc25b63d176479f8846a2026bb7f0175f",
	urlapi : "https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=43ca35bbc25b63d176479f8846a2026bb7f0175f",
	latitude : 43.275070,
	longitude : 5.379264,
	zoom : 13,


//methods

	mapMethod : function(){
		var mymap = L.map('mapid').setView([this.latitude, this.longitude], this.zoom);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		    maxZoom: 18,
		    id: 'mapbox.streets',
		    accessToken: 'pk.eyJ1IjoiZXJ3aW5icmdyIiwiYSI6ImNqbnQ1czl6cTBvYWEzcHBqOXBkMDB2bzcifQ.YfJ2wPJux8VPSoLBbXMgLA'
		}).addTo(mymap);

	},


	getMarkers : function(){
		ajaxGet(this.urlapi, function (reponse) {
			var stations = JSON.parse(reponse);
    		console.log(stations);
    		var LeafIcon = L.Icon.extend({
    		options: {
        		iconSize:     [50, 50], //taille de l'icône
        		shadowSize:   [50, 64], //ombre porté (à suppr pdt test)
        		iconAnchor:   [0, 50], //ancrage de l'icône
        		shadowAnchor: [4, 62],//ancrage de l'ombre (à suppr pdt test)
        		popupAnchor:  [10, 10] //gestion pop plus d'actualité, à supprim après test
    			}
			});
			//création de variables pour stackage des 3 différentes icônes (verte, orange, rouge)
    var greenIcon = new LeafIcon({iconUrl: './images/green_icon.png'}),
    redIcon = new LeafIcon({iconUrl: './images/red_icon.png'}),
    orangeIcon = new LeafIcon({iconUrl: './images/orange_icon.png'});

    L.icon = function (options) {
    return new L.Icon(options);
	};

    var markers = new L.MarkerClusterGroup();

    stations.forEach(function (station) {
    	var tableau_name = station.name.split("-"); //
          	var station_name = tableau_name[1] ;
          	var station_status = "Fermée";
         //Choix des markers selons statuts des stations et nombres de vélos présents dans la station



            //condition pour couleur du marker. si nb vélo sup à 5 afichage du markeur en vert
        if (station.available_bikes >= 5) {
        var marker =L.marker([station.position.lat, station.position.lng], {icon: greenIcon});
        station_status = "Ouvert"} //idement mais affichage en orange
        else if(station.status = "OPEN" && station.available_bikes <= 4 ) {
        var marker =L.marker([station.position.lat, station.position.lng], {icon: orangeIcon});
        station_status = "Ouvert"}else if (station.available_bikes === 0) { //si 0 marker eu rouge
        var marker =L.marker([station.position.lat, station.position.lng], {icon: redIcon});
        }
        else { //si aucune conditon remplie : rouge
        var marker =L.marker([station.position.lat, station.position.lng], {icon: redIcon});
        };



        markers.addLayer(marker);

    }); //fin for each boucle pour ajout des points sur la carte
	Map.mapMethod().mymap.addLayer(markers);
		});//méthode ajax get

	},//fin méthode récup

		displaysM : function(){
			displayPanel1 = function(){
        		$("#mapid").width("70%"); //changement de la largeur de carte pour 70% de la taille de la page
		        $("#infoStation").show(); //affichage div en display none par défault
		        $("#nomStation").html(station_name);
		        $("#adresseStation").html(station.address); //affichage du nom de la station
		        $("#etatStation").html(station_status); //affichage statut open ou close de la station
		        $("#veloDispo").html(station.available_bikes); //affichage de nombre de de vélos disponible
		        $("#attacheDispo").html(station.available_bike_stands); //affichage du nombre d'attache dispo

        		};

        	displayPanel2 = function(){
		        $("#mapid").hide(); //changement de la largeur de carte pour 70% de la taille de la page
		        $("#infoStation").show(); //affichage div en display none par défault
		        $("#nomStation").html(station_name);
		        $("#etatStation").html(station_status); //affichage statut open ou close de la station
		        $("#veloDispo").html(station.available_bikes); //affichage de nombre de de vélos disponible
		        };	

		  resizePage = function(){
        		var Largeur = $(window).width();
            	if(Largeur < 1024) {
            		marker.on('click', displayPanel2);
            		}else{
            		marker.on('click', displayPanel1); //gestion du click sur le marker pour affichage des informations (via fonction display)
            		}
			};

		   $(window).resize(resizePage);
			resizePage(); // Appel de la fonction à l'affichage de la page.
     
		},

		valid : function(){
$(function() {
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
                sessionStorage.setItem("Formprenom", $("#Formprenom").val());
                sessionStorage.setItem("Formnom", $("#Formnom").val());

               $('#selectionStation').html("Réservation à la station "
                + sessionStorage.getItem("nomStation") + " pour " + sessionStorage.getItem("Formprenom")
                +" "
                + sessionStorage.getItem("Formnom"));
 				CountDownObj.timer(sessionStorage.getItem("distance"));
                 saisieValid = true;
            	}


            return saisieValid;
        });

	}, //fin2	

};

Map.mapMethod();
Map.getMarkers();

