import { Stack, Typography } from '@mui/joy';
import './App.css';
import Header from './components/Header';
import Loading from './components/Loading';
import ShoppingListDisplay from './components/ShoppingListDisplay';
import { ApiProvider, useApi } from './contexts/ApiContext';
import { PreferencesProvider } from './contexts/PreferencesContext';

function App() {
    const { apiLoaded, api } = useApi();

    if (apiLoaded === false) {
        return (
            <Stack
                sx={{
                    minHeight: '100vh',
                    minWidth: '100vw',
                }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Loading />
                <Typography textAlign="center">Načítání API</Typography>
            </Stack>
        );
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
