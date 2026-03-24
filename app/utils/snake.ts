import type { IVector2 } from '~/types';
import type { GameSpeed, Direction } from '~/types/snake-game';

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

export const convert=(event:KeyboardEvent):Direction|null=>{
  const key=event.key;

  if(isUp(key))return 'up';
  if(isLeft(key))return 'left';
  if(isRight(key))return 'right';
  if(isDown(key))return 'down';

  return null;
};

export const OPPOSITE_MAP:Record<Direction,Direction>={
  'up':'down',
  'left':'right',
  'down':'up',
  'right':'left',
};

export const isDirectionOpposite=(directionA:Direction,directionB:Direction):boolean=>
  OPPOSITE_MAP[directionA]===directionB;

export const KEY_MAP:Record<Direction,IVector2>={
  'up':{x:0,y:-1},
  'left':{x:-1,y:0},
  'down':{x:0,y:1},
  'right':{x:1,y:0},
};

export const TICK_MODIFIERS:Record<GameSpeed,number>={
  slow:1.5,
  normal:1,
  fast:0.6
};

export const getTickRate=(speed:GameSpeed)=>{
  const baseRate=100;
  return baseRate*TICK_MODIFIERS[speed];
};

