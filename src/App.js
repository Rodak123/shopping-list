import { Grid, Stack } from '@mui/joy';
import './App.css';
import CardDemo from './components/CardDemo';
import Header from './components/Header';
import CartAdd from './components/CartAdd.js';
import ItemAdd from './components/ItemAdd.js';
import CartName from './components/CartName.js';

function App() {
  return (
    <>
      <div className="App">
        <Stack direction="column" spacing={2}>
          <Header />
          <Stack direction="row" spacing={2} justifyContent="center">
            <CartName />
            <ItemAdd />
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default App;
