import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6a40baf8f5d2fb7fcaa881547a81f499`

  const searchLoc = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
      .then((res) => {
      setData(res.data)
      console.log(res.data)
    })
    setLocation('')
    }
  }

  return (
    <div className="App">
      <div className="recherche">
        <input 
        type="text"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLoc}
        placeholder='Entre une localisation'
        />
      </div>
      <div className="global">
        <div className="haut">
          <div className="localisation">
            <p>{data.name}</p>
            {data.sys ? <h3>{data.sys.country}</h3> : null}
          </div>
          <div className="temperature">
          {data.main ? <h1>{data.main.temp} F</h1> : null}
          </div>
          <div className="desc">
            <p>Nuage :</p>
            {data.clouds ? <p>{data.clouds.all}%</p> : null}
          </div>
        </div>
        <div className="bas">
          <div className="previsions">

            <div className="groupe">
              <h4>Temp Max :</h4>
              {data.main ? <p>{data.main.temp_max}F</p> : null}
            </div>
            <div className="groupe">
              <h4>Temp Min :</h4>
              {data.main ? <p>{data.main.temp_min}F</p> : null}
            </div>
            <div className="groupe">
              <h4>Visibilité  :</h4>
              <p>{data.visibility}m</p>
            </div>
          </div>

          <div className="humidite">
            <h4>Humidité :</h4>
          {data.main ? <p>{data.main.humidity} %</p> : null}
          </div>
          <div className="etat">
            <h4>Pression :</h4>
            {data.wind ? <p>{data.wind.speed} km/h</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
