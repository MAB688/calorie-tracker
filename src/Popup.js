import './Popup.css';
import React, { useState, useEffect, useRef } from "react";

function Popup({ popupFood, onClosePopup }) {
    const popupRef = useRef(null);
    const [servingSize, setServingSize] = useState(1);

    function onServingSizeChange(event) {
        const inputServingSize = event.target.value;
        setServingSize(inputServingSize);
    }

    // Clicking outside the popup closes it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClosePopup();
            }
        };
        document.addEventListener("click", handleOutsideClick, true);
        return () => { document.removeEventListener("click", handleOutsideClick, true); };
    }, [onClosePopup]);

    return (
        <div className="popup-overlay">
            <div className="popup-content" ref={popupRef}>
                <h2>{popupFood.label}</h2>
                <img src={popupFood.image} alt="" />
                <br></br>
                <button onClick={onClosePopup}>Close</button>
                <button>Add</button>
                <div className="input-section">
                    <br></br>
                    <h4 className="slider-output">Serving Size: {servingSize}</h4>
                    <input
                        className="input-slider"
                        onChange={onServingSizeChange}
                        type="range"
                        step="0.5"
                        min="0"
                        max="10"
                        value={servingSize}
                    />
                </div>
                <div className="output-section">
                    <ul>
                        {Object.entries(popupFood.nutrients).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {(value * servingSize).toFixed(0)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Popup;