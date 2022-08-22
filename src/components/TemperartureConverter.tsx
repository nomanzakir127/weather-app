import { FC } from "react";
import '../App.css'

const TemperatureConverter:FC<any> =({units, setUnits})=> {
    return (
      <>
        <div className="row mt-4">
          <button type="button" className="btn btn-success" onClick={()=>setUnits('imperial')} disabled={units === 'imperial' ? true:false}>Convert to Fahrenhiet</button>
        </div>
        <div className="row mt-2">
          <button type="button" className="btn btn-success" onClick={()=>setUnits('metric')} disabled={units === 'metric' ? true:false}>Convert to Celcius</button>
        </div>
      </>
    );
  }
  
  export default TemperatureConverter;
  
  