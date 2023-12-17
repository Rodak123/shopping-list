import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApi } from './ApiContext';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
    const { api, apiSession } = useApi();

    const [selectedShoppingListId, setSelectedShoppingListId] = useState(-1);
    const [selectedShoppingList, setSelectedShoppingList] = useState(null);

    const [user, setUser] = useState(null);

    const refreshSelected = () => {
        setSelectedShoppingList(null);
        if (api !== null && selectedShoppingListId !== -1) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .get('/user/list/' + selectedShoppingListId)
                .then(function (res) {
                    if (res.data) {
                        setSelectedShoppingListId(res.data.id);
                        setSelectedShoppingList(res.data);
                    }
                })
                .catch(function (error) {
                    console.error('Error fetching list:', error);
                    setSelectedShoppingListId(-1);
                    api.apiFailed(error);
                });
        }
    };

    const fetchUser = () => {
        if (api !== null) {
            setUser(null);
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .get('/user')
                .then(function (res) {
                    if (res.data) {
                        setUser(res.data);
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                });
        }
    };

    useEffect(() => {
        refreshSelected();
    }, [api, selectedShoppingListId]);

    useEffect(() => {
        fetchUser();
    }, [api, apiSession]);

    return (
        <PreferencesContext.Provider
            value={{
                shoppingListsPrefs: {
                    selected: selectedShoppingList,
                    selectedId: selectedShoppingListId,
                    setSelectedId: setSelectedShoppingListId,
                    refreshSelected: refreshSelected,
                },
                userPrefs: {
                    user: user,
                    fetchUser: fetchUser,
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
