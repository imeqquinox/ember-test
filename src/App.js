import './App.css';
import { useEffect, useState } from 'react';

import NavBar from './components/NavBar';
import JourneyPlanner from './components/JourneyPlanner';
import QuotePage from './components/QuotePage';

function App() {
  const [quoteData, setQuoteData] = useState([]);
  const [found, setFound] = useState(false); 

  useEffect(() => {
    if (quoteData.length === 0) {
      setFound(false);
    } else 
    {
      setFound(true);
    }
  }, [quoteData])

  return (
    <div className="App">
      {found ? 
      <QuotePage 
        quoteData={quoteData}
      /> 
      :
      <>
        <header>
          <NavBar />
          <div className='intro_container'>
            <h1>
              Fast, comfortable travel by <br />
              <span className='highlight'> electric bus</span>
            </h1>
            <p>
              Frequent services between Edinburgh, Dundee, Kinross, Edinburgh Airport <br/>
              and more. Low fares, live tracking and zero emissions.
            </p>
          </div>
          <div className='service_notice'>
            <span>
              All services are running normally. You can track your bus on our live map. 
            </span>
            <a href='/'>Track my bus</a>
          </div>
        </header>
        <JourneyPlanner 
          setQuoteData={setQuoteData}
        />
      </> }
    </div>
  );
}

export default App;
