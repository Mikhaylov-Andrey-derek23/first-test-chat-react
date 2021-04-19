import './App.css';
import './LongPulling';
import LongPulling from './LongPulling';
import WebSocet from './WebSocet';

function App() {

 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Чат</h1>
      </header>
      <WebSocet/>
    </div>
  );
}

export default App;
