import { Grid } from '@mui/joy';
import './App.css';
import CardDemo from './components/CardDemo';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CartAdd from './components/CartAdd.js';

function App() {
  return (
    <>
      <div className="App">
        <Grid container spacing={0} minHeight={'100vh'}>
          <Grid xs={12}>
            <Header />
            <Grid container spacing={0}>
              <Grid xs={4}>
                <CartAdd />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
