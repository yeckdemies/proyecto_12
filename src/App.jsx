import { Route, Routes } from 'react-router-dom';

import Header from './Components/Header/Header';
import './App.css';

import HomePage from './Pages/HomePage/HomePage';
import SetupPage from './Pages/SetupPage/SetupPage';
import GamePage from './Pages/GamePage/GamePage';
import ScoresPage from './Pages/ScoresPage/ScoresPage';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/setuppage' element={<SetupPage />} />
        <Route path='/gamepage' element={<GamePage />} />
        <Route path='/scorespage' element={<ScoresPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
