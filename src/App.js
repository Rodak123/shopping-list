import { Grid } from '@mui/joy';
import './App.css';
import CardDemo from './components/CardDemo';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CartAdd from './components/CartAdd.js';
import ItemAdd from './components/ItemAdd.js';
import CartName from './components/CartName.js';
import Stack from '@mui/joy/Stack';

function App() {
  return (
    <>
      <div className="App">
        <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
          <Header />
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <CartName />
            <ItemAdd />
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default App;
