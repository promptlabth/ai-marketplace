import axios, { AxiosRequestConfig } from "axios";
import fs from 'fs';

type Payload = {
  content: string;
  inputMessage: string;
  genModel: string;
};

export async function GetMessages(
  language: string,
  data: {
    firebase_id: string;
    agent_id: number;
    prompt: string;
    style_message_id: number;
  }
) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      // "Connection": "keep-alive",
      // "Transfer-Encoding": "chunked",
      Authorization: "Bearer " + localStorage.getItem("authorization"), // Replace token if needed
    },
  };
  let datas ='{\r\n    "content" : "Can you teach me a golang",\r\n    "inputMessage" : "test",\r\n    "genModel": "GPT"\r\n}';
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_GENERATE_URL}/realtime-generate/generate/message/stream`;


  let config : AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("authorization"),
    }, 
    responseType: "stream"
  }


  // const mock: Payload = {
  //   content: "Can you teach me a golang",
  //   inputMessage: "test",
  //   genModel: "GPT",
  // };

  const response = await fetch(
    "https://be-ms-realtime-generate-760358261832.asia-southeast1.run.app/realtime-generate/generate/message/stream",
    {
      method: 'post',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("authorization"),
      }, 
      body: datas
    }
  )

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`generateImage HTTP error! status: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorBody)}`);
  }
  if(!response.body){
    const errorBody = await response.json();
    throw new Error(`generateImage HTTP error! status: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorBody)}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  var responseText: string = ""
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n').filter(Boolean);
    
    for (const line of lines) {
      try {
        if (line != "event:message" && line != "status:complete"){
          // do something for show to text in realtime
          responseText = responseText + line.split(":")[1]
        }
        setTimeout(() => {}, 1000)
      } catch (error) {
        console.error('Error parsing update:', error);
      }
    }
  }
  console.log(responseText);
  

  // const response = 
  // const stream = (await response).data

  // stream.on('data', (data: string) => {
  //   console.log(data)
  // })


  // try {
  //   const response = await axios.post(apiUrl, datas, requestOptions);
  //   console.log("response", response);
  //   if (response.status === 200) {
  //     return response.data;
  //   }
  // } catch (error) {
  //   console.error("Error GetMessages ", error);
  //   return { reply: "Error Please try again" };
  // }
  return {
    result: ""
  }
}
