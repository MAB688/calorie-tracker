import './Main.css';
import React, { useState } from "react";
import Search from './Search.js'
import Overview from './Overview.js';

function Main() {
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [selectedMealType, setSelectedMealType] = useState('');

    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snack, setSnack] = useState([]);

    const openSearch = (mealType) => {
        setSearchOpen(true);
        setSelectedMealType(mealType);
    };

    const closeSearch = () => {
        setSearchOpen(false);
    };

    const updateMealList = (mealType, selectedFoodsList) => {
        switch (mealType) {
            case 'breakfast':
                setBreakfast(breakfast.concat(selectedFoodsList));
                break;
            case 'lunch':
                setLunch(lunch.concat(selectedFoodsList));
                break;
            case 'dinner':
                setDinner(dinner.concat(selectedFoodsList));
                break;
            case 'snack':
                setSnack(snack.concat(selectedFoodsList));
                break;
            default:
                break;
        }
    };

    return (
        <div>
            {isSearchOpen ? (
                <Search mealType={selectedMealType} onClose={closeSearch} updateMealList={updateMealList} />
            ) : (
                <Overview onOpenSearch={openSearch} breakfast={breakfast} lunch={lunch} dinner={dinner} snack={snack} />
            )}
        </div>
    );
}

export default Main;