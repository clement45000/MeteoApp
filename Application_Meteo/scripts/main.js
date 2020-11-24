// import tabJoursEnOrdre from './gestionTemps.js';
// console.log(tabJoursEnOrdre);

const CLEFAPI = '2dc634771154f4005d06dc9ef2c297e9';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imageIcone = document.querySelectorAll('.logo-meteo');

console.log(tempJoursDiv);
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
    //    console.log(position);
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    appelApi(long,lat);
    }, () => {
        alert(`Vous avez refuser la geolocalisation, l'application ne peut pas fonctionner, veuillez
        l'activer`);
    })
}

function appelApi(long,lat){
    // fetch retourne une promesse 
    //
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) =>{
        resultatsAPI  = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
        localisation.innerText = resultatsAPI.timezone;
        //console.log(heure);

        let heureActuelle = new Date().getHours();
        console.log(heureActuelle);
        for(let i = 0; i < heure.length; i++){

            let heureIncr = heureActuelle + i * 3;
            console.log(heureIncr);

            if(heureIncr > 24){
                   heure[i].innerText = `${heureIncr - 24}h`;
            }else if(heureIncr === 24){
                heure[i].innerText = "0h"
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }
            
        }

        //temps toutes les 3 heure
        for(let j = 0; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j*3].temp)}°`
        }

        //Trois première lettres des tabJoursEnOrdre
       for(let k = 0; k < tabJoursEnOrdre.length; k++){
           joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
       }

       //temps par jour
       for(let m = 0; m < 7; m++){
        tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
       }

       //logo image temps
       if(heureActuelle >= 6 && heureActuelle <21){
           imageIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
       }else {
          imageIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
       }
    })
}