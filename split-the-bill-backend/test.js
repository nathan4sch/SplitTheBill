const { OpenAI } =  require("openai");
const { createWorker } = require('tesseract.js');
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


async function main() {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize('receipt.jpg');
    console.log(text);

    // removed await
    worker.terminate();


    const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a receipt parser. You will receive text translated from an image of a receipt and you will output each item and its price in JSON format.",
          },
          { role: "user", content: text },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });
    console.log(completion.choices[0].message.content);

}

main();
