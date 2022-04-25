const { useState, useEffect } = require('react');
// e6b599415a269a00410ee2f4055aed56
const WeatherAPI = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('Seoul');
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState([]);
  let txt;
  const handleChange = (e) => {
    txt = e.target.value;
    console.log(txt);
    setSearch(txt);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getGeo(search);
  };
  const selectCity = (index) => {
    console.log(city[index]);
    let selected = city[index];
    setLon(selected.lon);
    setLat(selected.lat);
    console.log(lon);
  };
  const getGeo = async (search) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=e6b599415a269a00410ee2f4055aed56`
    );
    const json = await response.json().then((json) => {
      setCity(json);
      setLoading(false);
    });
  };
  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e6b599415a269a00410ee2f4055aed56`
    );
    const json = await response.json();
    setWeather(json);
  };

  useEffect(() => {
    getWeather();
  }, [lon]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={txt}
          placeholder="Search for a city"
        />
        <button>Search</button>
      </form>
      {loading ? null : (
        <ul>
          {city.map((value, index) => {
            return (
              <li key={index} onClick={() => selectCity(index)}>
                {value.name}({value.country})
              </li>
            );
          })}
        </ul>
      )}
      {lat === 0 ? (
        'Loading'
      ) : (
        <div>
          <p>{weather.name}</p>
          <ul>
            <li>Humidity : {weather.main.humidity}</li>
            <li>
              Temperature(Celcius) :
              {Math.round((weather.main.temp - 273.15) * 2) / 2}
            </li>
            <li>Weather : {weather.weather[0].main}</li>
            <li>Weather description : {weather.weather[0].description}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherAPI;
