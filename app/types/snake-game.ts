import type { ISize } from './math';

export type GameScene=
  'MENU'|
  'SETTINGS'|
  'TUTORIAL'|
  'PLAY';

export interface ISnakeGameConfig{
  gridSize:ISize;
}
