import { useEffect } from "react";


// This hook detects clicks outside the spacified component and calls the provided hamdler function
export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        // Define the listner function to be called on clicks/touch events
        const listener = (event) => {
            // if the click/touch event originated inside the ref element, do nothin
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            } 
            // Otherwise, call the provided handler function
            handler(event);
        }

        // Add event listeners for mousedown and touchstart events on the document
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        // Cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    // Only run this effect when the ref or handler function changes
    }, [ref, handler]);    
};
