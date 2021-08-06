import './App.css';
import React, { useEffect } from 'react'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilValue,
} from "recoil";
import TextInput from './TextInput';
import axios from 'axios';

const getData = async () => {
  const {data} = await axios.get(
    "https://jisutqybmf.market.alicloudapi.com/weather/query",
    {
      headers: {
        Authorization: "APPCODE 9b6fa818c00648bba005694348f5bb3f",
      },
      params: {
        cityid: 111
      }
    }
  );
  return data
}

export const textState = atom({
  key: 'textState',
  default: ''
})

export const charCountState = selector({
  key: '1231df',
  get: ({get}) => {
    const text = get(textState)
    return text.length
  }
})

const weatherState = selector({
  key: 'weatherState',
  get: async () => {
    const res = await getData()
    return res.result
  }
})

function CharacterCount() {
  useEffect(() => {
    getData()
  }, [])
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

function AS () {
  const weather = useRecoilValue(weatherState);

  return (
    <div>
      city: {weather.city}
      weather: {weather.weather}
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
    <div className="App">
      <TextInput />
      <CharacterCount />
    </div>
    <React.Suspense fallback={<div>Loading...</div>}>

    <AS />
    </React.Suspense>
    </RecoilRoot>
  );
}

export default App;
