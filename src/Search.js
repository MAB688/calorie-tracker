import './Search.css';
import React, { useState } from "react";
import Popup from './Popup.js'

const API_URL = "https://api.edamam.com/api/food-database/v2/parser?app_id=04ca9a3c&app_key=6dfb19ff020f2439e857cee0a0e57732";

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [pageHistory, setPageHistory] = useState([]);
    const [nextPage, setNextPage] = useState("")
    const openPopup = (food) => { setSelectedFood(food); };
    const closePopup = () => { setSelectedFood(null); };

    // Use for partial and enter search
    async function onSearchChange(event) {
        const newQuery = event.target.value;
        setQuery(newQuery);

        if (newQuery.trim() !== "") {
            const fetchedJson = await fetchJson(newQuery);
            setResults(fetchedJson.hints);
            //setPageHistory((prevHistory) => [...prevHistory, fetchedJson.hints]);
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

    async function onSearchSubmit(event) {
        event.preventDefault();
        const fetchedJson = await fetchJson(query);
        setResults(fetchedJson.hints);
        //setPageHistory((prevHistory) => [...prevHistory, fetchedJson.hints]);
        setNextPage(fetchedJson._links.next.href)
    }

    async function onNextPage() {
        if (nextPage) {
            try {
                setPageHistory((prevHistory) => [...prevHistory, results]);
                const response = await fetch(nextPage);
                const json = await response.json();
                setResults(json.hints || []);
                //setPageHistory((prevHistory) => [...prevHistory, json.hints]);
                setNextPage(json._links.next.href || "");
                // Scroll to the top
                window.scrollTo({ top: 0, left: 0 });
            } catch (e) {
                throw new Error(e);
            }
        }
    }

    function onPreviousPage() {
        if (pageHistory.length > 0) {
            const previousResults = pageHistory.pop();
            setResults(previousResults);
            window.scrollTo({ top: 0, left: 0 });
        }
    }

    return (
        <div className="search">
            <h2>Food Search</h2>
            <Form
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                value={query}
            />
            <h3>Results</h3>
            <div id="results">
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
            {selectedFood && (<Popup popupFood={selectedFood} onClosePopup={closePopup} />)}
            <br></br>
            {pageHistory.length > 0 && (
                <button onClick={onPreviousPage}>Previous Page</button>
            )}
            {nextPage && (
                <button onClick={onNextPage}>Next Page</button>
            )}
        </div>
    );
}

async function fetchJson(query) {
    try {
        const response = await fetch(`${API_URL}&ingr=${query}`);
        const json = await response.json();
        return json || [];
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

function Food({ label, brand, onOpenPopup }) {
    const displayBrand = brand && brand.trim() !== "" ? brand : "Generic";

    return (
        <div className="food" onClick={() => onOpenPopup()}>
            <span className="food-label">{label}</span>
            <span className="food-brand">{displayBrand}</span>
        </div>
    );
}

export default Search;