import Axios from 'axios'

export function historique(myHistory) {
    const urlApi = "https://www.odwb.be/api/records/1.0/search/?dataset=code-postaux-belge&q="

const formCity = document.querySelector(".search-city")
const inputQuery = document.querySelector(".myQuery")
const myNotification = document.querySelector(".notification")

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
            window.refreshList()
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
}