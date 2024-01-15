import "./HomePage.css"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';



function HomePage() {
  // List of all meals, each meal contains a list of food
  const [mealsList, setMealsList] = useState([]);
  // State to track selected meals for popup
  const [selectedMeal, setSelectedMeal] = useState(null);



  return (
    <div className="content">
      <h1>Home Page</h1>
    </div>
  );
}


export default HomePage;
