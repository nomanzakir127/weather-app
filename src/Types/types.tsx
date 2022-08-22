
export type WeatherResponseType = {
  coord:CoordType,
  dt?:number,
  weather:WeatherType[],
  base:String,
  main:MainType,
  visibility:String,
  wind:WindType,
  clouds:CloudsType,
  timezone: Number,
  id: Number,
  name: String,
  sys?:SysType,
  cod: Number,
}

export type CoordType = {
    lat:Number,
    lon:Number 
}

export type WeatherType = {
    id: Number,
    main: String,
    description: String,
    icon: String
}

export type MainType = {
    temp: Number,
    feels_like: Number,
    temp_min: Number,
    temp_max: Number,
    pressure: Number,
    humidity: Number
}

export type WindType = {
    speed: Number,
    deg: Number
}


export type CloudsType = {
    all: Number
}

export type SysType = {
    type: Number,
    id: Number,
    message: Number,
    country: String,
    sunrise: any,
    sunset: any
} 


 
  