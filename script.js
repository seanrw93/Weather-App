const API_KEY = "377c1ae11d8418a63fe707e7746fd365"
const API_URL = "https://api.openweathermap.org/data/2.5/forecast?q="

const searchBtn = document.querySelector(".search button")
const searchBar = document.querySelector(".search input")

const getWeather = (city) => {
    fetch(API_URL + city + `&appid=${API_KEY}` + `&units=metric`)
    .then(response => response.json())
    .then(json => {
        displayWeather(json)
        console.log(json)
    })
}

const displayWeather = json => {
    let currentDate = new Date()

        //Written information
        document.querySelector(".city h1").innerHTML = `${json.city.name.replace("Arrondissement de ", "")}, ${json.city.country}`
        document.querySelector(".date").innerHTML = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
        document.querySelector(".temp").innerHTML = Math.round(json.list[0].main.temp) + "°C"
        document.querySelector(".condition").innerHTML = (json.list[0].weather[0].description).charAt(0).toUpperCase() + (json.list[0].weather[0].description).slice(1)
        document.querySelector(".wind").innerHTML = (json.list[0].wind.speed).toFixed(1) + " km/h"
        
        //Dates for the next 3 days
        const divCount = 3 
        for (let i = 0; i < divCount; i++) {
            let newDate = new Date(currentDate.getTime())
            newDate.setDate(newDate.getDate() + i)
            
            document.getElementsByClassName('day' + (i + 1)).innerHTML = `${newDate.getDate() + 1}/${newDate.getMonth() + 1}`
        }

        //Setting the weather icons for the next 3 days
        const icons = document.querySelectorAll(".weather-icon")
        icons.forEach(icon => {
            switch (icon.id) {
                case "today0": {
                    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@4x.png">`
                    break;
                }
                case "today1": {
                    const tomorrowMiddayIndex = json.list.findIndex(item => {
                        const itemDateTime = new Date(item.dt_txt)
                        const tomorrowMidday = new Date(currentDate.getTime())
                        tomorrowMidday.setDate(currentDate.getDate() + 1)
                        tomorrowMidday.setHours(15, 0, 0, 0)
                
                        return itemDateTime.getTime() === tomorrowMidday.getTime()   
                    })
                    console.log(tomorrowMiddayIndex)
                    if (tomorrowMiddayIndex !== -1) {
                        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[tomorrowMiddayIndex].weather[0].icon}@2x.png">
                                          <p class="day1">${currentDate.getDate() + 1}/${currentDate.getMonth() + 1}</p>`
                    }
                    break;
                }
                case "today2": {
                    const tomorrowMiddayIndex = json.list.findIndex(item => {
                        const itemDateTime = new Date(item.dt_txt)
                        const tomorrowMidday = new Date(currentDate.getTime())
                        tomorrowMidday.setDate(currentDate.getDate() + 2)
                        tomorrowMidday.setHours(15, 0, 0, 0)
                
                        return itemDateTime.getTime() === tomorrowMidday.getTime()   
                    })
                    console.log(tomorrowMiddayIndex)
                    if (tomorrowMiddayIndex !== -1) {
                        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[tomorrowMiddayIndex].weather[0].icon}@2x.png">
                                          <p class="day1">${currentDate.getDate() + 2}/${currentDate.getMonth() + 1}</p>`
                    }
                    break;
                }  
                case "today3": {
                    const tomorrowMiddayIndex = json.list.findIndex(item => {
                        const itemDateTime = new Date(item.dt_txt)
                        const tomorrowMidday = new Date(currentDate.getTime())
                        tomorrowMidday.setDate(currentDate.getDate() + 3)
                        tomorrowMidday.setHours(15, 0, 0, 0)
                
                        return itemDateTime.getTime() === tomorrowMidday.getTime()   
                    })
                    console.log(tomorrowMiddayIndex)
                    if (tomorrowMiddayIndex !== -1) {
                        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[tomorrowMiddayIndex].weather[0].icon}@2x.png">
                                          <p class="day1">${currentDate.getDate() + 3}/${currentDate.getMonth() + 1}</p>`
                    }
                    break;
                }
            }
        })
        document.querySelector(".weather").style.display = "flex"
        document.querySelector(".error").style.display = "none"
}


searchBtn.addEventListener("click", () => {
    getWeather(searchBar.value)
})
searchBar.addEventListener("keyup", e => {
    if(e.key === "Enter") {
        searchBtn.click()
    }
})
