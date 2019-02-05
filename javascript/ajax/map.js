//var articlesElt = document.getElementById("articles");
var token = "43ca35bbc25b63d176479f8846a2026bb7f0175f";
var urlapi = "https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey="+token ;

ajaxGet(urlapi, function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var stations = JSON.parse(reponse);
    console.log(stations);
    /*articles.forEach(function (article) {
        // Ajout du titre et du contenu de chaque article
        var titreElt = document.createElement("h2");
        titreElt.textContent = article.titre;
        var contenuElt = document.createElement("p");
        contenuElt.textContent = article.contenu;
        articlesElt.appendChild(titreElt);
        articlesElt.appendChild(contenuElt);
    });  */
});
