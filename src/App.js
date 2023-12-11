import { Stack, Typography } from '@mui/joy';
import './App.css';
import Header from './components/Header';
import ShoppingListDisplay from './components/ShoppingListDisplay';
import { ApiProvider, useApi } from './contexts/ApiContext';
import { PreferencesProvider } from './contexts/PreferencesContext';

function App() {
    const { apiLoaded, api } = useApi();

    if (apiLoaded === false) {
        return <Typography>Načítání API...</Typography>;
    }

    return (
        <>
            <ApiProvider>
                <PreferencesProvider>
                    <div className="App">
                        <Stack direction="column" spacing={2}>
                            <Header />
                            <ShoppingListDisplay />
                        </Stack>
                    </div>
                </PreferencesProvider>
            </ApiProvider>
        </>
    );
}

export default App;
