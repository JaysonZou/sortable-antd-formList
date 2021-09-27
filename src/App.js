// import './App.css';
// import React, { useEffect } from 'react'
// import {
//   RecoilRoot,
//   atom,
//   selector,
//   useRecoilValue,
// } from "recoil";
// import TextInput from './TextInput';
// import axios from 'axios';
// import CustomForm from './CustomForm';

// const getData = async () => {
//   const {data} = await axios.get(
//     "https://jisutqybmf.market.alicloudapi.com/weather/query",
//     {
//       headers: {
//         Authorization: "APPCODE 9b6fa818c00648bba005694348f5bb3f",
//       },
//       params: {
//         cityid: 111
//       }
//     }
//   );
//   return data
// }

// export const textState = atom({
//   key: 'textState',
//   default: ''
// })

// export const charCountState = selector({
//   key: '1231df',
//   get: ({get}) => {
//     const text = get(textState)
//     return text.length
//   }
// })

// const weatherState = selector({
//   key: 'weatherState',
//   get: async () => {
//     const res = await getData()
//     return res.result
//   }
// })

// function CharacterCount() {
//   useEffect(() => {
//     getData()
//   }, [])
//   const count = useRecoilValue(charCountState);

//   return <>Character Count: {count}</>;
// }

// function AS () {
//   const weather = useRecoilValue(weatherState);

//   return (
//     <div>
//       city: {weather.city}
//       weather: {weather.weather}
//     </div>
//   );
// }

// function App() {
//   return (
//     <RecoilRoot>
//     <div className="App">
//       <TextInput />
//       <CharacterCount />
//     </div>
//     <React.Suspense fallback={<div>Loading...</div>}>

//     <AS />
//     </React.Suspense>
//     <CustomForm />
//     </RecoilRoot>
//   );
// }

// export default App;
import { ConfigProvider, Input, Button, Form } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import "./index.css";
import CustomForm from "./CustomForm";

moment.locale("zh-cn");

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const App = () => {

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name={["user", "website"]} label="Website">
          <Input />
        </Form.Item>
          <CustomForm />
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
export default App;