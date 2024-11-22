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
  

  // Use the prompt from the data parameter
  const fullPrompt = data.prompt;

  const requestData = JSON.stringify({
    content: fullPrompt,
    inputMessage: "", //input mock
    genModel: "GPT",
  });


  console.log("Request Data:", requestData); // Log the request data to verify

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
  let result = ""; // Variable to accumulate the result

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        if (line.startsWith("event:") || line.startsWith("status:")) {
          continue; // Skip lines that start with "event:" or "status:"
        }
        if (line.includes("complete")) {
          // Call the additional API when "complete" is found
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/create_history/th/${data.firebase_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firebase_id: data.firebase_id,
              language,
              agent_id: data.agent_id,
              framework_id: 2, // Assuming framework_id is 2
              prompt: data.prompt,
              style_message_id: data.style_message_id,
              result, // Use the accumulated result
              model: "sampleModel", // Replace with actual model if available
              completion_tokens: 150, // Replace with actual completion tokens if available
              prompt_tokens: 50, // Replace with actual prompt tokens if available
            }),
          });
          continue;
        }
        const newChar = line.split(":")[1] || ""; // Extract the character part
        result += newChar; // Accumulate the result
        onNewCharacter(newChar); // Pass each new character to the callback
        await new Promise((resolve) => setTimeout(resolve, 10)); // Control display speed
      }
    }
  }
}
