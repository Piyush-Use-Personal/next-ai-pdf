import React, { ReactNode, useRef, useState } from 'react';
import generatePDF, { Options } from "react-to-pdf";
import LoadingButton from './LoadingButton';

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
        <div className='p-4 mt-8 text-black'>
            <div className='flex justify-end'>
                <LoadingButton onClick={() => downloadPdf()} label='Download' loading={false}/>
            </div>
            <div id='container'>
                {children}
            </div>
        </div>
    );
};
