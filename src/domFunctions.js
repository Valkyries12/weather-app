import { kelvinToCelsius } from './utils'

function setWeatherDescription (data) {
  const weatherDescription = document.querySelector('.main-weather__description')
  weatherDescription.textContent = data.weather[0].description
}

function setCityName (data) {
  const cityName = document.querySelector('.main-weather__city-name')
  cityName.textContent = data.name
}

function setTime () {
  const time = document.querySelector('.main-weather__time')
  const current = new Date()
  const date = current.toDateString()
  const hour = current.getHours()
  const minutes = current.getMinutes()
  const timeAMPM = hour > 12 ? 'PM' : 'AM'
  time.textContent = `${date}  ${hour}:${minutes} ${timeAMPM} `
}

function setMainTemp (data) {
  const mainTemp = document.querySelector('.main-weather__temp')
  const temp = parseInt(kelvinToCelsius(data.main.temp))
  mainTemp.textContent = `${temp} ºC`
}

function setMainIcon (data) {
  const mainIcon = document.querySelector('.weather-icon-form')
  mainIcon.src = require(`./images/SVG/${data.weather[0].icon}.svg`)
}

function setFeelsLike (data) {
  const feelsLikeTemp = document.querySelector('.weather-stats__status__container__temp')
  const temp = parseInt(kelvinToCelsius(data.main.feels_like))
  feelsLikeTemp.textContent = `${temp} ºC`
}

function setHumidity (data) {
  const humidity = document.querySelector('.weather-stats__status__container__humidity')
  humidity.textContent = `${data.main.humidity} %`
}

// function setChanceOfRain (data) {
// TO DO encontrar de donde sale la precipitacion
//   const chanceOfRain = document.querySelector('.weather-stats__status__container__chance-rain')
//   // chanceOfRain.textContent = `${data.current.}`
// }

function setWindSpeed (data) {
  const windSpeed = document.querySelector('.weather-stats__status__container__wind-speed')
  windSpeed.textContent = `${data.wind.speed} km/h`
}

function buildWeatherWeekly (data) {
  // mapeo de todos los dias
  const weekData = [...data]
  weekData.shift()
  weekData.map(day => {
    const weatherWeekly = document.querySelector('.weather-weekly')
    const dayTemp = buildWeatherDay(day)
    weatherWeekly.appendChild(dayTemp)
  })
}

function buildWeatherDay (dataPerDay) {
  const weatherWeeklyContainer = document.createElement('div')
  weatherWeeklyContainer.setAttribute('class', 'weather-weekly__container')
  // crecion del dia
  const weatherWeeklyDay = document.createElement('p')
  weatherWeeklyDay.setAttribute('class', 'weather-weekly__container__day')
  weatherWeeklyDay.textContent = new Date(dataPerDay.dt * 1000).toLocaleDateString('en', {
    weekday: 'long'
  })
  // creacion max temperatura
  const weatherWeeklyMaxTemp = document.createElement('p')
  weatherWeeklyMaxTemp.setAttribute('class', 'weather-weekly__container__max-temp')
  const maxTemp = parseInt(kelvinToCelsius(dataPerDay.temp.max))
  weatherWeeklyMaxTemp.textContent = `${maxTemp} ºC`
  // creacion min temp
  const weatherWeeklyMinTemp = document.createElement('p')
  weatherWeeklyMinTemp.setAttribute('class', 'weather-weekly__container__min-temp')
  const minTemp = parseInt(kelvinToCelsius(dataPerDay.temp.min))
  weatherWeeklyMinTemp.textContent = `${minTemp} ºC`
  // creacio img
  const imageDay = new Image()
  imageDay.setAttribute('class', '.weather-weekly__container__image weather-icon')
  imageDay.src = require(`./images/SVG/${dataPerDay.weather[0].icon}.svg`)
  // hago el aappend
  weatherWeeklyContainer.appendChild(weatherWeeklyDay)
  weatherWeeklyContainer.appendChild(weatherWeeklyMaxTemp)
  weatherWeeklyContainer.appendChild(weatherWeeklyMinTemp)
  weatherWeeklyContainer.appendChild(imageDay)
  return weatherWeeklyContainer
}

// function clean () {
//   const weatherWeekly = document.querySelector('.weather-weekly')
//   const searchValue = document.querySelector('.main-weather__search__searchbar')
//   weatherWeekly.innerHTML = ''
//   searchValue.value = ''
// }

function buildCurrentWeather (current) {
  setWeatherDescription(current)
  setCityName(current)
  setTime()
  setMainTemp(current)
  setMainIcon(current)
}

function buildCurrentDetails (current) {
  setFeelsLike(current)
  setHumidity(current)
  // setChanceOfRain() queda encontraar en la api donde sale este valor
  setWindSpeed(current)
}

function buildWeeklyForecast (forecast) {
  buildWeatherWeekly(forecast.daily)
}

function buildApp (current, forecast) {
  buildCurrentWeather(current)
  buildCurrentDetails(current)
  buildWeeklyForecast(forecast)
}

export { buildApp }
