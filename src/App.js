import { Grid, Stack } from '@mui/joy';
import './App.css';
import CardDemo from './components/CardDemo';
import Header from './components/Header';
import CartAdd from './components/CartAdd.js';
import ItemAdd from './components/ItemAdd.js';
import CartName from './components/CartName.js';
import Stack from '@mui/joy/Stack';

function App() {
  return (
    <>
      <div className="App">
        <Stack direction="column" spacing={2}>
          <Header />
          <CardDemo />
        </Stack>
      </div>
    </>
  );
}

export default App;
