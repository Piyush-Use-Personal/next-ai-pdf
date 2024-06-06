export interface IPage {
    text?: string
    image?: string
}

export type ImageSize = "512x512" | "256x256" | "1024x1024" | "1792x1024" | "1024x1792" | undefined

export interface IOptions {
    getText?: boolean
    getImage?: boolean
    numberOfPages?: number
    imageSize?: ImageSize
}