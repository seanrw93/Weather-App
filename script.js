const API_KEY = "377c1ae11d8418a63fe707e7746fd365"
const API_URL = "https://api.openweathermap.org/data/2.5/forecast?q="

const searchBtn = document.querySelector(".search button")
const searchBar = document.querySelector(".search input")

const getWeather = city => {
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

        //Setting the dates and weather icons for the next 3 days
        const icons = document.querySelectorAll(".weather-icon")
        icons.forEach((icon, index) => {
            
            const nextDayIndex = json.list.findIndex(item => {
                        const itemDateTime = new Date(item.dt_txt)
                        const nextDay = new Date(currentDate.getTime())
                        nextDay.setDate(currentDate.getDate() + (index + 1))
                        nextDay.setHours(15, 0, 0, 0)
                
                        return itemDateTime.getTime() === nextDay.getTime()   
                    })
            
            switch (icon.id) {
                case "today0": {
                    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@4x.png">`
                    break;
                }
                case "today1": 
                    if (tomorrowMiddayIndex !== -1) {
                        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[nextDayIndex].weather[0].icon}@2x.png">
                                          <p class="day1">${currentDate.getDate() + 1}/${currentDate.getMonth() + 1}</p>`
                    }
                    break;
                }
                case "today2":                   
                    if (tomorrowMiddayIndex !== -1) {
                        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[nextDayIndex].weather[0].icon}@2x.png">
                                          <p class="day2">${currentDate.getDate() + 2}/${currentDate.getMonth() + 1}</p>`
                    }
                    break;
                }  
                case "today3": 
                    if (tomorrowMiddayIndex !== -1) {
                        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[nextDayIndex].weather[0].icon}@2x.png">
                                          <p class="day3">${currentDate.getDate() + 3}/${currentDate.getMonth() + 1}</p>`
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
