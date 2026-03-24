import type { ISize, IVector2 } from '~/types';

export class SnakeEngine{
  private m_snake:IVector2[]=[];

  private m_apples:IVector2[]=[];
  private m_appleCount:number=0;

  private m_score:number=0;
  private m_gridSize:ISize;

  public onEat?:(newScore:number)=>void;
  public onGameOver?:(readon:string)=>void;
  public onWin?:()=>void;

  public constructor(
    gridSize:ISize,
    appleCount:number,
  ){
    this.m_gridSize=gridSize;
    this.m_appleCount=appleCount;
  }

  public get snake():IVector2[]{
    return this.m_snake;
  }

  public get snakeHead():IVector2{
    return this.m_snake[this.m_snake.length-1]!;
  }

  public get apples():IVector2[]{
    return this.m_apples;
  }

  public get score():number{
    return this.m_score;
  }

  public bootstrap():void{
    this.m_score=0;
    this.generateInitialSnake();
    this.generateInitialApples();
  }

  public generateInitialSnake():void{
    const middleY=Math.floor(this.m_gridSize.height/2);

    this.m_snake=generatePositions(
      {
        x:1,
        y:middleY,
      },
      {x:1,y:0},
      3,
    );
  }

  public generateInitialApples():void{
    const lastX=this.m_gridSize.width-1;
    const middleY=Math.floor(this.m_gridSize.height/2);

    const defaultApple:IVector2={
      x:lastX-1,
      y:middleY,
    };
    this.m_apples=[defaultApple];

    for(let i=0;i<this.m_appleCount-1;i++){
      const randomApple=getNewFreePosition(this.m_gridSize,this.snake,this.apples);
      if(randomApple===null)return;
      this.m_apples.push(randomApple);
    }
  }

  public step(velocity:IVector2):void{}

  public eatApple(head:IVector2,eatenApple:IVector2):void{
    this.m_score++;
    this.snake.push(head);

    const index=this.apples.findIndex(apple=>apple===eatenApple);
    if(index!==-1)this.apples.splice(index,1);

    this.spawnApple();
  };

  public spawnApple():void{
    const randomPosition=getNewFreePosition(this.m_gridSize,this.snake,this.apples);

    if(randomPosition===null)
      throw Error('Could not spawn new apple');

    this.apples.push(randomPosition);
  };
}
