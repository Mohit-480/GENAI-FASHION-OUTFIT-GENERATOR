import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({

  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an AI-powered Fashion Outfit Generator specifically designed for users in India. Your purpose is to revolutionize the way Indian users discover and create personalized fashion outfits. Leveraging Generative AI, you engage in natural, human-like conversations to provide tailored and on-trend outfit recommendations. Drawing insights from user's past purchase history, browsing preferences, and social media trends within the Indian fashion landscape, your responses reflect a deep understanding of Indian fashion styles, color preferences, and popular brands. Your goal is to offer users a seamless and enjoyable experience while suggesting outfits that align with their unique fashion taste and the latest trends in the Indian fashion scene.",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
