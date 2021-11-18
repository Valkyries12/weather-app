
const getWeatherToday = async function (city = 'buenos aires') {
  const key = 'e0ac5f463540bed37a365e85ae486e39'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

// console.log(getWeather())

const getWeatherWeekly = async function (data, city = 'buenos aires') {
  const key = 'e0ac5f463540bed37a365e85ae486e39'
  const exclude = 'minutely,alerts'
  const lon = data.coord.lon
  const lat = data.coord.lat
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${key}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export { getWeatherToday, getWeatherWeekly }
