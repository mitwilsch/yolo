import React from 'react';

// Tile maps
// -----------------//
const makeMap = () => {
  // temporary, ideally we get map from server
  // define our map
  const map = {
    bounds: [],
  };

  // ugly loops to make walls
  for (let i = 0; i < 30; i++) {
    map.bounds.push({
      x: 0, y: i, tile: 'leftWall', isSolid: true,
    });
    map.bounds.push({
      x: 29, y: i, tile: 'rightWall', isSolid: true,
    });
  }
  for (let i = 0; i < 30; i++) {
    map.bounds.push({
      x: i, y: 0, tile: 'topWall', isSolid: true,
    });
    map.bounds.push({
      x: i, y: 29, tile: 'bottomWall', isSolid: true,
    });
  }

  return map;
};

export default makeMap;
