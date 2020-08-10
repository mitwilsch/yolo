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

  let heroReady = false;
  const heroImage = new Image();
  heroImage.onload = () => {
    heroReady = true;
  };
  heroImage.src = sprites;

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
    console.log('keysdown', keysDown);
  }, false);

  addEventListener('keyup', (e) => {
    delete keysDown[e.keyCode];
  }, false);

  const update = function (modifier) {
    if (38 in keysDown) { // Player holding Up
      hero.y -= hero.speed * modifier;
    }

    if (40 in keysDown) { // down
      hero.y += hero.speed * modifier;
    }

    if (37 in keysDown) { // left
      hero.x -= hero.speed * modifier;
    }

    if (39 in keysDown) { // right
      hero.x += hero.speed * modifier;
    }

    Object.keys(keysDown).forEach((key) => {
      delete keysDown[key];
    });
  };
  // Draw game
  // -----------------//
  const drawGame = () => {
    if (heroReady) {
      ctx.drawImage(heroImage, 0, 0, 16, 16, hero.x, hero.y, 16, 16);
    }
  };

  // Reset
  // -----------------//
  const reset = () => {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
  };

  // Main
  // -----------------//
  const main = () => {
    const now = Date.now();
    const delta = now - then;

    update(1);
    drawGame();

    then = now;

    requestAnimationFrame(main);
  };

  let then = Date.now();
  reset();
  main();
  return <div />;
};

export default App;
