import axios from 'axios';

const apiBaseUrl = 'https://api.openai.com/v1/';
const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

export async function sendMessageToGPT4(message: string): Promise<string> {
  try {
    const promptSys = '';
    const response = await axiosInstance.post('chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: promptSys },
        { role: 'user', content: message },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error('Erro ao enviar mensagem para o GPT-4: ' + error);
  }
}
