import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApi } from './ApiContext';
import axios from 'axios';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
    const { api } = useApi();

    const [selectedShoppingListId, setSelectedShoppingListId] = useState(-1);
    const [selectedShoppingList, setSelectedShoppingList] = useState(null);

    useEffect(() => {
        setSelectedShoppingList(null);
        if (api !== null && selectedShoppingListId !== -1) {
            axios
                .get(api.url + '/user/' + api.id + '/list/' + selectedShoppingListId)
                .then(function (res) {
                    if (res.data) {
                        setSelectedShoppingListId(res.data.id);
                        setSelectedShoppingList(res.data);
                    }
                })
                .catch(function (error) {
                    console.error('Error fetching list:', error);
                    setSelectedShoppingList(null);
                    setSelectedShoppingListId(-1);
                });
        }
    }, [api, selectedShoppingListId]);

    return (
        <PreferencesContext.Provider
            value={{
                shoppingListsPrefs: {
                    selected: selectedShoppingList,
                    selectedId: selectedShoppingListId,
                    setSelectedId: setSelectedShoppingListId,
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