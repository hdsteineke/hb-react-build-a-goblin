import './App.css';
import { useState } from 'react';
import GoblinForm from './GoblinForm';
import GoblinList from './GoblinList';
import Goblin from './Goblin';

function App() {
  /* 
    track: 
      allGoblins, an array of all goblins
      filteredGoblins, a second array of goblins: this one is the filtered version of the above allGoblins array
      Name, which is how we track the user input for the current name of the goblin in the form
      HP, which is how we track the user input for the current HP of the goblin in the form
      Color, which is how we track the user input for the current color of the goblin in the form
*/
  const [allGoblins, setAllGoblins] = useState([{ name: 'Blinky', hp: 5, color: 'blue' }]);
  const [filteredGoblins, setFilteredGoblins] = useState(allGoblins);
  const [goblinFormName, setGoblinFormName] = useState('Boss');
  const [goblinFormHP, setGoblinFormHP] = useState(1);
  const [goblinFormColor, setGoblinFormColor] = useState('purple');
  const [filterQuery, setFilterQuery] = useState(['']);
  
  function submitGoblin(e) {
    e.preventDefault();
    
    // on submit, make a new goblin object with a name that comes from the form state, an hp that comes from the form state, and a color that comes from the form state
    const newGoblin = {
      name: goblinFormName, 
      hp: goblinFormHP, 
      color: goblinFormColor
    };
    // update the allGoblins array. Add the new goblin to the allGoblins array immutably.
    setAllGoblins([...allGoblins, newGoblin]);
    
    // clear out the goblin form state items by setting them to empty strings. This will cause the form to reset in the UI.
    setGoblinFormName('');
    setGoblinFormHP(1);
    setGoblinFormColor('');
  }

  function handleDeleteGoblin(name) {
    // find the index of the goblin in allGoblins with this name
    const deleteIndex = allGoblins.findIndex(goblin => goblin.name === name);

    // use splice to delete the goblin object at this index
    allGoblins.splice(deleteIndex, 1);
    // update the allGoblins array immutably to this new, smaller array
    setAllGoblins([...allGoblins]);
  }

  function handleFilterGoblins(search) {
    // use the filter method to get an array of goblins whose name includes this search argument
    if (search) { 
      const matchingGoblins = allGoblins.filter(goblin => goblin.name.toLowerCase().includes(search.toLowerCase())
      );
    // if there is a search argument, set the filtered goblins to the filtered goblins
      setFilteredGoblins([...matchingGoblins]);
    } else {
      setFilteredGoblins([...allGoblins]);
    }
    // if the search argument is undefined, set the filtered goblins in state to just be the array of all goblins

  }


  return (
    <div className="App">
      <div className='current-goblin quarter'>
        <GoblinForm 
          goblinFormName={goblinFormName}
          setGoblinFormName={setGoblinFormName}
          goblinFormHP={goblinFormHP}
          setGoblinFormHP={setGoblinFormHP}
          goblinFormColor={goblinFormColor}
          setGoblinFormColor={setGoblinFormColor}
          submitGoblin={submitGoblin}
        />
        
        <Goblin goblin={{
          name: goblinFormName,
          hp: goblinFormHP,
          color: goblinFormColor
          /* 
            use the goblin form state to make a goblin object and to display it. 
            This will let the user see the current form state 
          */
        }} handleDeleteGoblin={handleDeleteGoblin}/>
      </div>
      <div className='goblin-filter quarter'>
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input onChange={(e) => handleFilterGoblins(e.target.value)} />
      </div>

      <GoblinList 
        goblins={[]} // this takes in an array of goblins. If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array 
        handleDeleteGoblin={handleDeleteGoblin} // note that the goblin list has access to the ability to delete
      />
    </div>
  );
}

export default App;
