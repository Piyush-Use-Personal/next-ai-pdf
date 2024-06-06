import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  words?: string[];
  delay?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ words = ["Typewriter"], delay = 100 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex];
      if (!isDeleting) {
        setText(currentWord.substring(0, currentCharIndex + 1));
        setCurrentCharIndex((prev) => prev + 1);
        if (currentCharIndex === currentWord.length) {
          setIsDeleting(true);
        }
      } else {
        setText(currentWord.substring(0, currentCharIndex - 1));
        setCurrentCharIndex((prev) => prev - 1);
        if (currentCharIndex === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentWordIndex, currentCharIndex, isDeleting, delay, words]);

  return (
    <div className="w-full h-full text-black flex  my-16">
      <h1 className="text-[50px] font-bold h-6 text-blue-700">{text}</h1>
    </div>
  );
};

export default TypeWriter;
