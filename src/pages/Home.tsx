import { useEffect, useState } from "react";
import TemperatureConverter from "../components/TemperartureConverter";
import WeatherChart from "../components/WeatherChart";
import DayForecast from "../components/WeatherForcast/DayForecast";
import WeekForecast from "../components/WeatherForcast/WeekForecast";
import WeatherMap from "../components/WeatherMap";
import { setLocation } from "../reducers/LocationSlice";
import { useAppDispatch } from "../store/Store";

function Home() {

 const dispatch = useAppDispatch()
 const [units, setUnits] = useState('metric')

 useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        dispatch(setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }))
      })
 },[])

  return (
    <>
      <div className="row mx-2 mt-2">
        <div className="col-md-6">
            <div className="row">
              <DayForecast units={units}/>
            </div>
            <div className="row mt-2">
              <WeekForecast units={units}/>
            </div>
        </div>
        <div className="col-md-6">
            <div className="row">
              <TemperatureConverter units={units} setUnits={setUnits}/>
            </div>
            <div className="row mt-2">
              <WeatherChart units={units} />
            </div>
        </div>
      </div>
      <div className="row mx-2 mt-2">
        <WeatherMap units={units}/>
      </div>
    </>
  );
}

export default Home;

