import { useState } from 'react';

const useSideScroll = (ref, direction) => {    
    const [widthScrolled, setWidthScrolled] = useState(0);

    if(!ref.current) return;
    const distance = (ref.current.getBoundingClientRect().width);
    let scrollAmount;

    if(direction === "left") {
        scrollAmount = ((widthScrolled - distance) < 0) ? 0 : (widthScrolled - distance);
    }

    if(direction === "right") {
        const maxScrollWidth = ref.current.scrollWidth - distance;
        scrollAmount = ((widthScrolled + distance) >= maxScrollWidth) ? maxScrollWidth : (widthScrolled + distance);
    }

    ref.current.scrollTo({
        "left": scrollAmount, 
        "behavior": "smooth"
    });
    setWidthScrolled(scrollAmount);
};

export default useSideScroll;