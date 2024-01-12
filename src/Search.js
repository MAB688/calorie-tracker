import './Search.css';
import React, { useState } from "react";
import Popup from './Popup.js'

const API_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=04ca9a3c&app_key=6dfb19ff020f2439e857cee0a0e57732";

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const openPopup = (food) => { setSelectedFood(food); };
    const closePopup = () => { setSelectedFood(null); };

    // Use for partial and enter search
    async function onSearchChange(event) {
        const newQuery = event.target.value;
        setQuery(newQuery);

        if (newQuery.trim() !== "") {
            const fetchedResults = await fetchResults(newQuery);
            setResults(fetchedResults);
        } else {
            setResults([]);
        }
    }

    return (
        <div className="search">
            <h2>Food Search</h2>
            <Form
                onChange={onSearchChange}
                onSubmit={onSearchChange}
                value={query}
            />
            <h3>Results</h3>
            <div id="results">
                <div>
                    {results.map((currFood) => (
                        <Food label={currFood.food.label} onOpenPopup={() => openPopup(currFood.food)} />))}
                </div>
            </div>
            {selectedFood && (<Popup popupFood={selectedFood} onClosePopup={closePopup} />)}
        </div>
    );
}

async function fetchResults(query) {
    try {
        const response = await fetch(`${API_URL}&ingr=${query}`);
        const json = await response.json();
        return json.hints || [];
    } catch (e) {
        throw new Error(e);
    }
}

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

function Food({ label, onOpenPopup }) {
    return (
        <div className="food">
            <h4 onClick={() => onOpenPopup()}>
                {label}
            </h4>
        </div>
    );
}

export default Search;