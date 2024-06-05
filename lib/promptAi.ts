import { OPEN_AI_API_KEY } from "@/constant/env";
import OpenAI from "openai";

export class PromptAI {
    private openAI: OpenAI;
    private modelId: string;
    private systemPrompt: string;

    constructor() {
        this.modelId = "gpt-4o";
        this.systemPrompt = `
        I need to create a detailed and visually appealing PDF document for my Next.js application. The document should include the following sections:

            1. **Introduction**
            - Provide a brief introduction about the document's purpose and its relevance.
            - Mention that the document will include both textual information and an image generated using AI.

            2. **Project Overview**
            - Describe the project for which this document is being created.
            - Include details about the goals, objectives, and the expected outcomes of the project.

            3. **Content Description**
            - Provide a detailed description of the main content that will be covered in the document.
            - This could include topics such as project background, methodology, analysis, and results.
            - Ensure that the content is engaging and informative.

            4. **Visual Representation**
            - Indicate that the document will feature an AI-generated image relevant to the project.
            - Describe the context and importance of the image to the project.

            5. **Conclusion**
            - Summarize the key points covered in the document.
            - Provide any final thoughts or recommendations.

            6. **References**
            - Include a section for references, if applicable.

            Here are some details to help you generate the content:

            - **Project Title:** Enhancing User Experience with AI-Generated Content
            - **Project Description:** This project explores the integration of AI-generated content, including text and images, to enhance the user experience in a Next.js application. The goal is to create a seamless and engaging user interface that leverages the power of AI to provide personalized and dynamic content.
            - **Target Audience:** Web developers and designers interested in AI technologies and their application in web development.
            - **Key Points to Cover:**
            - The benefits of using AI-generated content in web applications.
            - Examples of how AI can be used to personalize user experiences.
            - A case study or hypothetical scenario demonstrating the project's application.

            Please ensure that the content is well-structured, professional, and includes relevant details that align with the project's goals and audience.

        `;
        this.openAI = new OpenAI({
            apiKey: OPEN_AI_API_KEY,
            dangerouslyAllowBrowser: true,
        });
    }

    async generatePrompt(prompt: string): Promise<string> {
        try {
            const response = await this.openAI.chat.completions.create({
                model: this.modelId,
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
