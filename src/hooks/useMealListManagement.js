import { useState } from 'react';

const useMealListManagement = () => {
  const [mealLists, setMealLists] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  });

  const updateMealList = (mealType, selectedFoodsList) => {
    setMealLists((prevLists) => ({
      ...prevLists,
      [mealType]: [...prevLists[mealType], ...selectedFoodsList],
    }));
  };

  const deleteFoodItem = (mealType, foodToDelete) => {
    setMealLists((prevLists) => ({
      ...prevLists,
      [mealType]: prevLists[mealType].filter((food) => food !== foodToDelete),
    }));
  };

  return {
    mealLists,
    updateMealList,
    deleteFoodItem,
  };
};

export default useMealListManagement;
