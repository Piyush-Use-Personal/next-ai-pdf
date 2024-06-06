"use client";
// example: https://www.accenture.com/content/dam/accenture/final/accenture-com/document-2/Accenture-Tech-Vision-2024.pdf#zoom=40
import { PDFCard, SuggestionCard } from "@/components/Card";
import LoadingButton from "@/components/LoadingButton";
import { PDFContainer } from "@/components/PDFContainer";
import TypeWriter from "@/components/Typewriter";
import { initialData } from "@/constant/sample";
import useIsMobile from "@/hooks/useIsMobile";
import { GenerationAI } from "@/lib/generation";
import { IOptions, IPage } from "@/types";
import { ChangeEvent, useState } from "react";

const generationAI = new GenerationAI();

export default function Home() {
  const isMobile = useIsMobile()
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [perPageOptions, setPerPageOptions] = useState<{
    width: number,
    reverse: boolean
  }[]>([]);
  const [pages, setPages] = useState<IPage[]>([]);

  const [options, setOptions] = useState<IOptions>({
    numberOfPages: 1,
    getImage: false,
    getText: true,
    imageSize: '512x512',
  });

  const validateOptions = () => {
    if (!prompt || prompt.length < 100) {
      setError('Please add prompt at least 100 characters')
      return false
    }
    if (!options) return true
    if (options.numberOfPages === 0 || (options.numberOfPages && options.numberOfPages > 5)) {
      setError('Please create less than 5 pages at once')
      return false
    }
    return true
  }

  const handleGenerate = async () => {
    if(loading) return
    if (!validateOptions()) return
    try {
      setError('')
      setLoading(true);
      const generatedPages = await generationAI.generate(prompt, options);
      setPages(prev => [...prev, ...generatedPages]);
      setPerPageOptions(prev => [...prev, ...generatedPages.map(() => ({ width: 75, reverse: false }))])
    } catch (error) {
      console.error("Error:", error);
      setError((error as Error).message)
    } finally {
      setLoading(false);
    }
  };

  const handleOptionsChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const { checked } = (e.target as HTMLInputElement);

    let parsedValue: number | string = value
    if (name === 'numberOfPages') {
      parsedValue = parseInt(value)
    }
    setOptions(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : parsedValue
    }));
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setPerPageOptions(value => {
      const newRangeValue = [...value];
      newRangeValue[index] = {
        ...newRangeValue[index],
        width: parseInt(e.target.value, 10)
      }
      return newRangeValue;
    })
  };

  const handleReverse = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { checked } = (e.target as HTMLInputElement);
    setPerPageOptions(value => {
      const newRangeValue = [...value];
      newRangeValue[index] = {
        ...newRangeValue[index],
        reverse: checked
      }
      return newRangeValue;
    })
  };

  const handleStartOver = () => {
    setPages([])
    setError('')
  }

  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between p-12">
      <div className="z-10 w-full items-center justify-between text-sm lg:flex">
        <div className="w-full">
          {!isMobile ? <TypeWriter delay={50} words={[
            "Multi modal pdf",
            "Create with Customization",
            "Reset when required",
            "Once finished download your copy"
          ]} /> : <h2 className="text-3xl text-black mb-6 uppercase text-center font-semibold text-blue-700">Generate multi modal pdf</h2>}
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
          <div>
            <p className="text-black text-xl mb-2">Not sure, how to get started, click on any of below cards</p>
            <SuggestionCard onClick={(template) => setPrompt(template)} />
          </div>
          <div className="flex gap-x-4 xs:flex-wrap">
            <div className="mb-8 w-full">
              <label
                htmlFor="numberOfPages"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Number of Pages [Max upto 5]
              </label>
              <input
                type="number"
                id="numberOfPages"
                name="numberOfPages"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={options.numberOfPages}
                onChange={handleOptionsChange}
                min={1}
                max={5}
                required
              />
            </div>
            <div className="mb-8 w-full">
              <label
                htmlFor="imageSize"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Image Size
              </label>
              <select
                id="imageSize"
                name="imageSize"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={options.imageSize}
                onChange={handleOptionsChange}
                required
              >
                <option value="512x512">512x512</option>
                <option value="256x256">256x256</option>
                <option value="1024x1024">1024x1024</option>
                <option value="1792x1024">1792x1024</option>
                <option value="1024x1792">1024x1792</option>
              </select>
            </div>

          </div>
          <div className="mb-8 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Options
            </label>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="getImage"
                name="getImage"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                checked={options.getImage}
                onChange={handleOptionsChange}
              />
              <label htmlFor="getImage" className="ml-2 text-sm font-medium text-gray-900">
                Generate Image?
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="getText"
                name="getText"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                checked={options.getText}
                onChange={handleOptionsChange}
              />
              <label htmlFor="getText" className="ml-2 text-sm font-medium text-gray-900">
                Generate Text?
              </label>
            </div>
          </div>
          <div>
            {
              pages.map((page, index) => {
                return <div key={index}>
                  <div className="mb-8 w-full">
                    <label htmlFor="rangeInput" className="block mb-2 text-sm font-medium text-gray-900 font-bold">
                      Page {index + 1}
                    </label>
                    <input
                      type="range"
                      id="rangeInput"
                      name="rangeInput"
                      className="w-full"
                      min={1}
                      max={100}
                      value={perPageOptions[index].width}
                      onChange={(e) => handleRangeChange(e, index)}
                    />
                    <p className="text-sm text-gray-900 mt-2">Value: {perPageOptions[index].width}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="getImage"
                      name="getImage"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      checked={perPageOptions[index].reverse}
                      onChange={(e) => handleReverse(e, index)}
                    />
                    <label htmlFor="getImage" className="ml-2 text-sm font-medium text-gray-900">
                      Reverse Image
                    </label>
                  </div>
                </div>
              })
            }
          </div>
          <div className="flex gap-4 xs:flex-wrap">
            <LoadingButton
              type="button"
              loading={loading}
              onClick={handleGenerate}
              label={pages.length ? 'Generate more pages' : 'Generate'}
            />
            {
              pages.length && <LoadingButton
                type="button"
                loading={false}
                onClick={handleStartOver}
                label="Reset"
              />
            }
          </div>
          {
            error && <div className="my-4 text-red-500">
              <p>{error}</p>
            </div>
          }
         
          <PDFContainer>
            <div>
              {
                pages.map((page, index) => {
                  return <PDFCard
                    key={index}
                    page={page}
                    contentWidthPercentage={perPageOptions[index].width}
                    reverse={perPageOptions[index].reverse}
                  />
                })
              }
            </div>
          </PDFContainer>
        </div>
      </div>
    </main>
  );
}
