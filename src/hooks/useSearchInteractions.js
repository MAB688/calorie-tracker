import { useState } from 'react';

const useSearchInteractions = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('');

  const handleOpenSearch = (mealType) => {
    setSelectedMealType(mealType);
    setSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setSelectedMealType('');
    setSearchOpen(false);
  };

  return {
    isSearchOpen,
    selectedMealType,
    handleOpenSearch,
    handleCloseSearch,
  };
};

export default useSearchInteractions;
