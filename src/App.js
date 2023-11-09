import { Grid } from '@mui/joy';
import './App.css';
import CardDemo from './components/CardDemo';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <div className="App">
        <Grid container spacing={0} minHeight={'100vh'}>
          <Grid xs={2}>
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
