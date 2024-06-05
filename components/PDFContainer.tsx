import React, { ReactNode, useRef, useState } from 'react';
import generatePDF, { Options } from "react-to-pdf";

const options: Options = {
    filename: "using-function.pdf",
    page: {
        margin: 20
    }
};

const getTargetElement = () => document.getElementById("container");

const downloadPdf = () => generatePDF(getTargetElement, options);

export const PDFContainer = ({ children }: { children: ReactNode }) => {

    return (
        <div className='p-4 mt-8'>
            <div className='flex justify-end'>
                <button onClick={() => downloadPdf()}>Download PDF</button>
            </div>
            <div id='container'>
                {children}
            </div>
        </div>
    );
};
