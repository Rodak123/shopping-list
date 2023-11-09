import { Grid } from '@mui/joy';
import './App.css';
import CardDemo from './components/CardDemo';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const gridSpacing = 2;

  return (
    <>
      <div className="App">
        <Grid container spacing={0}>
          <Grid xs={2} minHeight={'100vh'}>
            <Sidebar />
          </Grid>
          <Grid xs={10}>
            <Header />
            <Grid container spacing={0}>
              <Grid xs={4}>
                <CardDemo />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
