import './Overview.css';
import React, { useState, useEffect } from "react";

function Overview({ onOpenSearch, deleteFoodItem, mealLists }) {
    const { breakfast, lunch, dinner, snack } = mealLists;

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
        carbs: 0,
        fiber: 0,
    });
    const [dinnerTotal, setDinnerTotal] = useState({
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
    });
    const [snackTotal, setSnackTotal] = useState({
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
    });

    const [totalNutrients, setTotalNutrients] = useState({
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
    });

    const openSearch = (mealType) => {
        onOpenSearch(mealType);
    };

    const onDeleteFood = (mealType, foodToDelete) => {
        deleteFoodItem(mealType, foodToDelete);
    };

    useEffect(() => {
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

        updateMealTotal('breakfast', breakfast);
        updateMealTotal('lunch', lunch);
        updateMealTotal('dinner', dinner);
        updateMealTotal('snack', snack);

        const totalNutrient = calculateNutrientTotal([
            ...breakfast,
            ...lunch,
            ...dinner,
            ...snack,
        ]);
        setTotalNutrients(totalNutrient);
    }, [breakfast, lunch, dinner, snack]);


        // Function to format the current date as "MM/DD/YYYY"
        const getCurrentDate = () => {
            const now = new Date();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const year = now.getFullYear();
            return `${month}/${day}/${year}`;
        };

    return (
        <div className="overview">
            <div className="header">
                <h2>{`Meal Overview - ${getCurrentDate()}`}</h2>
                <p>Total Calories: {totalNutrients.calories}</p>
                <p>Total Protein: {totalNutrients.protein}</p>
                <p>Total Fat: {totalNutrients.fat}</p>
                <hr />
            </div>
            <div className="quadrant">
                <h3>Breakfast</h3>
                <p>Calories: {breakfastTotal.calories}</p>
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
                <p>Calories: {lunchTotal.calories}</p>
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
                <p>Calories: {dinnerTotal.calories}</p>
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
                <p>Calories: {snackTotal.calories}</p>
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