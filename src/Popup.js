import './Popup.css';
import React, { useState, useEffect, useRef } from "react";

// Popup component for displaying detailed information about a selected food item
// Allows the user to adjust serving size, view nutrition facts, and add the food to the meal list
// popupFood - The selected food item to display in the popup
// onClosePopup - Function to close the popup
// onAddFood - Function to add the selected food to the meal list
function Popup({ popupFood, onClosePopup, onAddFood }) {
    // Reference to the DOM element of the popup
    const popupRef = useRef(null);
    // State hook to manage the serving size
    const [servingSize, setServingSize] = useState(1);
    // Extracting nutritional information from the selected food item
    const calories = popupFood.food.nutrients.ENERC_KCAL;
    const protein = popupFood.food.nutrients.PROCNT;
    const fat = popupFood.food.nutrients.FAT;
    const carbs = popupFood.food.nutrients.CHOCDF;
    const fiber = popupFood.food.nutrients.FIBTG;

    // Size of the food item in grams
    const sizeInGrams = popupFood.measures[0].weight;

    // Calculating adjusted nutritional values based on serving size
    const adjustedCalories = (calories / 100) * sizeInGrams;
    const adjustedProtein = (protein / 100) * sizeInGrams
    const adjustedFat = (fat / 100) * sizeInGrams
    const adjustedCarbs = (carbs / 100) * sizeInGrams
    const adjustedFiber = (fiber / 100) * sizeInGrams

    // Handles the change in serving size from the slider
    function onServingSizeChange(event) {
        const inputServingSize = parseFloat(event.target.value);
        setServingSize(inputServingSize);
    }

    // Handles the change in grams from the text input
    function onGramChange(event) {
        const inputGrams = parseFloat(event.target.value);
        // Check if inputGrams is a valid number
        if (!isNaN(inputGrams)) {
            setServingSize(inputGrams / sizeInGrams);
        }
    }

    // Closes the popup when clicking outside the content
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClosePopup();
            }
        };
        document.addEventListener("click", handleOutsideClick, true);
        return () => { document.removeEventListener("click", handleOutsideClick, true); };
    }, [onClosePopup]);

    // Handles the click event for the "Add" button
    // Adds the selected food to the meal list with the adjusted serving size
    const onAddButtonClick = () => {
        const modifiedFood = {
            label: (popupFood.food.label),
            brand: (popupFood.food.brand),
            calories: (adjustedCalories * servingSize).toFixed(0),
            protein: (adjustedProtein * servingSize).toFixed(0),
            fat: (adjustedFat * servingSize).toFixed(0),
            carb: (adjustedCarbs * servingSize).toFixed(0),
            fiber: (adjustedFiber * servingSize).toFixed(0),
        };
        onAddFood(modifiedFood);
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content" ref={popupRef}>
                <h2>{popupFood.food.label} ({sizeInGrams.toFixed(0)} g)</h2>
                {popupFood.food.brand && <p>{popupFood.food.brand}</p>}
                <img src={popupFood.food.image} alt="" />
                <br></br>
                <button onClick={onAddButtonClick}>Add</button>
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
                        value={(sizeInGrams * servingSize).toFixed(0)}
                    />
                </div>
                <div className="output-section">
                    <h3>Nutrition Facts</h3>
                    <hr />
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