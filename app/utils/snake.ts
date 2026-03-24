import type { IVector2 } from '~/types';
import type { Movement } from '~/types/snake-game';

export const checkWinning=(
  snakeLength:number,
  appleCount:number,
  totalCells:number,
):boolean=>
  snakeLength+appleCount===totalCells;

const isUp=(key:string):boolean=>
  key==='ArrowUp'||key==='w';

const isLeft=(key:string):boolean=>
  key==='ArrowLeft'||key==='a';

const isDown=(key:string):boolean=>
  key==='ArrowDown'||key==='s';

const isRight=(key:string):boolean=>
  key==='ArrowRight'||key==='d';

export const convert=(event:KeyboardEvent):Movement|null=>{
  const key=event.key;

  if(isUp(key))return 'up';
  if(isLeft(key))return 'left';
  if(isRight(key))return 'right';
  if(isDown(key))return 'down';

  return null;
};

export const OPPOSITE_MAP:Record<Movement,Movement>={
  'up':'down',
  'left':'right',
  'down':'up',
  'right':'left',
};

export const isDirectionOpposite=(directionA:Movement,directionB:Movement):boolean=>
  OPPOSITE_MAP[directionA]===directionB;

export const KEY_MAP:Record<Movement,IVector2>={
  'up':{x:0,y:-1},
  'left':{x:-1,y:0},
  'down':{x:0,y:1},
  'right':{x:1,y:0},
};
