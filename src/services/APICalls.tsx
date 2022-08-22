import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL
const mapBaseURL = process.env.REACT_APP_MAP_BASE_URL

const getWeatherData = async (url:string,params:any, method:string, map:boolean = false): Promise<any>=>
{

    let data: any = {
       data:{},
       error: null

    }
    const client = axios.create({
        baseURL: map? mapBaseURL : baseURL,
        data:params
    });

    if(method === 'post')
    {
        await client.post(url,params,{
            responseType: map ? "blob" :"json",
        }).then((res) => {
            data.data = res.data    
        }).catch( (error) => {
             
            if(error.response)
            {
                data.error = {message: error.response.data.message}
           
            }
            else if (error.request)
            {
                data.error = {message: error.message}
            }
            else
            {
                data.error = {message: error.message}
              
            }
        })
    }
    else if(method === 'get')
    {
        await client.get(url, {
            responseType: map ? "blob" :"json",
            params: {
              ...(Object.keys(params).length && {...params})
            }
          }).then((res) => {
            data.data = res.data  
                 
        }).catch( (error) => {
            if(error.response)
            {
                data.error = {message: error.response.data.message}
               
            }
            else if (error.request)
            {
                data.error = {message: "Please check your internet connection or consult technical team"}//error.message
             
            }
            else
            {
                data.error = {message: "Please check your internet connection or consult technical team"} //error.message
              
            }
        })
    }

    

    return data
}

export default getWeatherData;

