import { Stack } from '@mui/joy';
import './App.css';
import Header from './components/Header';
import ItemAdd from './components/ItemAdd.js';
import CartName from './components/CartName.js';
import { ApiProvider } from './contexts/ApiContext';
import ItemPopup from './components/ItemPopup.js';

function App() {
  return (
    <>
      <ApiProvider>
        <div className="App">
          <Stack direction="column" spacing={2}>
            <Header />
            <Stack direction="row" spacing={2} justifyContent="center">
              <CartName />
              <ItemAdd />
            </Stack>
          </Stack>
        </div>
      </ApiProvider>
    </>
  );
}

export default App;
