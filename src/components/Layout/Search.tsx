
import { useCallback} from 'react';
import '../../App.css'
import { setLocation } from '../../reducers/LocationSlice';
import getWeatherData from '../../services/APICalls';
import { useAppDispatch } from '../../store/Store';

let handleChange: (value:string)=>void
let handleZip: (zipCode:number)=>void
function Search() {
  
  const dispatch = useAppDispatch()
  const debounce = (func:any) => {
    let timer:any;
    return function (...args:any) {

      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  handleZip = (zipCode:number) =>{
    console.log(zipCode)
    if(zipCode){
      getWeatherData(`data/2.5/weather?zip=${zipCode},pk&appid=${process.env.REACT_APP_API_KEY}`, {}, 'get')
      .then((res) => {
        dispatch(setLocation(res.data?.coord))
      })
      .catch(err=>console.warn(err))
    }
   
  }

  handleChange = (value:string) => {
    if(value){
      getWeatherData(`geo/1.0/direct?q=${value}&limit=1&appid=${process.env.REACT_APP_API_KEY}`, {}, 'get')
      .then((res) => {
        console.log(res?.data)
        if(res?.data?.length) 
        {
          const result = res?.data[0]
          dispatch(setLocation({
            lat: result.lat,
            lon:result.lon
          }))
        }
        
      })
      .catch(err=>console.warn(err))
    }
    
      
  };

  //eslint-disable-next-line react-hooks/exhaustive-deps
 const optimizedFn = useCallback(debounce(handleChange), []);
  
    return (
        
        <form>
          <div className="row mx-1">
            <div className='col-md-9'>
              <div className="form-group mt-2 ">
                <input type="text" className="form-control" id="text" data-testid="search-input" aria-describedby="text" onChange={(e) => optimizedFn(e.target.value)} placeholder="Search" />
              </div>
            </div>
            <div className='col-md-3'>
              <div className="form-group mt-2">
                <select className="form-control" id="zipCodes" data-testid="search-select" onChange={(e)=>handleZip(Number(e.target.value))}>
                  <option>Zip Code</option>
                  <option value = "44000">Islamabad</option>
                  <option value = "54000">Lahore</option>
                  <option value = "25000">Peshawar</option>
                  <option value = "60000">Multan</option>
                  <option value = "87800">Quetta</option>
                </select>
              </div>
            </div>
          </div>
        </form>
    );
  }
  
  export  {Search, handleChange, handleZip};
  
  