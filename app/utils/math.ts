import type { IVector2 } from '~/types';

export const samePosition=(posA:IVector2,posB:IVector2):boolean=>
  posA.x===posB.x&&posA.y===posB.y;

export const addVec=(posA:IVector2,posB:IVector2):IVector2=>({
  x:posA.x+posB.x,
  y:posA.y+posB.y,
});

export const checkCollision=(subject:IVector2,target:IVector2[]):IVector2|null=>
  target.find(pos=>samePosition(subject,pos))||null;

export const isInInterval=(a:number,b:number,target:number):boolean=>
  a<=target&&target<=b;
