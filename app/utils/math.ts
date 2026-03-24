import type { ISize, IVector2 } from '~/types';

export const checkSamePosition=(posA:IVector2,posB:IVector2):boolean=>
  posA.x===posB.x&&posA.y===posB.y;

export const addVec=(posA:IVector2,posB:IVector2):IVector2=>({
  x:posA.x+posB.x,
  y:posA.y+posB.y,
});

export const checkCollision=(subject:IVector2,target:IVector2[]):IVector2|null=>
  target.find(pos=>checkSamePosition(subject,pos))||null;

export const isInInterval=(a:number,b:number,target:number):boolean=>
  a<=target&&target<=b;

export const isPositionOccupied=(pos:IVector2,...targets:IVector2[][]):boolean=>{
  for(const target of targets){
    for(const position of target){
      if(checkSamePosition(pos,position))return true;
    }
  }

  return false;
}

export const checkBounds=(pos:IVector2,bounds:ISize):boolean=>
  !isInInterval(0,bounds.width-1,pos.x)||
  !isInInterval(0,bounds.height-1,pos.y);

export const multVec=(vector:IVector2,scalar:number):IVector2=>({
  x:vector.x*scalar,
  y:vector.y*scalar,
});

export const generatePositions=(
  initialPosition:IVector2,
  direction:IVector2,
  count:number,
):IVector2[]=>{
  const positions:IVector2[]=[];

  for(let i=0;i<count;i++){
    const newPosition=addVec(
      initialPosition,
      multVec(direction,i),
    );

    positions.push(newPosition);
  }

  return positions;
};
