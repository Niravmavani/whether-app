import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  WiThermometer,
  WiHumidity,
  WiBarometer,
  WiDaySunny,
  WiStrongWind,
} from "react-icons/wi";
import { FaCity, FaFlag } from "react-icons/fa";

function App() {
  const [searchValue, setsearchValue] = useState("surat");
  const [tempInfo, setTempInfo] = useState({});

  const getWhetherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=6dea5a653cd3692020e604aadc7ac765`;

      const res = await fetch(url);
      const data = await res.json();

      // temprature melvva
      const { temp, humidity, pressure } = data.main;
      // weather kevu che teni info ak array ni undar object ma che atle teni melvva mate
      // aya {main:weathermood} aa che te ak key nu name che and main ni jgya ye weathermood am lkhelu aavshe
      const { main: weathermood } = data.weather[0];
      // city nu name
      const { name } = data;
      // pavan ni speed mate
      const { speed } = data.wind;
      // country mate
      const { country } = data.sys;

      // all info ne ak object ma leva mate
      const myNewWather = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
      };

      setTempInfo(myNewWather);
    } catch (error) {
      toast.error("Not Found");
    }
  };

  useEffect(() => {
    getWhetherInfo();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 text-white">
            <div className="mb-4">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setsearchValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                placeholder="Enter city name"
              />
            </div>
            <button
              onClick={getWhetherInfo}
              className="w-full bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
            >
              Find
            </button>
          </div>
          <div className="px-6 py-4 bg-gray-100">
            <div className="flex items-center my-2">
              <WiThermometer className="text-2xl text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold">
                Temperature: {tempInfo.temp}°C
              </h4>
            </div>
            <div className="flex items-center my-2">
              <WiHumidity className="text-2xl text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold">
                Humidity: {tempInfo.humidity}%
              </h4>
            </div>
            <div className="flex items-center my-2">
              <WiBarometer className="text-2xl text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold">
                Pressure: {tempInfo.pressure} hPa
              </h4>
            </div>
            <div className="flex items-center my-2">
              <WiDaySunny className="text-2xl text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold">
                Weather Mood: {tempInfo.weathermood}
              </h4>
            </div>
            <div className="flex items-center my-2">
              <FaCity className="text-2xl text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold">
                City Name: {tempInfo.name}
              </h4>
            </div>
            <div className="flex items-center my-2">
              <WiStrongWind className="text-2xl text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold">
                Wind Speed: {tempInfo.speed} km/h
              </h4>
            </div>
            <div className="flex items-center my-2">
              <FaFlag className="text-2xl text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold">
                Country: {tempInfo.country}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
