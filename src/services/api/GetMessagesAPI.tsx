import axios from "axios";

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
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Transfer-Encoding": "chunked",
      Authorization: "Bearer " + localStorage.getItem("authorization"), // Replace token if needed
    },
  };
  let datas =
  '{\r\n    "content" : "Can you teach me a golang",\r\n    "inputMessage" : "test",\r\n    "genModel": "GPT"\r\n}';
const apiUrl = `${process.env.NEXT_PUBLIC_BASE_GENERATE_URL}/realtime-generate/generate/message/stream`;


  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://be-ms-realtime-generate-760358261832.asia-southeast1.run.app/realtime-generate/generate/message/stream',
    headers: { 
      'Content-Type': 'text/event-stream', 
      'Cache-Control': 'no-cache', 
      // 'Connection': 'keep-alive', 
      // 'Transfer-Encoding': 'chunked', 
      'Authorization': "Bearer " + localStorage.getItem("authorization"),
    },data:datas}


  // const mock: Payload = {
  //   content: "Can you teach me a golang",
  //   inputMessage: "test",
  //   genModel: "GPT",
  // };

  axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


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
    result : ""
  }
}
