import './Overview.css';
import React, { useState, useEffect } from "react";

function Overview({ onOpenSearch, breakfast, lunch, dinner, snack }) {
    const [breakfastList, setBreakfastList] = useState([]);
    const [lunchList, setLunchList] = useState([]);
    const [dinnerList, setDinnerList] = useState([]);
    const [snackList, setSnackList] = useState([]);

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
    }, [breakfast]);

    useEffect(() => {
        setLunchList(lunch);
    }, [lunch]);

    useEffect(() => {
        setDinnerList(dinner);
    }, [dinner]);

    useEffect(() => {
        setSnackList(snack);
    }, [snack]);

    return (
        <div className="overview">
            <h2>Meal Overview</h2>
            <div>
                <h3>Breakfast</h3>
                <p>Calories:</p>
                <button onClick={() => openSearch('breakfast')}>Add Food</button>
                <div className='items'>
                    {breakfastList.map((food) => (
                        <FoodOverview
                            modifiedFood={food}
                            onDelete={onDeleteBreakfast}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h3>Lunch</h3>
                <p>Calories:</p>
                <button onClick={() => openSearch('lunch')}>Add Food</button>
                <div className='items'>
                    {lunchList.map((food) => (
                        <FoodOverview
                            modifiedFood={food}
                            onDelete={onDeleteLunch}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h3>Dinner</h3>
                <p>Calories:</p>
                <button onClick={() => openSearch('dinner')}>Add Food</button>
                <div className='items'>
                    {dinnerList.map((food) => (
                        <FoodOverview
                            modifiedFood={food}
                            onDelete={onDeleteDinner}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h3>Snack</h3>
                <p>Calories:</p>
                <button onClick={() => openSearch('snack')}>Add Food</button>
                <div className='items'>
                    {snackList.map((food) => (
                        <FoodOverview
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