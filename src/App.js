import { Stack, Typography } from '@mui/joy';
import './App.css';
import Auth from './components/Auth/Auth';
import Header from './components/Header';
import Loading from './components/Loading';
import ShoppingListDisplay from './components/ShoppingListDisplay';
import { useApi } from './contexts/ApiContext';
import { PreferencesProvider } from './contexts/PreferencesContext';

function App() {
    const { api, apiLoaded, apiSessionLoaded } = useApi();

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

    if (apiSessionLoaded === false) {
        if (api.loginWithSession()) {
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
                    <Typography textAlign="center">Přihlašování</Typography>
                </Stack>
            );
        } else {
            return (
                <Stack alignItems="center" marginTop={5} spacing={12}>
                    <Typography
                        level="h1"
                        color="primary"
                        variant="plain"
                        noWrap
                        sx={{ width: 300, textAlign: 'center' }}
                    >
                        Nákupní listy
                    </Typography>
                    <Auth />
                </Stack>
            );
        }
    }

    return (
        <>
            <PreferencesProvider>
                <div className="App">
                    <Stack direction="column" spacing={2}>
                        <Header />
                        <ShoppingListDisplay />
                    </Stack>
                </div>
            </PreferencesProvider>
        </>
    );
}

export default App;
