import './Main.css';
import React, { useState } from "react";
import Search from './Search.js'
import Overview from './Overview.js';

function Main() {
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [selectedMealType, setSelectedMealType] = useState('');

    const [mealLists, setMealLists] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
    });

    const openSearch = (mealType) => {
        setSearchOpen(true);
        setSelectedMealType(mealType);
    };

    const closeSearch = () => {
        setSearchOpen(false);
    };

    const updateMealList = (mealType, selectedFoodsList) => {
        setMealLists((prevLists) => ({
            ...prevLists,
            [mealType]: prevLists[mealType].concat(selectedFoodsList),
        }));
    };

    const deleteFoodItem = (mealType, foodToDelete) => {
        setMealLists((prevLists) => ({
            ...prevLists,
            [mealType]: prevLists[mealType].filter((food) => food !== foodToDelete),
        }));
    };

    return (
        <div>
            {isSearchOpen ? (
                <Search mealType={selectedMealType} onClose={closeSearch} updateMealList={updateMealList} />
            ) : (
                <Overview onOpenSearch={openSearch} deleteFoodItem={deleteFoodItem} mealLists={mealLists} />
            )}
        </div>
    );
}

export default Main;