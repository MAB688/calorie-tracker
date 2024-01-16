import './Overview.css';
import React, { useState, useEffect } from "react";

function Overview({ onOpenSearch, breakfast, lunch, dinner, snack }) {
    const [breakfastList, setBreakfastList] = useState([]);
    const [lunchList, setLunchList] = useState([]);
    const [dinnerList, setDinnerList] = useState([]);
    const [snackList, setSnackList] = useState([]);

    const [breakfastTotal, setBreakfastTotal] = useState(0);
    const [lunchTotal, setLunchTotal] = useState(0);
    const [dinnerTotal, setDinnerTotal] = useState(0);
    const [snackTotal, setSnackTotal] = useState(0);

    const [totalCalories, setTotalCalories] = useState(0);

    const openSearch = (mealType) => {
        onOpenSearch(mealType);
    };

    const onDeleteBreakfast = (foodToDelete) => {
        setBreakfastList((prevList) =>
            prevList.filter((food) => food !== foodToDelete)
        );
    };

    const onDeleteLunch = (foodToDelete) => {
        setLunchList((prevList) =>
            prevList.filter((food) => food !== foodToDelete)
        );
    };

    const onDeleteDinner = (foodToDelete) => {
        setDinnerList((prevList) =>
            prevList.filter((food) => food !== foodToDelete)
        );
    };

    const onDeleteSnack = (foodToDelete) => {
        setSnackList((prevList) =>
            prevList.filter((food) => food !== foodToDelete)
        );
    };

    useEffect(() => {
        setBreakfastList(breakfast);
        const total = breakfast.reduce((sum, food) => sum + Number(food.calories), 0);
        setBreakfastTotal(total);
    }, [breakfast]);

    useEffect(() => {
        setLunchList(lunch);
        const total = lunch.reduce((sum, food) => sum + Number(food.calories), 0);
        setLunchTotal(total);
    }, [lunch]);

    useEffect(() => {
        setDinnerList(dinner);
        const total = dinner.reduce((sum, food) => sum + Number(food.calories), 0);
        setDinnerTotal(total);
    }, [dinner]);

    useEffect(() => {
        setSnackList(snack);
        const total = snack.reduce((sum, food) => sum + Number(food.calories), 0);
        setSnackTotal(total);
    }, [snack]);

    useEffect(() => {
        // Calculate and set total calorie count
        const total = breakfastTotal + lunchTotal + dinnerTotal + snackTotal;
        setTotalCalories(total);
    }, [breakfastTotal, lunchTotal, dinnerTotal, snackTotal]);

    return (
        <div className="overview">
        <div className="header">
        <h2>Meal Overview</h2>
        <p>Total Calories: {totalCalories}</p>
        </div>
            <div className="quadrant">
                <h3>Breakfast</h3>
                <p>Calories: {breakfastTotal}</p>
                <button onClick={() => openSearch('breakfast')}>Add Food</button>
                <div className='items'>
                    {breakfastList.map((food) => (
                        <FoodOverview
                            key={food.label}
                            modifiedFood={food}
                            onDelete={onDeleteBreakfast}
                        />
                    ))}
                </div>
            </div>
            <div className="quadrant">
                <h3>Lunch</h3>
                <p>Calories: {lunchTotal}</p>
                <button onClick={() => openSearch('lunch')}>Add Food</button>
                <div className='items'>
                    {lunchList.map((food) => (
                        <FoodOverview
                            key={food.label}
                            modifiedFood={food}
                            onDelete={onDeleteLunch}
                        />
                    ))}
                </div>
            </div>
            <div className="quadrant">
                <h3>Dinner</h3>
                <p>Calories: {dinnerTotal}</p>
                <button onClick={() => openSearch('dinner')}>Add Food</button>
                <div className='items'>
                    {dinnerList.map((food) => (
                        <FoodOverview
                            key={food.label}
                            modifiedFood={food}
                            onDelete={onDeleteDinner}
                        />
                    ))}
                </div>
            </div>
            <div className="quadrant">
                <h3>Snack</h3>
                <p>Calories: {snackTotal}</p>
                <button onClick={() => openSearch('snack')}>Add Food</button>
                <div className='items'>
                    {snackList.map((food) => (
                        <FoodOverview
                            key={food.label}
                            modifiedFood={food}
                            onDelete={onDeleteSnack}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

function FoodOverview({ modifiedFood, onDelete }) {
    return (
        <div className="food-overview">
            <h4>{modifiedFood.label}</h4>
            <p>Brand: {modifiedFood.brand || "Generic"}</p>
            <p>Calories: {modifiedFood.calories} kcal</p>
            <button onClick={() => onDelete(modifiedFood)}>X</button>
        </div>
    );
}

export default Overview;