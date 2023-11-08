import { Grid } from '@mui/joy';
import './App.css';
import Button from './components/Button';
import CardDemo from './components/CardDemo';
import Header from './components/Header';

function App() {
  return (
    <>
      <div className="App">
        <Grid container spacing={2}>
          <Grid md={12}>
            <Header />
          </Grid>
          <Grid md={4}>
            <CardDemo />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
