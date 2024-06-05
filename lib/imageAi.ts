import { OPEN_AI_API_KEY } from "@/constant/env";
import OpenAI from "openai";

export class ImageAI {
    private openAI: OpenAI;
    private modelId: string;
    private systemPrompt: string;

    constructor() {

        this.modelId = "gpt-4o";
        this.systemPrompt = '';
        this.openAI = new OpenAI({
            apiKey: OPEN_AI_API_KEY,
        });
    }

    async generateImage(prompt: string): Promise<string> {
        try {
            const response = await this.openAI.images.generate({
                prompt: prompt,
                n: 1,
                size: "512x512",
            });

            const imageUrl = response.data[0]?.url;
            if (imageUrl) {
                return imageUrl;
            } else {
                throw new Error("No image generated by DALL-E");
            }
        } catch (error) {
            console.error("Error generating image:", error);
            throw error;
        }
    }
}
