import React from 'react';
import Goblin from './Goblin';

export default function GoblinList(props) {
  return (
    <div className='goblin-list quarter'>
      
      {props.goblins.map((goblin, i) => 
        <Goblin key={`${goblin.name}-${goblin.hp}-${i}`}
          goblin={goblin}
          handleDeleteGoblin={props.handleDeleteGoblin}
        />
      )}
    </div>
  );
}
