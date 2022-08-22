/* eslint-disable jsx-a11y/alt-text */
import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/Reducer";
import getWeatherData from "../../services/APICalls";
import { WeatherResponseType, WeatherType } from "../../Types/types";
import Slider from "react-slick";
import dateFormat from "dateformat";

const WeekForecast:FC<any> = ({units}) => {

  const [data, setData] = useState<WeatherResponseType[]>([])
  
  const location = useSelector((state:RootState)=>{
     return state.location
  })

  const ref = useRef<any>()

  const settings = {
    dots:false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const previous = () => {
    ref.current.slickPrev()
  }

  const next = () => {
    ref.current.slickNext()
  }
 
  useEffect(()=>{
   
   location.lat && location.lon && getWeatherData(`data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`, {}, 'get')
    .then((res)=>{
     setData(res?.data?.list)
   })
    .catch(err=> console.warn(err))
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location, units])
  
   return (
     <>
        <div className="row">
              <div className="text-center"><h5><p className="font-weight-light">5 Day Forcast</p></h5></div>
        </div>
        <Slider {...settings} ref={ref}>
        {
          data?.length && data?.map((d:WeatherResponseType, i:number)=>{
             const date = new Date(d?.dt ? d?.dt * 1000 : 0)
             //date.setMilliseconds(d?.dt ? d.dt * 1000 : 0)
             return (
              <div className="container-fluid" key={i}>
                <div className="row">
                    <div className="col-12"> 
                        <div className="card p-4">    
                            <div className="d-flex flex-column justify-content-between align-items-center">
                                <span className="flex-grow-1">{`${dateFormat(date, "dd-mm-yyyy")}`}</span>
                                <span className="flex-grow-1">{`${dateFormat(date, "HH:MM TT")}`}</span>
                                {/* <h6>16:08</h6> */}
                            </div>
                              
                            <div className="d-flex flex-column temp mt-5 mb-3">
                                <h3 className="mb-0 font-weight-bold"> {units === 'metric' ? <>{d?.main?.temp}&deg; C</>: <>{d?.main?.temp}&deg; F</>}</h3>
                                <span className="small grey">{d?.weather?.map((w:WeatherType, index:number)=>{
                                      return <div key={index}>
                                          {index !== d?.weather?.length -1 ? `${w.main},`: w.main } <br/>
                                          {<img src={`http://openweathermap.org/img/w/${w?.icon}.png`} width="100px" />}
                                          </div>
                                  })}</span>
                            </div>
                            
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="temp-details1">
                                      <p>
                                          <img src="https://i.imgur.com/B9kqOzp.png" height="17px" />
                  
                                        <span> {`${d?.wind?.speed} km/h`}  </span>
                                      </p>
                                      <p> 
                                        <i className="fa fa-thermometer-empty" aria-hidden="true"></i>
                                        <span> {units === 'metric' ? <>{d?.main?.temp_min}&deg; C</>: <>{d?.main?.temp_min}&deg; F</>}</span>
                                      </p>
                                </div>
                                <div className="temp-details1">
                                    <p> 
                                        <i className="fa fa-thermometer-full" aria-hidden="true"></i>
                                        <span> {units === 'metric' ? <>{d?.main?.temp_max}&deg; C</>: <>{d?.main?.temp_max}&deg; F</>}</span>
                                    </p>
                                    <p> 
                                        <i className="fa fa-tint mr-2" aria-hidden="true"></i>
                                        <span> {`${d?.clouds?.all}%`}  </span> 
                                    </p>
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
             )
          })
        }
       </Slider>
          <div className="sliderArrows text-center">
              <button className="slider-arrow arrow-prev" onClick={next}>
                  Previous
              </button>
              <button className="slider-arrow arrow-next" onClick={previous}>
                  Next
              </button>
          </div>
     </>
   );
 }

export default WeekForecast;

