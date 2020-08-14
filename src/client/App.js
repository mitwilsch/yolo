import React, { useState, useEffect } from 'react';
import useEventListener from '@use-it/event-listener';
import GameCanvas from './GameCanvas';

const App = () => {
// canvas
// -----------------//
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 480;
  document.body.appendChild(canvas);

  // draw image
  // -----------------//

  const sprites = '../../public/Dungeon_Character.svg';
  const tiles = '../../public/Dungeon_Tileset.svg';

  let heroReady = false;
  const heroImage = new Image();
  heroImage.onload = () => {
    heroReady = true;
  };
  heroImage.src = sprites;

  let bgReady = false;
  const bgImage = new Image();
  bgImage.onload = () => {
    bgReady = true;
  };
  bgImage.src = tiles;

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

  // Update
  // -----------------//
  const update = (map) => {
    if (38 in keysDown || 75 in keysDown) { // Player holding Up
      hero.y -= 1;
    }

    if (40 in keysDown || 74 in keysDown) { // down
      hero.y += 1;
    }
    if (37 in keysDown || 72 in keysDown) { // left
      hero.x -= 1;
    }

    if (39 in keysDown || 76 in keysDown) { // right
      hero.x += 1;
    }
    // TODO needs boundary checking somewhere here
    Object.keys(keysDown).forEach((key) => {
      delete keysDown[key];
    });
  };

  // Tile picker
  // -----------------//
  const tilePicker = (tile, x, y) => {
    // 10x10 grid of sprites
    // bgimage image is 160*160

    // tilepicker needs all tiles
    // bgimage alone is 100 tiles
    // most of these can be named? How much automation should this have
    // I want this function to draw based on name. Maybe have one more thing, object of mappings to tileset
    switch (tile) {
      case 'torch':
        // converts x/y to 16tile
        // this should go somewhere higher up, confuses input
        ctx.drawImage(bgImage, 0, 144, 16, 16, x * 16, y * 16, 16, 16);
        break;
      case 'leftWall':
        ctx.drawImage(bgImage, 0, 0, 16, 16, x * 16, y * 16, 16, 16);
        break;
      case 'rightWall':
        ctx.drawImage(bgImage, 80, 0, 16, 16, x * 16, y * 16, 16, 16);
        break;
      case 'topWall':
        ctx.drawImage(bgImage, 17, 0, 16, 16, x * 16, y * 16, 16, 16);
        break;
      case 'bottomWall':
        ctx.drawImage(bgImage, 17, 80, 16, 16, x * 16, y * 16, 16, 16);
        break;
      default:
        console.log('Tile: ', tile, ', Not found.');
        break;
    }
  };

  // Tile maps
  // -----------------//
  const dungeonMap = () => {
    // temporary, ideally we get map from server
    // define our map
    const map = {
      bounds: [],
    };

    // ugly loops to make walls
    for (let i = 0; i < 30; i++) {
      map.bounds.push({ x: 0, y: i, tile: 'leftWall' });
      map.bounds.push({ x: 29, y: i, tile: 'rightWall' });
    }
    for (let i = 0; i < 30; i++) {
      map.bounds.push({ x: i, y: 0, tile: 'topWall' });
      map.bounds.push({ x: i, y: 29, tile: 'bottomWall' });
    }

    return map;
  };

  // Draw game
  // -----------------//
  const drawGame = (map) => {
    // gen floor
    if (bgReady) {
      for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 30; y++) {
          ctx.drawImage(bgImage, 16, 16, 32, 32, x * 16, y * 16, 16, 16);
        }
      }

      for (let i = 0; i < map.bounds.length; i++) {
        tilePicker(map.bounds[i].tile, map.bounds[i].x, map.bounds[i].y);
      }
    }

    if (heroReady) {
      ctx.drawImage(heroImage, 0, 0, 16, 16, hero.x * 16, hero.y * 16, 16, 16);
    }
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

    const map = dungeonMap();
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
