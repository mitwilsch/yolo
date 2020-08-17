import React from 'react';
import tiles from './tiles.js';
import makeMap from './map.js';

const map = makeMap();

const App = () => {
// canvas
// -----------------//
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 480;
  document.body.appendChild(canvas);

  // game objects
  // -----------------//
  const hero = {
    speed: 16, // movement in pixels (one square/s)
    x: 0,
    y: 0,
  };

  // Key listener
  // -----------------//
  const keysDown = {};

  addEventListener('keydown', (e) => {
    keysDown[e.keyCode] = true;
    // console.log('key: ', e.keyCode);
  }, false);

  addEventListener('keyup', (e) => {
    delete keysDown[e.keyCode];
  }, false);

  // move checker
  // -----------------//
  const checkMove = (barriers, move) => {
    const solids = barriers.find((el) => el.x === hero.x && el.y === hero.y && el.isSolid);
    // if block moving to has solid, return true
    if (solids) {
      return solids;
    }
    return false;
  };

  // Update
  // -----------------//
  const update = (map) => {
    if (38 in keysDown || 75 in keysDown) { // Player holding Up
      hero.y -= 1;
      if (checkMove(map.bounds, hero)) {
        hero.y += 1;
      }
    }

    if (40 in keysDown || 74 in keysDown) { // down
      hero.y += 1;
      if (checkMove(map.bounds, hero)) {
        hero.y -= 1;
      }
    }
    if (37 in keysDown || 72 in keysDown) { // left
      hero.x -= 1;
      if (checkMove(map.bounds, hero)) {
        hero.x += 1;
      }
    }

    if (39 in keysDown || 76 in keysDown) { // right
      hero.x += 1;
      if (checkMove(map.bounds, hero)) {
        hero.x -= 1;
      }
    }
    Object.keys(keysDown).forEach((key) => {
      delete keysDown[key];
    });
  };

  // Draw game
  // -----------------//
  const drawGame = (map) => {
    // this should run once at startup, to draw buildings, floors, etc
    // second function should replace sprites when character moves

    // gen floor

    const floorGen = () => {
      for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 30; y++) {
          tiles(ctx, 'floor', x, y);
        }
      }

      for (let i = 0; i < map.bounds.length; i++) {
        tiles(ctx, map.bounds[i].tile, map.bounds[i].x, map.bounds[i].y);
      }
    };

    floorGen();
    // lift this out of drawGame, should be run once on game start
    // additional player moving function can redraw broken floor
    tiles(ctx, 'hero', hero.x, hero.y);
  };

  // Reset
  // -----------------//
  const reset = () => {
    hero.x = 10;
    hero.y = 10;
  };

  // Main
  // -----------------//
  const main = () => {
    const now = Date.now();
    const delta = now - then;

    // updates character movement
    update(map);
    // Draws background
    // Runs on every loop
    // Draws objects to canvas
    drawGame(map);
    then = now;
    // loops on animation frame
    requestAnimationFrame(main);
  };

  let then = Date.now();

  reset();

  main();

  return (
    <div>
      {/* }
    <img src={tiles} />
    { */}
    </div>
  );
};

export default App;

/* Checklist:
 * Draws other sprites (enemies)
 * enemies move randomly
 * enemies can be killed by touch contact
 * enemies have health
 *
 * draws buildings
 * contact with building launched dialog
 * player has inventory, health, attack
 * player can be killed
 *
 * player can move diagonally
 *
 */
