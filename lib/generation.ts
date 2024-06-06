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
        let contents, images
        if (opts.getImage) {
            images = await this.imageAi.generateImage(prompt, opts.imageSize, opts.numberOfPages ?? 1)
        }

        if (opts.getText) {
            contents = await this.promptAi.generatePrompt(prompt, opts.numberOfPages ?? 1)
        }
       
        const pages: IPage[] = []

        if(contents) {
            for (let i = 0; i < contents.length; i++) {
                pages[i] = {
                    ...(pages[i]),
                    text: contents[i],
                }
            }
        }

        if(images) {
            for (let i = 0; i < images.length; i++) {
                pages[i] = {
                    ...(pages[i]),
                    image: images[i].b64_json,
                }
            }
        }

        return pages;
    }
}