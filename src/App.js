import './App.css';
import { Routes, Route } from 'react-router-dom';

import QuotePage from './pages/QuotePage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/quote' element={<QuotePage />} />
      </Routes>
    </div>
  );
}

export default App;
