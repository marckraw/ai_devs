const API_URL = "https://api.openai.com/v1/chat/completions";
const MAX_TOKENS = 1500;
const TEMPERATURE = 0.5;
const SYSTEM_PROMPT = 'Act as assistant';
const MESSAGES = ["hello", "hi!", "how are you?"];

async function openAICompletion(msg) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer sk-.......`,
        },
        body: JSON.stringify({
            model: "gpt-4",
            max_tokens: MAX_TOKENS,
            temperature: TEMPERATURE,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: msg },
            ],
            stream: false,
            stop: ["#-#"],
        }),
    };

    return fetch(API_URL, options);
}

async function processMsgs() {
    const promises = MESSAGES.map(async (msg) => {
        const res = await openAICompletion(msg);
        const data = await res.json();
        console.log(data.choices[0].message.content);
        return data;
    });

    await Promise.all(promises);
}

processMsgs();