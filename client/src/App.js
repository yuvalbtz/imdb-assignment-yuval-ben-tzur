import './App.css';
import AppTabs from './components/AppTabs'
import Provider from './context/DataMoviesContext'
import {Typography} from '@material-ui/core'
function App() {
  return (
  <Provider>
    <div className="App" style={{width:"100%", height:"90vh"}}>
     <Typography component={'h2'} variant={'body1'}>"Big Fake Dollar Loving Film Studios" - Imdb movies analysis</Typography>
     <AppTabs/>
    </div>
    </Provider>
  );
}

export default App;
