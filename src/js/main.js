//import {historique} from "/js/history-cities"
import Axios from 'axios'


let myHistory = []

//historique(myHistory)


const urlApi = "https://www.odwb.be/api/records/1.0/search/?dataset=code-postaux-belge&q="

const formCity = document.querySelector(".search-city")
const inputQuery = document.querySelector(".myQuery")
const myNotification = document.querySelector(".notification")
const trashCitiesBtn = document.querySelector(".trash-cities")
const citiesList = document.querySelector(".listCities")
//autocomplete
const keywords = document.querySelector(".keywords")

formCity.addEventListener("submit", (event) => {
    event.preventDefault()
    
    let url = urlApi + inputQuery.value

    Axios.get(url)
    .then(response => {
        console.log(response.data)
        let datas = response.data
        if( datas.nhits > 0 ) {
            console.log(datas)
            let newCity = {
                cp: datas.records[0].fields.column_1,
                city: datas.records[0].fields.column_2
            }
            myHistory.push(newCity)
            localStorage.cities = JSON.stringify(myHistory)
            refreshList()
            console.log(myHistory)
        }
        else {
            myNotification.classList.toggle("hidden")
            setTimeout( () => {
                myNotification.classList.toggle("hidden")
                formCity.reset()
                inputQuery.focus()
            }, 2000)
            
        }
    })
    .catch(error => console.log(error))
})  


trashCitiesBtn.addEventListener("click", (e) => {
    e.preventDefault()
    myHistory = []
    localStorage.removeItem("cities")
    trashCitiesBtn.classList.add("hidden")
    refreshList()
})

if(localStorage.cities) {
    myHistory = JSON.parse(localStorage.cities)
    refreshList()
}




function refreshList() {
    //alert('list')
    citiesList.innerHTML = ''
if(myHistory.length > 0)
 {
    trashCitiesBtn.classList.remove("hidden") 
    myHistory.forEach(city => {
         let template = `<li class="panel-block list-group-item">${city.cp} ${city.city}</li>`
         citiesList.innerHTML += template
     })
 }
}



//autocomplete
if(keywords) {
    console.log(keywords)
keywords.addEventListener("change", (e) => {
    e.preventDefault
    console.log(e.target.value)
    console.log(this.value)
    console.log(keywords.value)
    Axios.get("urlApi"+keywords.value)
    .then(response => {
        console.log(response.data.records)
    })

})
}