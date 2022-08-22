/* eslint-disable testing-library/prefer-find-by */
import {render,screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import Layout from '../components/Layout/Layout'
import {store} from '../store/Store'
import { Provider } from 'react-redux';
import { handleChange } from '../components/Layout/Search';
import { handleZip} from '../components/Layout/Search';
const axios = require("axios")
jest.mock("axios")

test('loads and displays Layout', async () => {
  
  render(
  <Provider store={store}>
    <Layout />
  </Provider>
  )

  expect(screen.getByRole('heading')).toHaveTextContent('The Weather App')
  expect(screen.getByTestId('search-input')).toBeInTheDocument()
  expect(screen.getByTestId('search-select')).toBeInTheDocument()

})


test('Fire input change event', async () => {
    render(
        <Provider store={store}>
            <Layout />
        </Provider>
    )
    
    const searchInputEl:HTMLInputElement = screen.getByPlaceholderText(/Search/i)
    const testValue = "Lahore"
    fireEvent.change(searchInputEl, {target: {value: testValue}})
    expect(searchInputEl.value).toBe(testValue)
})


test('Fire select change event', async () => {
    render(
        <Provider store={store}>
            <Layout />
        </Provider>
    )
    
    const selectInputEl:HTMLSelectElement = screen.getByTestId(('search-select'))
    const testValue = "44000"
    fireEvent.change(selectInputEl, {target: {value: testValue}})
    expect(selectInputEl.value).toBe(testValue)
})

test('Input search api test', async () => {
    render(
        <Provider store={store}>
            <Layout />
        </Provider>
    )
    
    const testValue = "Lahore"
    const mockedResponse = {
        data:{
                coord:{lon:74.3436,lat:31.5497},
                weather:[{id:711,main:"Smoke",description:"smoke",icon:"50n"}],
                base:"stations",
                main:{temp:304.14,feels_like:309.56,temp_min:302.21,temp_max:304.14,pressure:1001,humidity:66},
                visibility:5000,wind:{speed:2.06,deg:240},clouds:{all:20},dt:1661104173,
                sys:{type:1,id:7585,country:"PK",sunrise:1661041890,sunset:1661089236},
                timezone:18000,id:1172451,
                name:"Lahore",
                cod:200
            }
        }
        axios.get.mockResolvedValue(mockedResponse)
        
        handleChange(testValue)
})

test('select search api test', async () => {
    render(
        <Provider store={store}>
            <Layout />
        </Provider>
    )
    
    const testValue = 44000
    const mockedResponse = {
        data:{
            "coord": {
            "lon": 73.0113,
            "lat": 33.6957
            },
            "weather": [
            {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
            }
            ],
            "base": "stations",
            "main": {
            "temp": 301.2,
            "feels_like": 304.91,
            "temp_min": 301.2,
            "temp_max": 301.2,
            "pressure": 1003,
            "humidity": 77
            },
            "visibility": 10000,
            "wind": {
            "speed": 0.89,
            "deg": 211,
            "gust": 1.79
            },
            "rain": {
            "1h": 1.89
            },
            "clouds": {
            "all": 45
            },
            "dt": 1661139789,
            "sys": {
            "type": 2,
            "id": 2007435,
            "country": "PK",
            "sunrise": 1661128488,
            "sunset": 1661176049
            },
            "timezone": 18000,
            "id": 0,
            "name": "Islamabad Gpo",
            "cod": 200
            }
        }
        axios.get.mockResolvedValue(mockedResponse)
        
        handleZip(testValue)
})