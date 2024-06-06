import { IOptions, IPage } from "@/types";
import { ImageAI } from "./imageAi";
import { PromptAI } from "./promptAi";

const defaultOptions: IOptions = {
    getImage: true,
    getText: true,
    numberOfPages: 1,
    imageSize: '512x512'
}

export class GenerationAI {
    imageAi: ImageAI
    promptAi: PromptAI

    constructor() {
        this.imageAi = new ImageAI()
        this.promptAi = new PromptAI()
    }

    async generate(prompt: string, options?: IOptions): Promise<IPage[]> {
        const opts = { ...defaultOptions, ...options }
        let text, image
        if (opts.getImage) {
            image = await this.imageAi.generateImage(prompt, opts.imageSize, opts.numberOfPages ?? 1)
        }

        if (opts.getText) {
            text = await this.promptAi.generatePrompt(prompt)
        }

        return [{
            text,
            image: image ? image[0].b64_json : undefined
        }]
    }
}