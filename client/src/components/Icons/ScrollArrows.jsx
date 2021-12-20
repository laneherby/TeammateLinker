import React, { useState } from "react";
import { Box } from '@mui/material';
import './../../styles/App.css';
import { ReactComponent as ChevronRight } from '../../styles/assets/chevronRight.svg';
import { ReactComponent as ChevronLeft } from '../../styles/assets/chevronLeft.svg';

const ScrollArrows = ({ scrollRef, chevHeight, chevWidth, chevClassLeft, chevClassRight }) => {
    const [widthScrolled, setWidthScrolled] = useState(0);

    const sideScroll = (e) => {
        const elementName = e.target.attributes.name.value;
        const distance = (scrollRef.current.getBoundingClientRect().width);
        let scrollAmount;

        if(elementName === "scrollLeft") {
            scrollAmount = ((widthScrolled - distance) < 0) ? 0 : (widthScrolled - distance);
        }

        if(elementName === "scrollRight") {
            const maxScrollWidth = scrollRef.current.scrollWidth - distance;
            scrollAmount = ((widthScrolled + distance) >= maxScrollWidth) ? maxScrollWidth : (widthScrolled + distance);
        }

        scrollRef.current.scrollTo({
            "left": scrollAmount, 
            "behavior": "smooth"
        });
        setWidthScrolled(scrollAmount);        
    };

    return (
        <React.Fragment>
            <Box
                sx={{height: chevHeight, width: chevWidth}}
                className={`chevron ${chevClassLeft}`}
                name="scrollLeft"
                onClick={sideScroll}
            >
                <ChevronLeft />
            </Box>
            <Box 
                sx={{height: chevHeight, width: chevWidth}}
                className={`chevron ${chevClassRight}`}
                name="scrollRight"
                onClick={sideScroll}
            >
                <ChevronRight />
            </Box>
        </React.Fragment>
    );
};

export default ScrollArrows;