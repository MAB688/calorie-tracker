import './Popup.css';
import React, { useState, useEffect, useRef } from "react";

function Popup({ popupFood, onClosePopup }) {
    const popupRef = useRef(null);
    const [servingSize, setServingSize] = useState(1);

    const calories = popupFood.food.nutrients.ENERC_KCAL;
    const protein = popupFood.food.nutrients.PROCNT;
    const fat = popupFood.food.nutrients.FAT;
    const carbs = popupFood.food.nutrients.CHOCDF;
    const fiber = popupFood.food.nutrients.FIBTG;

    const sizeInGrams = popupFood.measures[0].weight;

    const adjustedCalories = (calories / 100) * sizeInGrams;
    const adjustedProtein = (protein / 100) * sizeInGrams
    const adjustedFat = (fat / 100) * sizeInGrams
    const adjustedCarbs = (carbs / 100) * sizeInGrams
    const adjustedFiber = (fiber / 100) * sizeInGrams

    function onServingSizeChange(event) {
        const inputServingSize = parseFloat(event.target.value);
        setServingSize(inputServingSize);
    }

    function onGramChange(event) {
        const inputGrams = parseFloat(event.target.value);
        // Check if inputGrams is a valid number
        if (!isNaN(inputGrams)) {
            setServingSize(inputGrams / sizeInGrams);
    }
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
                <h2>{popupFood.food.label} ({sizeInGrams.toFixed(0)} g)</h2>
                {popupFood.food.brand && <p>{popupFood.food.brand}</p>}
                <img src={popupFood.food.image} alt="" />
                <br></br>
                <button>Add</button>
                <div className="input-section">
                    <h4 className="slider-header">Serving Size: {servingSize.toFixed(1)}</h4>
                    <input
                        className="input-slider"
                        onChange={onServingSizeChange}
                        type="range"
                        step="0.5"
                        min="0"
                        max="10"
                        value={servingSize}
                    />
                    <h4 className="textbox-header">Grams:</h4>
                    <input
                        className='textbox'
                        onChange={onGramChange}
                        type='text'
                        value={(sizeInGrams*servingSize).toFixed(0)}
                    />
                </div>
                <div className="output-section">
                    <h3>Nutrition Facts</h3>
                    <div className="nutrient">
                        <strong>Calories:</strong> {(adjustedCalories * servingSize).toFixed(0)} kcal
                    </div>
                    <div className="nutrient">
                        <strong>Protein:</strong> {(adjustedProtein * servingSize).toFixed(0)} g
                    </div>
                    <div className="nutrient">
                        <strong>Fat:</strong> {(adjustedFat * servingSize).toFixed(0)} g
                    </div>
                    <div className="nutrient">
                        <strong>Carbohydrates:</strong> {(adjustedCarbs * servingSize).toFixed(0)} g
                    </div>
                    <div className="nutrient">
                        <strong>Fiber:</strong> {(adjustedFiber * servingSize).toFixed(0)} g
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;