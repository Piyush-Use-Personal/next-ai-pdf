"use client";

import { PDFCard } from "@/components/Card";
import { PDFContainer } from "@/components/PDFContainer";
import { ImageAI } from "@/lib/imageAi";
import { PromptAI } from "@/lib/promptAi";
import { IPage } from "@/types";
import { useState } from "react";

const promptAi = new PromptAI();
const imageAi = new ImageAI();

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [pages, setPages] = useState<IPage[]>([
    {
        "text": "Sure, here's a polished and technical paragraph for an AI research document focusing on technical details:\n\n---\n\n**Technical Details**\n\nIn our research on AI-generated content for enhancing user experiences in Next.js applications, we delved deeply into the state-of-the-art algorithms and model architectures that underpin AI content generation technologies. We primarily leveraged OpenAI's GPT-3 and DALL-E models, both of which are designed to generate high-quality text and images, respectively. GPT-3, with its 175 billion parameters, utilizes deep learning techniques, specifically transformer architecture, to predict and generate coherent text based on a given context. This model was fine-tuned with domain-specific datasets to tailor the content generation to our project's requirements, ensuring relevance and engagement. Meanwhile, DALL-E, trained on a diverse dataset of text-image pairs, was employed to generate AI imagery that enhances the visual aesthetics of our application. The integration of these models was achieved through RESTful API calls, ensuring seamless interaction between the front-end and AI services. Furthermore, we implemented server-side rendering and static site generation features of Next.js to optimize performance and loading times, thereby providing a smooth and efficient user experience. Through rigorous testing and iteration, we achieved a robust and scalable solution that vividly demonstrates the potential of AI in modern web development.\n\n---\n\nFeel free to adjust this paragraph to better suit your document's tone and specific requirements.",
        "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-WNhiIdbx1Dkckqhwi0yPufyl/user-VSK5be5It41rV2Xx2qbs0HEH/img-BKdBlIPkChmMkjgYfMCDFrjO.png?st=2024-06-05T15%3A24%3A08Z&se=2024-06-05T17%3A24%3A08Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-05T16%3A04%3A12Z&ske=2024-06-06T16%3A04%3A12Z&sks=b&skv=2023-11-03&sig=kccMq/giOJEfWtUqYcgJAF5zZn4g9HmEYeO00qtMz6U%3D"
    },
    {
        "text": "# Enhancing User Experience with AI-Generated Content\n\n## Introduction\n\nWelcome to the comprehensive documentation for our project titled **\"Enhancing User Experience with AI-Generated Content.\"** This document is designed to provide a thorough understanding of the initiative and its relevance to the field of web development. The goal is to integrate AI-generated content, including text and images, to create a more engaging and personalized user experience within a Next.js application. As you navigate through this document, you will find insightful textual information complemented by an image generated using AI technology.\n\n## Project Overview\n\n### Goals and Objectives\n\nThe primary goal of this project is to explore the use of AI-generated content to enhance the user experience in web applications. By leveraging AI technologies, we aim to create a seamless and dynamic user interface that adapts to individual user preferences and behaviors. Specifically, the objectives are to:\n\n- **Improve User Engagement:** Utilize AI-generated content to create personalized user experiences that keep users engaged.\n- **Streamline Content Creation:** Demonstrate how AI can assist in generating high-quality content efficiently, reducing the time and effort required by developers and designers.\n- **Showcase Use-Cases:** Provide practical examples and scenarios where AI-generated content can be effectively applied in web applications.\n\n### Expected Outcomes\n\nBy the end of this project, we anticipate the following outcomes:\n\n- A Next.js application featuring dynamic, AI-generated content.\n- Enhanced understanding of how AI can be integrated into web development.\n- Practical insights and best practices for using AI to personalize user experiences.\n\n## Content Description\n\n### Project Background\n\nIn today's digital age, user experience is a critical component of web application success. Traditional methods of content creation often fall short in delivering personalized experiences. This project addresses these limitations by incorporating AI to generate content that resonates with individual users.\n\n### Methodology\n\nOur approach involves the use of advanced AI models, such as GPT-3 for text generation and DALL-E for image generation. The process is as follows:\n\n1. **Data Collection:** Gather user data and preferences to inform AI-generated content.\n2. **Content Generation:** Use AI models to produce personalized text and images based on the collected data.\n3. **Integration:** Seamlessly integrate the AI-generated content into the Next.js application, ensuring a smooth user experience.\n\n### Analysis\n\nThe use of AI in content generation offers several benefits:\n\n- **Personalization:** AI can create content tailored to individual users, enhancing their overall experience.\n- **Efficiency:** Automated content generation reduces the workload on developers and designers, allowing them to focus on other critical aspects of the application.\n- **Scalability:** AI allows for the creation of vast amounts of content quickly and efficiently, making it easier to scale applications.\n\n### Results\n\nBy implementing this AI-driven approach, we have observed a significant improvement in user engagement and satisfaction. Users enjoy the personalized content, and the streamlined process has enabled our team to deliver a high-quality application more efficiently.\n\n## Visual Representation\n\nAn important aspect of this document is the inclusion of an AI-generated image that is relevant to the project. This image not only adds a visual element to enhance the document's appeal but also serves to illustrate the capabilities of AI in generating creative and contextually appropriate visuals.\n\n![AI-Generated Image](#) *(Include the AI-generated image here)*\n\n### Context and Importance\n\nThe AI-generated image demonstrates how AI can be used to create visually appealing content that aligns with the project's goals. In our Next.js application, similar images can be dynamically generated based on user preferences, adding a new layer of personalization to the user experience.\n\n## Conclusion\n\nIn summary, this project showcases the potential of AI-generated content in enhancing user experience within web applications. Key points covered in this document include:\n\n- The advantages of using AI for content generation, such as personalization, efficiency, and scalability.\n- Methodologies for integrating AI-generated content into a Next.js application.\n- Positive outcomes in terms of user engagement and satisfaction.\n\nBy leveraging AI technologies, web developers and designers can create more dynamic and engaging user experiences, ultimately leading to more successful and user-friendly applications.\n\n## References\n\n*(Include any references or resources here that were used in the creation of this document.)*\n\n- OpenAI GPT-3 Documentation: [Link](https://beta.openai.com/docs/)\n- Next.js Documentation: [Link](https://nextjs.org/docs)\n- Research on AI in Web Development: [Link](#)\n\n---\n\nThis document serves as a comprehensive guide to understanding and implementing AI-generated content in web development, providing valuable insights and practical examples for developers and designers interested in this innovative approach.",
        "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-WNhiIdbx1Dkckqhwi0yPufyl/user-VSK5be5It41rV2Xx2qbs0HEH/img-71r4Cmq5BKblWZ1E0oVz8vta.png?st=2024-06-05T16%3A56%3A38Z&se=2024-06-05T18%3A56%3A38Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-05T17%3A21%3A26Z&ske=2024-06-06T17%3A21%3A26Z&sks=b&skv=2023-11-03&sig=yKTWJtvEhb09%2Bl1kqDY61G380alR9ZS2%2B0wiKsUY/Pk%3D"
    }
])

  const handleGenerate = async () => {
    try {

      const text = await promptAi.generatePrompt(prompt);
      const imageUrl = await imageAi.generateImage(prompt);
      setPages(prev => [...prev, { text, image: imageUrl }])

    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log({
    pages
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="w-full">
          <div className="mb-8 w-full">
            <label
              htmlFor="prompt"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start adding some description about your task for PDF
            </label>
            <textarea
              rows={10}
              id="prompt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="generate me a good looking document for my nextjs app"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Generate
          </button>
          <PDFContainer>
            <div>
              {
                pages.map((page, index) => {
                  return <PDFCard key={index} page={page} />
                })
              }
            </div>
          </PDFContainer>
        </div>
      </div>
    </main>
  );
}
