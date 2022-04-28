import './App.css';

import NavBar from './components/NavBar';

// To add: 
// - NavBar
// - Header 
// - Journey Planner

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
