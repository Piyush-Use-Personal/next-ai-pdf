import { OPEN_AI_API_KEY } from "@/constant/env";
import { htmlSampleContent } from "@/constant/sample";
import OpenAI from "openai";

export class PromptAI {
    private openAI: OpenAI;
    private modelId: string;
    private systemPrompt: string;

    constructor() {
        this.modelId = "gpt-4o";
        this.systemPrompt = this.getSystemPrompt();
        this.openAI = new OpenAI({
            apiKey: OPEN_AI_API_KEY,
            dangerouslyAllowBrowser: true,
        });
    }

    getSystemPrompt() {
        const systemPrompt = `As a helpful pdf creator assistant, your role involves creating pdf contents to aid
          a user in generating knowledge. Your tasks include generating only one type of HTML content for a PDF:
    
          1. HTML: Similar to any PDF document, these require a title, a short description, and content of the PDF. Generate this information based on
          available research and knowledge that you have. Use publicly available data and do not fill in mock information.
    
          Return your content in JSON format. Use a unique title and description for each generation.
          For each, provide formatted HTML. For styling, you can use inline CSS that can be directly added into frontend frameworks such as React or even plain JavaScript.
          Please note the styling guide:
          1. Do not add margin or padding on the container so that when I inject it in a website, it should not look mis-spaced.
          2. For the title, keep the font size to 3rem and line height as 70px, and for the description, keep the font relatively smaller than the title and 35 line height.
          3. For content, generate data as you see fit. If you think a section should be in a list, then generate a horizontal or vertical list, or else a paragraph or any other.
          4. You can make a call on content design based on the prompt provided.
    
          For example:
          {
            content: [
                ${htmlSampleContent}
            ]
          }
         `;
    
        return systemPrompt;
    }
    
    getUserPrompt(inputPrompt: string, noOfSections: number) {
        const prompt = `You are given the following context delimited by <>:
        <${inputPrompt}>
    
    
        Your task is to generate ${noOfSections} items in array based on the provided context.
    
        To remind you, here is the expected JSON output structure: Return an Array of content in HTML code.
        For each item in array, provide a string containing HTML code.
        E.g., the output should be:
        {
            content :  [
                'HTML content for section 1',
                'HTML content for section 2'
            ]
        }
       
        `;
        return prompt;
    }
    

    async generatePrompt(prompt: string, numberOfQuestions: number): Promise<string[]> {
        try {
            const response = await this.openAI.chat.completions.create({
                model: this.modelId,
                response_format: { type: "json_object" },
                messages: [
                    { role: "system", content: this.systemPrompt },
                    { role: "user", content: this.getUserPrompt(prompt, numberOfQuestions) },
                ],
            });

            const data = response.choices[0]?.message?.content;
            if (data) {
                return Object.values(JSON.parse(data).content);
            } else {
                throw new Error("No response from ChatGPT");
            }
        } catch (error) {
            console.error("Error generating prompt:", error);
            throw error;
        }
    }
}
