import './App.css';
import { useState } from "react";

const API_KEY = "yWYN9ap3LVuWPcjXVPzXSVFpYPgjWL7ohRZKk6xs";
const API_URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}`;

async function fetchResults(query) {
  try {
    const response = await fetch(`${API_URL}&query=${query}`);
    const json = await response.json();
    return json.foods || [];
  } catch (e) {
    throw new Error(e);
  }
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

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

  const openPopup = (food) => {
    setSelectedFood(food);
  };

  const closePopup = () => {
    setSelectedFood(null);
  };

  return (
    <div className="app">
      <main className="main">
        <h2>Food Lookup</h2>
        <Form
          onChange={onSearchChange}
          value={query}
        />
        <h3>Results</h3>
        <div id="results">
          <div>
            {results.map((food) => (
              <Food description={food.description} foodNutrients={food.foodNutrients}
                onOpenPopup={() => openPopup(food)}
              />
            ))}
          </div>
        </div>
        {selectedFood && (
          <Popup food={selectedFood} onClosePopup={closePopup} />
        )}
      </main>
    </div>
  );
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

function Food({ description, foodNutrients, onOpenPopup }) {  
  return (
    <div className="food">
      <h4 onClick={() => onOpenPopup(foodNutrients)}>{description}</h4>
    </div>
  );
}

function Popup({ food, onClosePopup }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{food.description}</h2>
        <ul>
          {food.foodNutrients.map((nutrient, index) => (
            <li key={index}>
              {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
            </li>
          ))}
        </ul>
        <button onClick={onClosePopup}>Close</button>
      </div>
    </div>
  );
}

export default App;