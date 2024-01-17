import './Overview.css';
import React, { useState, useEffect } from "react";

// Overview component that displays meal details and allows meal editing
function Overview({ onOpenSearch, deleteFoodItem, mealLists }) {
    // Destructuring mealLists into individual meal arrays
    const { breakfast, lunch, dinner, snack } = mealLists;

    // State variables to track nutrients for each meal type
    const [breakfastTotal, setBreakfastTotal] = useState({
        calories: 0,
        protein: 0,
        fat: 0,
        carb: 0,
        fiber: 0,
    });
    const [lunchTotal, setLunchTotal] = useState({
        calories: 0,
        protein: 0,
        fat: 0,
        carb: 0,
        fiber: 0,
    });
    const [dinnerTotal, setDinnerTotal] = useState({
        calories: 0,
        protein: 0,
        fat: 0,
        carb: 0,
        fiber: 0,
    });
    const [snackTotal, setSnackTotal] = useState({
        calories: 0,
        protein: 0,
        fat: 0,
        carb: 0,
        fiber: 0,
    });

    // State variable to track overall total nutrients
    const [totalNutrients, setTotalNutrients] = useState({
        calories: 0,
        protein: 0,
        fat: 0,
        carb: 0,
        fiber: 0,
    });

    // Function to open the search component for a specific meal type
    const openSearch = (mealType) => {
        onOpenSearch(mealType);
    };

    // Function to delete a food item from a specific meal type
    const onDeleteFood = (mealType, foodToDelete) => {
        deleteFoodItem(mealType, foodToDelete);
    };

    // useEffect hook to recalculate totals whenever meal lists change
    useEffect(() => {
        // Function to calculate total nutrients from a list of foods
        const calculateNutrientTotal = (foods) => {
            return foods.reduce(
                (totals, food) => {
                    totals.calories += Number(food.calories);
                    totals.protein += Number(food.protein);
                    totals.fat += Number(food.fat);
                    totals.carb += Number(food.carb);
                    totals.fiber += Number(food.fiber);
                    return totals;
                },
                { calories: 0, protein: 0, fat: 0, carb: 0, fiber: 0 }
            );
        };

        // Function to update total nutrients for a specific meal type
        const updateMealTotal = (mealType, foods) => {
            const nutrientTotal = calculateNutrientTotal(foods);
            switch (mealType) {
                case 'breakfast':
                    setBreakfastTotal(nutrientTotal);
                    break;
                case 'lunch':
                    setLunchTotal(nutrientTotal);
                    break;
                case 'dinner':
                    setDinnerTotal(nutrientTotal);
                    break;
                case 'snack':
                    setSnackTotal(nutrientTotal);
                    break;
                default:
                    break;
            }
        };

        // Update totals for each meal type
        updateMealTotal('breakfast', breakfast);
        updateMealTotal('lunch', lunch);
        updateMealTotal('dinner', dinner);
        updateMealTotal('snack', snack);

        // Calculate and set overall total nutrients
        const totalNutrient = calculateNutrientTotal([
            ...breakfast,
            ...lunch,
            ...dinner,
            ...snack,
        ]);
        setTotalNutrients(totalNutrient);

        // Run this code if any of these arrays change
    }, [breakfast, lunch, dinner, snack]);


    // Function to format the current date as "MM/DD/YYYY"
    const getCurrentDate = () => {
        const now = new Date();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const year = now.getFullYear();
        return `${month}/${day}/${year}`;
    };

    // JSX rendering for the Overview component
    return (
        <div className="overview">
            {/* Header section displaying current date and overall totals */}
            <div className="header">
                <h2>{`Meal Overview - ${getCurrentDate()}`}</h2>
                <hr />
                <h3><strong>Total Calories: </strong>{totalNutrients.calories} kcal</h3>
                <p>
                    <span><strong>Total Protein: </strong>{totalNutrients.protein}g</span>
                    <span> | <strong>Total Fat: </strong>{totalNutrients.fat}g</span>
                    <span> | <strong>Total Carbs: </strong>{totalNutrients.carb}g</span>
                    <span> | <strong>Total Fiber: </strong>{totalNutrients.fiber}g</span>
                </p>
                <hr />
            </div>
            {/* Rendering individual food items for breakfast, lunch, dinner, and snack */}
            <div className="quadrant">
                <h3>Breakfast</h3>
                <hr />
                <p>
                    <strong>Calories: </strong>{breakfastTotal.calories} kcal
                    <span> | <strong>Protein: </strong>{breakfastTotal.protein}g</span>
                    <span> | <strong>Fat: </strong>{breakfastTotal.fat}g</span>
                    <span> | <strong>Carbs: </strong>{breakfastTotal.carb}g</span>
                    <span> | <strong>Fiber: </strong>{breakfastTotal.fiber}g</span>
                </p>
                <hr />
                <button onClick={() => openSearch('breakfast')}>Add Food</button>
                <div className='items'>
                    {breakfast.map((food) => (
                        <FoodOverview
                            key={food.label}
                            mealType={'breakfast'}
                            modifiedFood={food}
                            onDelete={onDeleteFood}
                        />
                    ))}
                </div>
            </div>
            <div className="quadrant">
                <h3>Lunch</h3>
                <hr />
                <p>
                    <strong>Calories: </strong>{lunchTotal.calories} kcal
                    <span> | <strong>Protein: </strong>{lunchTotal.protein}g</span>
                    <span> | <strong>Fat: </strong>{lunchTotal.fat}g</span>
                    <span> | <strong>Carbs: </strong>{lunchTotal.carb}g</span>
                    <span> | <strong>Fiber: </strong>{lunchTotal.fiber}g</span>
                </p>
                <hr />
                <button onClick={() => openSearch('lunch')}>Add Food</button>
                <div className='items'>
                    {lunch.map((food) => (
                        <FoodOverview
                            key={food.label}
                            mealType={'lunch'}
                            modifiedFood={food}
                            onDelete={onDeleteFood}
                        />
                    ))}
                </div>
            </div>
            <div className="quadrant">
                <h3>Dinner</h3>
                <hr />
                <p>
                    <strong>Calories: </strong>{dinnerTotal.calories} kcal
                    <span> | <strong>Protein: </strong>{dinnerTotal.protein}g</span>
                    <span> | <strong>Fat: </strong>{dinnerTotal.fat}g</span>
                    <span> | <strong>Carbs: </strong>{dinnerTotal.carb}g</span>
                    <span> | <strong>Fiber: </strong>{dinnerTotal.fiber}g</span>
                </p>
                <hr />
                <button onClick={() => openSearch('dinner')}>Add Food</button>
                <div className='items'>
                    {dinner.map((food) => (
                        <FoodOverview
                            key={food.label}
                            mealType={'dinner'}
                            modifiedFood={food}
                            onDelete={onDeleteFood}
                        />
                    ))}
                </div>
            </div>
            <div className="quadrant">
                <h3>Snack</h3>
                <hr />
                <p>
                    <strong>Calories: </strong>{snackTotal.calories} kcal
                    <span> | <strong>Protein: </strong>{snackTotal.protein}g</span>
                    <span> | <strong>Fat: </strong>{snackTotal.fat}g</span>
                    <span> | <strong>Carbs: </strong>{snackTotal.carb}g</span>
                    <span> | <strong>Fiber: </strong>{snackTotal.fiber}g</span>
                </p>
                <hr />
                <button onClick={() => openSearch('snack')}>Add Food</button>
                <div className='items'>
                    {snack.map((food) => (
                        <FoodOverview
                            key={food.label}
                            mealType={'snack'}
                            modifiedFood={food}
                            onDelete={onDeleteFood}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// The food component added to each meal by a search
function FoodOverview({ mealType, modifiedFood, onDelete }) {
    return (
        <div className="food-overview">
            <h4>{modifiedFood.label}</h4>
            <p>Brand: {modifiedFood.brand || "Generic"}</p>
            <p>Calories: {modifiedFood.calories} kcal</p>
            <button onClick={() => onDelete(mealType, modifiedFood)}>X</button>
        </div>
    );
}

export default Overview;