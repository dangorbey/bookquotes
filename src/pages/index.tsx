import Head from "next/head";
import { useRef, useState } from "react";
import * as htmlToImage from 'html-to-image';

type ButtonData = {
  label: string;
  fillColor: string;
  borderLight: string;
  borderDark: string;
}

export default function Home() {
  const [textValue, setTextValue] = useState<string>('');
  const [selectedButton, setSelectedButton] = useState<string>("amber");

  const buttons: ButtonData[] = [
    { label: "amber", fillColor: "bg-amber-300", borderLight: "border-amber-300", borderDark: "border-amber-500" },
    { label: "rose", fillColor: "bg-rose-300", borderLight: "border-rose-300", borderDark: "border-rose-500" },
    { label: "fuchsia", fillColor: "bg-fuchsia-300", borderLight: "border-fuchsia-300", borderDark: "border-fuchsia-500" },
    { label: "sky", fillColor: "bg-sky-300", borderLight: "border-sky-300", borderDark: "border-sky-500" },
    { label: "teal", fillColor: "bg-teal-300", borderLight: "border-teal-300", borderDark: "border-teal-500" },
    { label: "green", fillColor: "bg-green-300", borderLight: "border-green-300", borderDark: "border-green-500" },
  ];

  const selectedFillColor = buttons.find(button => button.label === selectedButton)?.fillColor;

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextValue(event.target.value);
  };

  // Function to process the text value
  const processTextValue = () => {
    const regex = /(\*\*.*?\*\*)|([^\*]+)/g;
    const matches = textValue.match(regex) || [];

    return matches.map((segment, index) => {
      if (segment.startsWith('**') && segment.endsWith('**')) {
        // return <span key={index} className={`${selectedFillColor} rounded-tl-md rounded-br-md`}>{segment.slice(2, -2)}</span>;
        // bg-gradient-to-r from-amber-300 via-amber-300/[.5] to-amber-300/[.7] 
        return (
          <span
            key={index}
            id="highlight"
            className={
              `${selectedFillColor}
              rounded-tl-md 
              rounded-br-md
              text`
            }>
            {segment.slice(2, -2)}
          </span>
        );
      }
      return segment.split('\n').map((line, lineIndex) => (
        lineIndex === 0 ? line : <>
          <br key={`${index}-${lineIndex}`} />
          {line}
        </>
      ));
    });
  };

  const processedValue = processTextValue();

  // Handle PNG export
  const divRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    if (divRef.current) {
      htmlToImage.toPng(divRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = "Quote_" + getFilenameFromInput();
          link.click();
        })
        .catch((error) => {
          console.error('Error exporting to PNG:', error);
        });
    }
  };

  // genrate file name
  const getFilenameFromInput = (): string => {
    const inputValue = textValue.trim() || "default_name";
    const words = inputValue.split(" ").slice(0, 3).join("_");
    const sanitizedFilename = words.replace(/[^a-zA-Z0-9_]/g, "");
    return `${sanitizedFilename}.png`;
  }




  return (
    <>
      <Head>
        <title>Create a Quote!</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center p-4">
          <h1 className="text-xl font-bold">Quote Generator: </h1>
          <div className="h-4"></div>
          <div ref={divRef} className="border-amber-100 border-2 bg-white w-80 aspect-[4/5] p-8 flex flex-col items-center justify-center">
            <div className="w-full break-normal">{processTextValue()}</div>
          </div>
          <div className="h-4"></div>

          <button className="font-bold p-2 bg-amber-100" onClick={handleExport}>Export to PNG</button>
          <div className="h-2"></div>
          <div className="w-80">
            <div className="py-2">
              <p className="font-bold">Paste quote below:</p>
              <p>Text within <span className="highlight">**two asterisks**</span> will be highlighted.</p>
            </div>
            <textarea
              className="border-amber-100 border-2 w-full p-4"
              value={textValue}
              onChange={handleInputChange}
              placeholder="Your quote here..."
            />
          </div>
          <div className="h-4"></div>
          <div className="w-80">
            <div className="py-2">
              <p className="font-bold">Highlight Color:</p>
            </div>
            <div className="space-x-4">
              {buttons.map((button) => (
                <button
                  key={button.label}
                  className={`w-8 h-8 rounded-full border-2 ${selectedButton === button.label
                    //selected
                    ? `${button.fillColor} ${button.borderDark}`

                    //not selected
                    : `${button.fillColor} ${button.borderLight}`
                    }`}
                  onClick={() => setSelectedButton(button.label)}
                />
              ))}
            </div>
          </div>
        </div>
      </main >
    </>
  );
}
