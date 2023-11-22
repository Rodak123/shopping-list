import { Stack } from '@mui/joy';
import './App.css';
import Header from './components/Header';
import ItemAdd from './components/ItemAdd';
import ShoppingListName from './components/ShoppingListName';
import { ApiProvider } from './contexts/ApiContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { useState } from 'react';

function App() {
    return (
        <>
            <ApiProvider>
                <PreferencesProvider>
                    <div className="App">
                        <Stack direction="column" spacing={2}>
                            <Header />
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <ShoppingListName />
                                <ItemAdd />
                            </Stack>
                        </Stack>
                    </div>
                </PreferencesProvider>
            </ApiProvider>
        </>
    );
}

export default App;
