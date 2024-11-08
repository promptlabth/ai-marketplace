// src/services/api/GetMessagesAPI.tsx

export async function GetMessages(
  language: string,
  data: {
    firebase_id: string;
    agent_id: number;
    prompt: string;
    style_message_id: number;
  },
  onNewCharacter: (char: string) => void // Callback function to handle each new character
) {

    // TODO: เอา agent_id ไปยิง api หา prompt แล้ว prompt มาประกอบ
    const fullPrompt = "";

  const requestData = JSON.stringify({
    content: fullPrompt,
    inputMessage: "test",
    genModel: "GPT",
  });


  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_GENERATE_URL}/realtime-generate/generate/message/stream`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authorization"),
      'Content-Type': 'application/json',
    },
    body: requestData,
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`HTTP error! status: ${response.status}. Details: ${JSON.stringify(errorBody)}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        if (line !== "event:message" && line !== "status:complete") {
          const newChar = line.split(":")[1] || ""; // Extract the character part
          onNewCharacter(newChar); // Pass each new character to the callback
          await new Promise((resolve) => setTimeout(resolve, 10)); // Control display speed
        }
      }
    }
  }
}
