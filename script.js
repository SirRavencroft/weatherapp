const API_KEY = "79109866285207e22edd187614497d76";
const cityName = document.getElementById("CityName");
const cityCountry = document.getElementById("CityCountry");
const cityTemp = document.getElementById("CityTemp");
const cityFellsLIke = document.getElementById("CityFellsLike");
const cityWindSpeed = document.getElementById("Windspeed");
const searchBtn = document.getElementById("SearchBtn");
const CitySearch = document.getElementById("CitySearch");
const errorMessage = document.getElementById("ErrorMessage");
const getCurrentPosition = document.getElementById("CurrentLoc");
const Cloud = document.getElementById("Clouds");
const Pressure = document.getElementById("Pressure");
const Humidity = document.getElementById("Humid");
const WeatherIco = document.getElementById("WeatherIcon");

const getWeatherBySearch = (city) => {
  console.log(city);
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => wetherInfo(res))
    .catch((err) => errMsg(err));
};
const errMsg = (err) => {
  return (errorMessage.textContent = "Podane miasto nie istnieje");
};

const convertToCelsius = (a) => {
  return Math.round(a - 273.15) + "°C";
};

const wetherInfo = (info) => {
  console.clear();
  console.log("Pogoda na dziś", info);
  cityName.textContent = info.name;
  cityCountry.textContent = info.sys.country;
  cityTemp.textContent = convertToCelsius(info.main.temp);
  cityFellsLIke.textContent = convertToCelsius(info.main.feels_like);
  cityWindSpeed.textContent = info.wind.speed + "m/s";
  Cloud.textContent = info.weather[0].description;
  Pressure.textContent = info.main.pressure + "hPa";
  Humidity.textContent = info.main.humidity + "%";
  WeatherIco.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${info.weather[0].icon}.png`
  );

  errorMessage.textContent = "";
  //info.weather[0].description
};

// krok2 pobieramy informacje o pogodzie w naszej szerokości geograficznej i wywołujemy funkcje
//weatherInfo przekazujac do niej odpowiedzi z naszego fetch/then
const getWeatherByLocation = (coords) => {
  console.log(coords);
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => wetherInfo(res))
    .catch((err) => console.log(err));
};
//krok1 :uzyskanie informacji na temat współrzędnych geograficznych i przekazanie ich
//do funkcji getWetherByLocation, a nastepnie wywołanie ich
const getMyLocation = () => {
  return navigator.geolocation.getCurrentPosition((position) =>
    getWeatherByLocation(position.coords)
  );
};

getMyLocation();

const getSearchResult = () => {
  if (CitySearch.value !== "") {
    return getWeatherBySearch(CitySearch.value);
  } else {
    console.log("Nic nie wpisano");
  }
};

searchBtn.addEventListener("click", getSearchResult);
getCurrentPosition.addEventListener("click", getMyLocation);

const customSentence = () => {
  const sentence = document.getElementById("Sentence");
  const sentences = [
    "Ależ pochmurno",
    "Piękną mamy dziś pogodę",
    "Lepiej nie wychodź na zewnątrz",
  ];

  const result = sentences[Math.floor(Math.random() * sentences.length)];
  return (sentence.textContent = result);
};
customSentence();
