import './sass/styles.scss'
import './images/search-icon.png'
import { getWeatherToday, getWeatherWeekly } from './APIfunctions'
import { clean, trimValue } from './utils'
import { buildApp } from './domFunctions'

async function startProgram () {
  const searchValue = document.querySelector('.main-weather__search__searchbar').value
  // searchValue = searchValue.replace(/[^a-zA-Z0-9]/g, '')
  const current = await getWeatherToday(searchValue || 'buenos aires')
  const forecast = await getWeatherWeekly(current)
  clean()
  buildApp(current, forecast)
}

startProgram()

const searchInput = document.querySelector('.main-weather__search__searchbar')
const searchImg = document.querySelector('.weather-icon-search')
searchImg.addEventListener('click', startProgram)
searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    startProgram()
  }
})
searchInput.addEventListener('keyup', function (e) {
  searchInput.value = trimValue(e.target.value)
})
