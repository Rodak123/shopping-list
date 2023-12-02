import { Stack, Typography } from '@mui/joy';
import './App.css';
import Header from './components/Header';
import ShoppingListName from './components/ShoppingListName';
import ItemAdd from './components/ItemAdd';
import { ApiProvider } from './contexts/ApiContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { useApi } from './contexts/ApiContext';
import CardDemo from './components/CardDemo';

function App() {
    const { apiLoaded } = useApi();

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
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <ShoppingListName />
                                <ItemAdd />
                            </Stack>
                        </Stack>
                        <CardDemo />
                    </div>
                </PreferencesProvider>
            </ApiProvider>
        </>
    );
}

export default App;
