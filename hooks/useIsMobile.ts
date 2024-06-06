'use client'
import { useState, useEffect } from "react";

const useIsMobile = () => {
    const [width, setWidth] = useState<number>(800);

    function handleWindowSizeChange() {
        if (typeof window !== 'undefined')
            setWidth(window.innerWidth);
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleWindowSizeChange);
        }
        return () => {
            if (typeof window !== 'undefined')
                window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;
    return isMobile;
};

export default useIsMobile;
