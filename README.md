# Meal Tracking Project

## Overview

This project is a web application for tracking nutrient intake throughout the day. Users can add and remove food items for different meals, and the application calculates and displays the total calories, protein, fat, carbohydrates, and fiber consumed for each meal and the entire day.

## Features

- **Meal Overview:** Provides a comprehensive overview of meals, displaying total calories and nutrient breakdowns for breakfast, lunch, dinner, and snacks.

- **Food Search:** Allows users to search for foods using the Edamam API, providing detailed nutritional information for selected items.

- **Add and Delete Foods:** Users can add selected foods to their meals and remove items they no longer want to track.

- **Serving Size Adjustment:** Users can adjust serving sizes and see real-time updates to the nutritional values.

- **Responsive UI:** Each component will dynamically resize depending on page size and the number of food items it contains.

## Technologies Used

- **React:** The project is built using the React library, providing a modular and efficient way to manage components and state.

- **Edamam API:** An external API is utilized to fetch detailed nutritional information for a wide variety of foods.

- **CSS:** Cascading Style Sheets are employed for styling, ensuring an aesthetically pleasing and responsive design.

## Getting Started

Dependencies: Git, Node.js

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/MAB688/meal-tracker.git`
2. Navigate to the project directory: `cd meal-tracker`
3. Install dependencies: `npm install`
4. Start the application: `npm start`

The application should now be accessible at [http://localhost:3000](http://localhost:3000).

## Project Structure

- **Main Component:** Manages the overall structure, state, and navigation of the application.
- **Search Component:** Handles food search, selection, and addition to meals.
- **Overview Component:** Displays meal overviews and manages nutrient tracking logic.
- **Popup Component:** Represents a popup for selected foods, allowing serving size adjustment.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for your purposes.
