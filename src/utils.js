function clean () {
  const weatherWeekly = document.querySelector('.weather-weekly')
  const searchValue = document.querySelector('.main-weather__search__searchbar')
  weatherWeekly.innerHTML = ''
  searchValue.value = ''
}

function kelvinToCelsius (kelvin) {
  const result = kelvin - 273.15
  return result
}

export { clean, kelvinToCelsius }
