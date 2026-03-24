import type { ISize } from './math';

export type GameScene=
  'MENU'|
  'SETTINGS'|
  'TUTORIAL'|
  'PLAY';

export type GameState=
  'PLAY'|
  'GAME-OVER'|
  'WIN';

export interface ISnakeGameConfig{
  gridSize:ISize;
}

export type Movement=
  'up'|
  'left'|
  'down'|
  'right';

export interface IGameAPI{
  start:()=>void,
  attachListeners:()=>void,
  detachListeners:()=>void,
  gameState:Ref<GameState>,
  reset:()=>void,
  score:Ref<number>,
};
