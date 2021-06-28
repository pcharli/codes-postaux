//import {historique} from "/js/history-cities"
import Axios from 'axios'


const keywords = document.querySelector(".keywords")
let serp = document.querySelector(".serp")
let infosVille = document.querySelector(".infos-ville")
const urlApi = "https://www.odwb.be/api/records/1.0/search/?dataset=code-postaux-belge&rows=100&q="
let results = []

//autocomplete
if(keywords) {
    console.log(keywords)
keywords.addEventListener("keyup", (e) => {
    e.preventDefault
    //console.log("target"+ e.target.value)
    if(e.target.value.length > 1) {
    //console.log("this"+this.value)
    //console.log("keywords"+keywords.value)
    Axios.get(urlApi+keywords.value)
    .then(response => {
        serp.innerHTML = ''
        serp.classList.remove("hidden")
        results = response.data.records
        for (let i = 0; i < results.length; i++) {
            let dataVille = results[i].fields
             serp.innerHTML += `<li data-id="${i}" class="list-item serp-item">${dataVille.column_1} ${dataVille.column_2}</li>`
        }
       
    })
    }//if
    else {
        serp.classList.add("hidden")
    }
})
}

serp.addEventListener("click", (e) => {
    e.preventDefault()
    let idVille = e.target.dataset.id
    console.log( results[idVille] )
    let theCity = results[idVille].fields
    serp.classList.add("hidden")

    let template = `
        <h2 class="nom_ville">${theCity.column_1} ${theCity.column_2}</h2>
        <dl>
            <dt>Longitude</dt>
            <dd class="longitude">${theCity.column_3}</dd>
            <dt>Latitude</dt>
            <dd class="latitude">${theCity.column_4}</dd>
        </dl>
    `
    infosVille.innerHTML = template
    infosVille.classList.remove("hidden")
})