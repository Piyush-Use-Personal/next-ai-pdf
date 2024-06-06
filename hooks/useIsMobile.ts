'use client'
import { useState, useEffect } from "react";

const useIsMobile = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleWindowSizeChange);
        }
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    
    const isMobile = width <= 768;
    return isMobile;
};

export default useIsMobile;
