/* eslint-disable jsx-a11y/alt-text */
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../App.css'
import { RootState } from "../store/Store";

const WeatherMap:FC<any> =({units})=> {

    const [type, setType] = useState<string>('cloudes')
    const [url, setUrl] = useState<string>('')

    const location = useSelector((state:RootState)=>{
          return state.location
    })

    useEffect(()=>{
        setTimeout(()=>{
            setUrl(`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=${type}&lat=${location.lat}&lon=${location.lon}&zoom=3`)
        },0)
        
    }, [location, type])

    return (
      <>

        <div className="row mt-4">
          <div className="col-md-4">
              <button className="btn btn-success" style={{width:"100%"}} disabled={type==="cloudes"? true:false} onClick={()=>setType("cloudes")}>Clouds</button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-success" style={{width:"100%"}} disabled={type==="precipitation"? true:false} onClick={()=>setType("precipitation")}>Precipitation</button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-success" style={{width:"100%"}} disabled={type==="temperature"? true:false} onClick={()=>setType("temperature")}>Temperature</button>
          </div>
          
        </div>
        <div className="row mt-2">
            <iframe title='v-pills-home-tab' width="100%" height="500" id="gmap_canvas" src={url} frameBorder="0" scrolling="no"></iframe>
        </div>
       
      </>
    );
  }
  
  export default WeatherMap;
  
  