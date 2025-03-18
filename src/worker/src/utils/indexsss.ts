// import { streamText } from "ai";
// import { google } from "@ai-sdk/google";

// const model = google("models/gemini-2.0-flash-exp");

// export const aiai = async (prompt: string) => {
//   const { textStream } = await streamText({
//     model,
//     messages: [
//         {
//             role: "system",
//             content:
//                 `You are a class teach of class 6th.` +
//                 `You have to answer your student question in a simple way that they can undersatnd easily` +
//                 `You have to answer the question in a way that they can understand easily.` +
//                 `First introduce yourself and then answer the question.` 
//         },
//         {
//             role: "user",
//             content: prompt
//         }
//     ]
//   });

//   let finalText = '';
//   for await (const text of textStream) {
//     process.stdout.write(text);
//     finalText += text;
//   }
  
//   return finalText;
// };
