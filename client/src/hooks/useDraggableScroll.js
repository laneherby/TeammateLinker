const useDraggableScroll = (ref) => {
    let initialPosition = {
         scrollTop: 0, 
         scrollLeft: 0, 
         mouseX: 0,
         mouseY: 0
    };

    const mouseMoveHandler = ({ clientX, clientY }) => {
        const dx = clientX - initialPosition.mouseX;
        const dy = clientY - initialPosition.mouseY;

        ref.current.scrollTop = initialPosition.scrollTop - dy;
        ref.current.scrollLeft = initialPosition.scrollLeft - dx;
    };

    const mouseUpHandler = () => {
        ref.current.style.cursor = null;

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    const onMouseDown = ({clientX, clientY}) => {
        initialPosition = {
            scrollLeft: ref.current.scrollLeft,
            scrollTop: ref.current.scrollTop,
            mouseX: clientX,
            mouseY: clientY
        };

        ref.current.style.cursor = 'grabbing';
        ref.current.style.userSelect = 'none';

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    return { onMouseDown };
}

export default useDraggableScroll;