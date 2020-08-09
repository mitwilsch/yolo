import React, { useState, useEffect } from 'react';
import useEventListener from '@use-it/event-listener';

const sprites = '../../public/Dungeon_Character.svg';
const tiles = '../../public/Dungeon_Tileset.svg';

const bounds = [(1024 / 16) - 1, (720 / 16) - 1];
// bounds 16x16 pixels, for 1024x720 screen size
//
const game = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = 1024;
    this.canvas.height = 720;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
};

function Tile(name, x, y) {
  const tile = {
    spliceLoc: [], x, y, img,
  };
  switch (name) {
    case 'player':
      tile.img = sprites;
      tile.spliceLoc = [0, 0];
      break;
    case 'floor':
      tile.img = tiles;
      tile.spliceLoc = [16, 16];
      break;
    default:
      console.log('invalid selection');
      return;
  }
  this.width = 16;
  this.height = 16;
  this.x = x;
  this.y = y;

  const ctx = game.context;

  const img = new Image();

  img.onload = () => {
    ctx.drawImage(img, tile.spliceLoc[0], tile.spliceLoc[1], 16, 16, this.x * 16, this.y * 16, 16, 16);
  };
  img.src = tile.img;
}

const GameCanvas = (props) => {
  const { playerLoc, oldPlayer } = props;
  // can expand monsters, scenery, etc in this
  useEffect(() => {
    game.start();
    const floor = () => {
      for (let i = 0; i < bounds[0]; i++) {
        for (let j = 0; j < bounds[1]; j++) {
          const t = new Tile('floor', i, j);
        }
      }
    };
    floor();
  }, []);

  useEffect(() => {
    const player = new Tile('player', playerLoc[0], playerLoc[1]);
    const floor = new Tile('floor', oldPlayer[0], oldPlayer[1]);
    // this should 'clean-up' old sprite
    // note it does not replace anything but floor
    //
    // preload, lazy load?
  }, [playerLoc]);
  return (
    <div />
  );
};

export default GameCanvas;
