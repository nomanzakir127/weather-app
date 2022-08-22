import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../App.css'
import getWeatherData from "../services/APICalls";
import { RootState } from "../store/Store";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dateFormat from "dateformat";

const WeatherChart:FC<any> =({units})=> {

    const [options, setOptions] = useState<any>({
        chart:{
           type:"column"
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Temperature by hour'
            }
        },
        title:{text:""}, 
        series:[{
                name: "Temperature",
                colorByPoint: true,
                data:[],
        }],
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: ''
                }
            }
        },
    
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat:''
        },
    })
  
    const location = useSelector((state:RootState)=>{
       return state.location
    })

    useEffect(()=>{
   
        location.lat && location.lon && getWeatherData(`data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`, {}, 'get')
         .then((res)=>{
          options.series[0].data = []
          options.title.text = "Weather Chart for " + res.data?.city?.name
          options.plotOptions.series.dataLabels.format = units === "imperial"?'{point.y:.1f}F': '{point.y:.1f}C'
          options.tooltip.pointFormat = units === "imperial"? '<span style="color:{point.color}"><b>{point.y}&deg;F</b></span><br/>': '<span style="color:{point.color}"><b>{point.y}&deg;</span>C<br/>'
          for(let obj of res?.data?.list){
            const date = new Date(obj?.dt ? obj?.dt * 1000 : 0)
            const val = {
                //...(units === "imperial" ? {name: obj.main.temp + "F" }: {name: obj.main.temp + "C" }),
                name: dateFormat(date, "dd-mm-yyyy HH:MM TT"),
                y:obj.main.temp
            }
            options.series[0].data.push(val)
          }
          setOptions({...options})
        })
         .catch(err=> console.warn(err))
      
       // eslint-disable-next-line react-hooks/exhaustive-deps
       },[location, units])

       if(Object.keys(options).length === 0){
        return (
            <>Loading...</>
        )
       }

    return (
      <div className="mt-4">
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
      </div>
    );
  }
  
  export default WeatherChart;
  
  