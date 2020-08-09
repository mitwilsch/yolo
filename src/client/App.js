import React, { useState, useEffect } from 'react';
import useEventListener from '@use-it/event-listener';
import GameCanvas from './GameCanvas';

const App = () => {
  const [playerLoc, setPlayerLoc] = useState([0, 0]);
  const [oldPlayer, setOldPlayer] = useState([0, 0]);

  const [gameState, setGameState] = useState({ size: [63, 44], bounds: [] });

  const loadState = () => {
    // sets objects in bounds, according to type
    // gets data from JSON gameboard (buildings, walls, playerstart etc)
    const walls = ['[5,5]', '[5,4]'];

    setGameState({ ...gameState, bounds: walls });
  };

  const moveCheck = (nextMove, oldMove) => {
  // nextMove is [x,y]
    // checks game board for legal moves
    const bounds = [(1024 / 16) - 1, (720 / 16) - 1];
    if (gameState.bounds.includes(JSON.stringify(nextMove))) {
      console.log('bump');
      return;
    }

    if (nextMove[0] > bounds[0]) {
      // move is within bounds X
      console.log('out of bounds');
      return;
    }

    if (nextMove[1] > bounds[1]) {
      // move is within bounds Y
      console.log('out of bounds');
      return;
    }

    setPlayerLoc(nextMove);
    setOldPlayer(oldMove);
  };

  const movePlayer = (direction) => {
    // find player in game arr
    // move player

    // window = 1024/720
    // this needs arr of obstacles to disallow moving into
    // maybe an intermediate controller, with layouts and current bosses locations

    switch (direction) {
      case 'up':
        moveCheck([playerLoc[0], playerLoc[1] - 1], playerLoc);
        break;
      case 'down':
        moveCheck([playerLoc[0], playerLoc[1] + 1], playerLoc);
        break;

      case 'left':
        moveCheck([playerLoc[0] - 1, playerLoc[1]], playerLoc);
        break;

      case 'right':
        moveCheck([playerLoc[0] + 1, playerLoc[1]], playerLoc);
        break;
    }
  };
  const handler = ({ key }) => {
    switch (key.toLowerCase()) {
      case 'h':
        movePlayer('left');
        break;
      case 'j':
        movePlayer('down');
        break;
      case 'k':
        movePlayer('up');
        break;
      case 'l':
        movePlayer('right');
        break;
      default:
        console.log(key);
    }
  };

  useEventListener('keydown', handler);

  useEffect(() => {
    loadState();
  }, []);

  return <GameCanvas playerLoc={playerLoc} oldPlayer={oldPlayer} />;
};

export default App;
