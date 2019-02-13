var mainApp = {

mymap : L.map('mapid').setView([43.275070, 5.379264], 13), // stockage carte dans div avec gestion de la position dans la ville de Rouen
token : "43ca35bbc25b63d176479f8846a2026bb7f0175f",
urlapi : "https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey="+token,

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
{
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZXJ3aW5icmdyIiwiYSI6ImNqbnQ1czl6cTBvYWEzcHBqOXBkMDB2bzcifQ.YfJ2wPJux8VPSoLBbXMgLA'
}).addTo(mymap),


};
