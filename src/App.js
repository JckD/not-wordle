import 'bulma/css/bulma.min.css';
import Keyboard from './components/keyboard.component'
import './App.css';

function App() {
  return (
    <div className="App">
     <div className='container'>
        <header className=" level ">
            <div class="level-item ">
               <h1 class="title is-2 $title-color">NOT WORDLE</h1> 
            </div>
        </header>
        

        <div  class="keyboard">
            <Keyboard/>
             
        </div>
      </div>
     </div>
     
  );
}

export default App;
