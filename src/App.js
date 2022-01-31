import 'bulma/css/bulma.min.css';
import Keyboard from './components/keyboard.component'
import './App.css';
import AppHeader from './components/appheader.component';

function App() {
  return (
    <div className="App">
     <div className='container'>
        <header className="level header">
            <AppHeader />
        </header>
        
        <div  class="keyboard">
            <Keyboard/>
             
        </div>
      </div>
     </div>
     
  );
}

export default App;