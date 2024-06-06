import useIsMobile from "@/hooks/useIsMobile"
import { IPage } from "@/types"

export const PDFCard = ({
    page,
    reverse,
    contentWidthPercentage = 75
}: {
    page: IPage,
    reverse: boolean,
    contentWidthPercentage: number
}) => {
    const isMobile = useIsMobile()
    const imageWidthPercentage = 100 - contentWidthPercentage

    const contentStyle = {
        width: isMobile ? '100%' : `${contentWidthPercentage}%`,
    }
    const imageStyle = {
        width: isMobile ? '100%' : `${imageWidthPercentage}%`,
    }

    const children = []

    if (page.text) {
        children.push(<div style={contentStyle} className={`xs:w-full text-black w-[${contentWidthPercentage.toString()}%]`} dangerouslySetInnerHTML={{ __html: page.text }} />)
    }
    if (page.image) {
        children.push(<div style={imageStyle} className={`xs:w-full w-[${imageWidthPercentage}%]`}>
            <img src={`data:image/png;base64,${page.image}`} alt="Generated by DALL-E" className="w-full" />
        </div>)
    }

    return <div className="flex gap-x-8 mt-8 items-center xs:flex-col">
        {reverse ? children.reverse() : children}
    </div>
}

export const SuggestionCard = ({ onClick }: { onClick: (content: string) => void }) => {
    const templates: string[] = [
        `research papers on artificial intelligence and machine learning. Read through academic papers related to your field of interest, extract key findings, and write concise summaries. Include sections such as abstract, methodology, results, and conclusion. Present the summaries in a well-structured PDF document, ensuring clarity and accuracy in conveying the research insights`,
        `detailed comparison report of various software tools or products within a specific industry. Research and analyze features, pricing, user reviews, and performance metrics of competing products. Organize the information into a comprehensive PDF document, highlighting the strengths, weaknesses, and unique selling points of each product. Incorporate visual aids such as tables, charts, and graphs to enhance readability and understanding`,
        `Compile a series of tutorials on a programming language, framework, or technology stack. Gather tutorials from reputable sources such as official documentation, online courses, and developer blogs. Arrange the tutorials in a logical sequence, covering fundamental concepts, advanced topics, and practical examples. Format the content into a visually appealing PDF guide, complete with code snippets, illustrations, and step-by-step instructions to assist learners in mastering the subject matter.`
    ]
    return (
        <div className="flex gap-4 flex-wrap">
            {
                templates.map((template, index) => {
                    return <div onClick={() => onClick(template)} key={index} className="cursor-pointer mb-6 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                        <p className="font-normal text-gray-700">{template}</p>
                    </div>
                })
            }
        </div>
    );
};
