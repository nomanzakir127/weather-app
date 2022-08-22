/* eslint-disable jsx-a11y/alt-text */
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WeatherResponseType, WeatherType } from "../../Types/types";
import getWeatherData from "../../services/APICalls";
import { RootState } from "../../store/Store";
import dateFormat from "dateformat";
import '../../App.css'

const DayForecast:FC<any> = ({units}) => {

 const [data, setData] = useState<WeatherResponseType>()
 
 const location = useSelector((state:RootState)=>{
    return state.location
 })

 useEffect(()=>{
  
  location.lat && location.lon && getWeatherData(`data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`, {}, 'get')
   .then((res)=>{
    setData(res?.data)
  })
   .catch(err=> console.warn(err))

 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[location, units])
 
  return (
    <>
      <div className="container-fluid">
          <div className="row justify-content-center">
              <div className="col-12"> 
                    <div className="card p-4">    
                      
                        <div className="d-flex">
                            <h6 className="flex-grow-1">Today's Forecast for {data?.name}</h6>
                            {/* <h6>16:08</h6> */}
                        </div>
                          
                        <div className="d-flex flex-column temp mt-5 mb-3">
                            <h1 className="mb-0 font-weight-bold" id="heading"> {units === 'metric' ? <>{data?.main?.temp}&deg; C</>: <>{data?.main?.temp}&deg; F</>}</h1>
                            <span className="small grey">{data?.weather?.map((w:WeatherType, index:number)=>{
                                  return <div key={index}>
                                      {index !== data?.weather?.length -1 ? `${w.main},`: w.main } <br/>
                                      {<img src={`http://openweathermap.org/img/w/${w?.icon}.png`} width="100px" />}
                                      </div>
                              })}</span>
                        </div>
                        <div className="row">
                            <div className="d-flex">
                                <div className="temp-details flex-grow-1">
                                    <p className="my-1"> 
                                        <i className="fa fa-thermometer-empty" aria-hidden="true"></i>
                                        <span> {units === 'metric' ? <>{data?.main?.temp_min}&deg; C</>: <>{data?.main?.temp_min}&deg; F</>}</span>
                                    </p>
                                </div>
                                <div className="temp-details flex-grow-1">
                                    <p className="my-1"> 
                                        <i className="fa fa-thermometer-full" aria-hidden="true"></i>
                                        <span> {units === 'metric' ? <>{data?.main?.temp_max}&deg; C</>: <>{data?.main?.temp_max}&deg; F</>}</span>
                                    </p>
                                </div>
                                <div className="temp-details flex-grow-1">
                                    <p className="my-1"> 
                                        <i className="fa fa-tint mr-2" aria-hidden="true"></i>
                                        <span> {`${data?.clouds?.all}%`}  </span> 
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex">
                                <div className="temp-details flex-grow-1">
                                    <p className="my-1">
                                        <img src="https://i.imgur.com/B9kqOzp.png" height="17px" />
                
                                        <span> {`${data?.wind?.speed} km/h`}  </span>
                                    </p>
                                </div>
                                <div className="temp-details flex-grow-1">
                                    <p className="my-1"> 
                                        <i className="fa fa-sunrise mr-2" aria-hidden="true"></i>
                                        <span> {`${dateFormat(new Date(data && data.sys?.sunrise ? data.sys.sunrise * 1000 : 0), "HH:MM TT")}`}  </span> 
                                    </p>
                                </div>
                                <div className="temp-details flex-grow-1">
                                    <p className="my-1"> 
                                        <i className="fa fa-sunset mr-2" aria-hidden="true"></i>
                                        <span> {`${dateFormat(new Date(data && data.sys?.sunset ? data.sys.sunset * 1000 : 0), "HH:MM TT")}`}  </span> 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
      </div>
    </>
  );
}

export default DayForecast;

