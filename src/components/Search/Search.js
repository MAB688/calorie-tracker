import './Search.css';
import React, { useState } from "react";
import Popup from './Popup'

// API endpoint for food search
const API_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=04ca9a3c&app_key=6dfb19ff020f2439e857cee0a0e57732";

// Search component for finding and adding foods to a meal list
// onClose - Callback function to close the search
// mealType - Type of meal (e.g., breakfast, lunch) being updated
// updateMealList - Callback function to update the meal list
function Search({ onClose, mealType, updateMealList }) {
    // Represents the current search query entered by the user
    const [query, setQuery] = useState("");
    // Represents the list of search results obtained from the food search API
    const [results, setResults] = useState([]);
    // Represents the currently selected food item for detailed view in the food popup
    const [selectedFood, setSelectedFood] = useState(null);
    // Represents the history of search results pages for supporting pagination
    const [pageHistory, setPageHistory] = useState([]);
    // Represents the URL of the next page of search results for pagination
    const [nextPage, setNextPage] = useState("")
    // Represents the list of selected foods chosen by the user during the search
    const [selectedFoodsList, setSelectedFoodsList] = useState([]);

    // Opens the food details popup
    const openPopup = (food) => { setSelectedFood(food); };
    // Close the food details popup
    const closePopup = () => { setSelectedFood(null); };

    // Handles partial search input change 
    async function onSearchChange(event) {
        const newQuery = event.target.value;
        setQuery(newQuery);

        if (newQuery.trim() !== "") {
            const fetchedJson = await fetchJson(newQuery);
            setResults(fetchedJson.hints);
            setPageHistory([]);
            if (fetchedJson._links) {
                setNextPage(fetchedJson._links.next.href);
            } else {
                setNextPage("")
            }
        } else {
            setResults(null);
            setNextPage("");
        }
    }

    //  Handles form submission for full search
    async function onSearchSubmit(event) {
        event.preventDefault();
        const fetchedJson = await fetchJson(query);
        setResults(fetchedJson.hints);
        setNextPage(fetchedJson._links.next.href)
    }

    // Handles loading the next page of search results
    async function onNextPage() {
        if (nextPage) {
            try {
                setPageHistory((prevHistory) => [...prevHistory, results]);
                const response = await fetch(nextPage);
                const json = await response.json();
                setResults(json.hints || []);
                setNextPage(json._links.next.href || "");
                // Scroll to the top
                window.scrollTo({ top: 0, left: 0 });
            } catch (e) {
                throw new Error(e);
            }
        }
    }

    // Handles loading the previous page of search results
    function onPreviousPage() {
        if (pageHistory.length > 0) {
            const previousResults = pageHistory.pop();
            setResults(previousResults);
            window.scrollTo({ top: 0, left: 0 });
        }
    }

    // Add selected food to the list of selected foods
    const onAddFood = (modifiedFood) => {
        if (modifiedFood) {
            setSelectedFoodsList((prevList) => [...prevList, modifiedFood]);
            closePopup();
        }
    }

    // Removes food from the list of selected foods
    const onDeleteFood = (foodToDelete) => {
        setSelectedFoodsList((prevList) =>
            prevList.filter((food) => food !== foodToDelete)
        );
    };

    // Handles the "Done" button click, updating the external meal list
    const onDoneClick = () => {
        updateMealList(mealType, selectedFoodsList);
        onClose();
    };

    // Handles the "Cancel" button click to close the search
    const onCancelClick = () => {
        onClose();  // Call the onClose function passed from Main.js to go back to the overview page
    };

    return (
        <div className="search">
            <h2>Food Search</h2>
            <Form
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                value={query}
            />
            <h3>Results</h3>
            <div className='results-container'>
                <div className="results">
                    <div>
                        {results && results.length > 0 ? (
                            results.map((currFood) => (
                                <Food
                                    label={currFood.food.label}
                                    brand={currFood.food.brand}
                                    onOpenPopup={() => openPopup(currFood)}
                                />
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </div>
                <div className='selected-foods'>
                    <h3>Selected Foods</h3>
                    {selectedFoodsList.length > 0 ? (
                        <div>
                            {selectedFoodsList.map((food, index) => (
                                <FoodPreview
                                    key={index}
                                    modifiedFood={food}
                                    onDelete={onDeleteFood}
                                />
                            ))}
                            <div className='select-buttons'>
                                <button onClick={onCancelClick}>Cancel</button>
                                <button onClick={onDoneClick}>Done</button>
                            </div>
                        </div>
                    ) : (
                        <><p>Add some food!</p><button onClick={onCancelClick}>Cancel</button></>
                    )}
                </div>
            </div>
            {selectedFood && (
                <Popup
                    popupFood={selectedFood}
                    onClosePopup={closePopup}
                    onAddFood={onAddFood}
                />
            )}
            <div className='nav-arrows'>
                {pageHistory.length > 0 && (
                    <button onClick={onPreviousPage}>←</button>
                )}
                {nextPage && (
                    <button onClick={onNextPage}>→</button>
                )}
            </div>
        </div>
    );
}

// Fetches JSON data from the food search API
async function fetchJson(query) {
    try {
        const response = await fetch(`${API_URL}&ingr=${query}`);
        const json = await response.json();
        return json || [];
    } catch (e) {
        throw new Error(e);
    }
}

// Form component for the search input
function Form({ onSubmit, onChange, value }) {
    return (
        <form className="search-form" onSubmit={onSubmit}>
            <input
                id="search"
                type="text"
                placeholder="Enter food"
                onChange={onChange}
                value={value}
            />
        </form>
    );
}

// Food component to be displayed as search results
function Food({ label, brand, onOpenPopup }) {
    const displayBrand = brand && brand.trim() !== "" ? brand : "Generic";

    return (
        <div className="food" onClick={() => onOpenPopup()}>
            <span className="food-label">{label}</span>
            <span className="food-brand">{displayBrand}</span>
        </div>
    );
}

// Food preview to be displayed in the food preview list during search
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

export default Search;