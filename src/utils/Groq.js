import { Groq } from "groq-sdk"; 

const GROQ_API = import.meta.env.VITE_GROQ;

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true,
});

export const requestToGroqAI = async (content) => {
    const replay = await groq.chat.completions.create ({
        messages : [
            {
                role : "user",
                content,
            },
        ],
        model : "llama-3.2-90b-vision-preview",
    });
    return replay.choices[0].message.content;
}