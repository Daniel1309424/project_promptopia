import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    console.log("Received request:", { userId, prompt, tag });
  
    try {
      await connectToDB();
      const newPrompt = new Prompt({
        creator: userId,
        prompt,
        tag
      });
  
      await newPrompt.save();
      console.log("New prompt created:", newPrompt);
  
      return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
      console.log("Error creating prompt:", error);
      return new Response('Failed to create a new prompt', { status: 500 });
    }
  };
  