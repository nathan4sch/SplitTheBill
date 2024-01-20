const { OpenAI } =  require("openai");
const { createWorker } = require('tesseract.js');
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


async function main() {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize('receipt.jpg');
    console.log(text);
    await worker.terminate();

    const assistant = await openai.beta.assistants.create({
        name: "Receipt Parser",
        instructions: "You are a receipt parser. You will receive text translated from an image of a receipt and you will output each item and its price.",
        model: "gpt-4-1106-preview"
      });

    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: text
    });

    const run = await openai.beta.threads.runs.create(thread.id, { 
        assistant_id: assistant.id,
    });
    await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
    const messages = await openai.beta.threads.messages.list(thread.id);
    console.log(messages.data.content.text);

}

main();
