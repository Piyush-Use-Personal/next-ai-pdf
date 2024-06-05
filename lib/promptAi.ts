import { OPEN_AI_API_KEY } from "@/constant/env";
import OpenAI from "openai";

export class PromptAI {
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

    async generatePrompt(prompt: string): Promise<string> {
        try {
            const response = await this.openAI.chat.completions.create({
                model: this.modelId,
                response_format: { type: "json_object" },
                messages: [
                  { role: "system", content: this.systemPrompt },
                  { role: "user", content: prompt },
                ],
              });

            const message = response.choices[0]?.message?.content;
            if (message) {
                return message;
            } else {
                throw new Error("No response from ChatGPT");
            }
        } catch (error) {
            console.error("Error generating prompt:", error);
            throw error;
        }
    }
}
