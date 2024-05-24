import React from 'react';
import Search from '../Search/Search';
import Overview from '../Overview/Overview';
import useSearchInteractions from '../../hooks/useSearchInteractions';
import useMealListManagement from '../../hooks/useMealListManagement';

const Main = () => {
  const {
    mealLists,
    updateMealList,
    deleteFoodItem,
  } = useMealListManagement();

  const {
    isSearchOpen,
    selectedMealType,
    handleOpenSearch,
    handleCloseSearch,
  } = useSearchInteractions();

  return (
    <div>
      {isSearchOpen ? (
        <Search
          mealType={selectedMealType}
          onClose={handleCloseSearch}
          updateMealList={updateMealList}
        />
      ) : (
        <Overview
          onOpenSearch={handleOpenSearch}
          deleteFoodItem={deleteFoodItem}
          mealLists={mealLists}
        />
      )}
    </div>
  );
};

export default Main;
