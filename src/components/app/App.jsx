import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChampionsList from '../championsList/ChampionsList';
import Navigation from '../navigation/Navigation';
import ChampInfoPage from '../pages/ChampInfoPage';
import Page404 from '../pages/Page404';
import { ThemeProvider } from '../../providers/ThemeProvider';




import './app.scss';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className='app'>
          <Navigation />
          <Routes>
            <Route path='/lolApp/' element={<ChampionsList />} />
            <Route path='/champion/:champName' element={<ChampInfoPage />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
