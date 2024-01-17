import './Main.css';
import React, { useState } from "react";
import Search from './Search.js'
import Overview from './Overview.js';

// Main component that serves as the entry point for the application
function Main() {
    // State to track whether the search component is open
    const [isSearchOpen, setSearchOpen] = useState(false);
    // State to store the selected meal type during a search
    const [selectedMealType, setSelectedMealType] = useState('');
    // State to manage meal lists for different meal types
    const [mealLists, setMealLists] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
    });

    // Function to open the search component for a specific meal type
    const openSearch = (mealType) => {
        setSearchOpen(true);
        setSelectedMealType(mealType);
    };

    // Function to close the search component
    const closeSearch = () => {
        setSearchOpen(false);
    };

    // Function to update a meal list with selected foods
    const updateMealList = (mealType, selectedFoodsList) => {
        setMealLists((prevLists) => ({
            ...prevLists,
            [mealType]: prevLists[mealType].concat(selectedFoodsList),
        }));
    };

    // Function to delete a food item from a specific meal type
    const deleteFoodItem = (mealType, foodToDelete) => {
        setMealLists((prevLists) => ({
            ...prevLists,
            [mealType]: prevLists[mealType].filter((food) => food !== foodToDelete),
        }));
    };

    // Render the Search or Overview component based on the search state
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