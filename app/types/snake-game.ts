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

export type GameSpeed='slow'|'normal'|'fast';

export interface ISnakeGameConfig{
  gridSize:ISize;
  appleCount:number;
  showGrid:boolean;
  speed:GameSpeed;
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
  error:Ref<string>,
  begin:Ref<boolean>,
};
