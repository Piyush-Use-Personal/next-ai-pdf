"use client";
// example: https://www.accenture.com/content/dam/accenture/final/accenture-com/document-2/Accenture-Tech-Vision-2024.pdf#zoom=40
import { PDFCard } from "@/components/Card";
import LoadingButton from "@/components/LoadingButton";
import { PDFContainer } from "@/components/PDFContainer";
import { initialData } from "@/constant/sample";
import { GenerationAI } from "@/lib/generation";
import { IOptions, IPage } from "@/types";
import { useState } from "react";

const generationAI = new GenerationAI();

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false)

  const [pages, setPages] = useState<IPage[]>([
    initialData
  ])

  const [options, setOptions] = useState<IOptions>({
    numberOfPages: 1,
    getImage: true,
    getText: true,
    imageSize: '512x512',
  })

  const handleGenerate = async () => {
    try {
      setLoading(true)
      const generatedPages = await generationAI.generate(prompt, options)
      setPages(prev => [...prev, ...generatedPages])
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false)
    }
  };
  console.log({
    pages
  })

  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between p-12">
      <div className="z-10 w-full items-center justify-between text-sm lg:flex">
        <div className="w-full">
          <div className="mb-8 w-full">
            <label
              htmlFor="prompt"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Start adding some description about your task for PDF
            </label>
            <textarea
              rows={10}
              id="prompt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="generate me a good looking document for my nextjs app"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>
          <LoadingButton
            type="button"
            loading={loading}
            onClick={handleGenerate}
            label="Generate"
          />
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
