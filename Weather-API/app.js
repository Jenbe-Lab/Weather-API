
//Objet qui represente les conditions meteo pour afficher icones correspondantes

const weatherIcons = {
    
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}



//fonctioj d'appel  a l api

let apiCall = function (city) {

    
    let apiKey = "e187e36a2a7b43bc50816e4d8307de0a";

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e187e36a2a7b43bc50816e4d8307de0a&lang=fr&units=metric`;


//La méthode fetch renvoie une promesse qui sera résolue des que le serveur renvoie les requettes http avant meme qu on ait la reponse
//+ on renvoie la rep,nse au format json+ recuperation des datas

    fetch(url).then(response => response.json().then(data => {

        console.log(data);
        
        
        let ville = data.name;//on recup le nom de la ville
        document.querySelector("#ville").innerHTML = ville;// on inscrit la variable pour afficher les infos dans le html
        document.querySelector("#temperature").innerHTML = Math.round(data.main.temp);//affichage temperature
        //document.querySelector("#temperature").style.color = 'red';
        document.querySelector("#conditions").innerHTML =data.weather[0].description;//affichage de la descriptuon du temps
        document.querySelector("i.wi").className = weatherIcons[data.weather[0].main];//affichage des icones de temps
        
        //Chargement des backgrounds selon le temps
        const conditions =data.weather[0].main;
        document.body.className = conditions.toLowerCase();

     //recuperation de l erreur en cas de plantage   
    })).catch(err => console.log("Erreur:" + err));
    
  
};

// on affiche la ville courante à titre d'exemple
let ville= "Nancy";
apiCall(ville);


// recuperation des données du formulaire
const form = document.querySelector(".app form");

//evenement 
form.addEventListener("submit", e => {
    e.preventDefault();//
    let ville = document.querySelector("#inputCity").value;
  
 //document.querySelector("#ville").style.color = 'red';
    
//fait fonctionner l appel api
    apiCall(ville);
});

