import React, { createContext, useContext, useEffect, useState } from 'react';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
    const [selectedShoppingList, setSelectedShoppingList] = useState(-1);

    return (
        <PreferencesContext.Provider
            value={{
                shoppingListsPrefs: {
                    selected: selectedShoppingList,
                    setSelected: setSelectedShoppingList,
                },
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = () => {
    return useContext(PreferencesContext);
};
