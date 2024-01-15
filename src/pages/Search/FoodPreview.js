import React from 'react';
import "./FoodPreview.css"

function FoodPreview({ modifiedFood, onDelete }) {
    return (
        <div className="food-preview">
            <h4>{modifiedFood.label}</h4>
            <p>Brand: {modifiedFood.brand || "Generic"}</p>
            <p>Calories: {modifiedFood.calories} kcal</p>
            <button onClick={() => onDelete(modifiedFood)}>X</button>
        </div>
    );
}

export default FoodPreview;