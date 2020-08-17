import React from 'react';

const spriteTiles = '../../public/Dungeon_Character.svg';
const bgTiles = '../../public/Dungeon_Tileset.svg';

let heroReady = false;
const heroImage = new Image();
heroImage.onload = () => {
  heroReady = true;
};
heroImage.src = spriteTiles;

let bgReady = false;
const bgImage = new Image();
bgImage.onload = () => {
  bgReady = true;
};
bgImage.src = bgTiles;

const tiles = (ctx, tile, x, y) => {
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
    case 'floor':
      ctx.drawImage(bgImage, 16, 16, 32, 32, x * 16, y * 16, 16, 16);

      break;
    case 'hero':

      ctx.drawImage(heroImage, 0, 0, 16, 16, x * 16, y * 16, 16, 16);
      break;
    default:
      console.log('Tile: ', tile, ', Not found.');
      break;
  }
};

export default tiles;
