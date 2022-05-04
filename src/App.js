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
  const [goblins, setGoblins] = useState([]);
  const [filteredGoblins, setFilteredGoblins] = useState(goblins);
  const [name, setName] = useState('');
  const [HP, setHP] = useState(1);
  const [color, setColor] = useState('');
  const [filterQuery, setFilterQuery] = useState(['']);
  
  function submitGoblin(e) {
    e.preventDefault();
    
    // on submit, make a new goblin object with a name that comes from the form state, an hp that comes from the form state, and a color that comes from the form state
    const newGoblin = {
      name, 
      HP, 
      color
    };
    // update the allGoblins array. Add the new goblin to the allGoblins array immutably.
    setGoblins([...goblins, newGoblin]);
    
    // clear out the goblin form state items by setting them to empty strings. This will cause the form to reset in the UI.
    setName('');
    setHP(1);
    setColor('');
  }

  function handleDeleteGoblin(name) {
    // find the index of the goblin in allGoblins with this name
    const deleteIndex = goblins.findIndex(goblin => goblin.name === name);

    // use splice to delete the goblin object at this index
    goblins.splice(deleteIndex, 1);
    // update the allGoblins array immutably to this new, smaller array
    setGoblins([...goblins]);
  }

  function handleFilterGoblins(search) {
    // use the filter method to get an array of goblins whose name includes this search argument
    if (search) { 
      const matchingGoblins = goblins.filter(goblin => goblin.name.toLowerCase().includes(search.toLowerCase())
      );
    // if there is a search argument, set the filtered goblins to the filtered goblins
      setFilteredGoblins([...matchingGoblins]);
    } else {
      setFilteredGoblins([...goblins]);
    }
    // if the search argument is undefined, set the filtered goblins in state to just be the array of all goblins

  }


  return (
    <div className="App">
      <div className='current-goblin quarter'>
        <Goblin goblin={{
          /* 
            use the goblin form state to make a goblin object and to display it. 
            This will let the user see the current form state 
          */
        }}/>
      </div>
      <div className='goblin-filter quarter'>
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input onChange={(e) => handleFilterGoblins(e.target.value)} />
      </div>
      {/* < 
        /*
        This component takes in a ton of props! 
        Here is the list of props to pass:
          submitGoblin,
          Name, 
          setName,
          Color, 
          setColor,
          HP, 
          setHP,
        */
        /> */}
      <GoblinList 
        goblins={[]} // this takes in an array of goblins. If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array 
        handleDeleteGoblin={handleDeleteGoblin} // note that the goblin list has access to the ability to delete
      />
    </div>
  );
}

export default App;
