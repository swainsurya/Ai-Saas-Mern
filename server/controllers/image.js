import { userModel } from "../models/user.model.js";
import axios from "axios"


export const generate = async (req, res) => {
    const { prompt, count } = req.body;
    const {userId} = req

    if (!prompt || !count || count < 1) {
      return res.status(400).json({ error: "Invalid prompt or count" });
    }
  
    try {
      const user = await userModel.findById(userId)
      if(user.credits <= 0) {
        return res.json({message: "Your credits are used purchase to generate further"})
      }
      if(user.credits<count){
        return res.json({message: "You do not have enough credits"})
      }
      console.log(`Generating ${count} images for prompt: ${prompt}`);
  
      // Array to store multiple image requests
      const imageRequests = Array.from({ length: count }, () =>
        axios.post(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
          { inputs: prompt },
          {
            headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API}` },
            responseType: "arraybuffer",
          }
        )
      );
  
      // Wait for all image generation requests to complete
      const responses = await Promise.all(imageRequests);
  
      // Convert responses to base64 images
      const images = responses.map((response) =>
        `data:image/png;base64,${Buffer.from(response.data).toString("base64")}`
      );

      user.credits -= count;
      await user.save();

      res.json({ images , user});
    } catch (error) {
      console.error("Image generation failed:", error.response?.data.toString() || error.message);
      res.status(500).json({ error });
    }
  }