import type { ISize, IVector2 } from "~/types";

export class SnakeRenderer{
  private m_ctx:CanvasRenderingContext2D;
  private m_canvas:HTMLCanvasElement;
  private m_cellSize:number=0;

  public constructor(canvas:HTMLCanvasElement){
    const ctx=canvas.getContext('2d');
    if(ctx===null)throw Error('Canvas Context 2D is not available');

    this.m_ctx=ctx;
    this.m_canvas=canvas;
  }

  public syncSize(gridSize:ISize):void{
    this.m_canvas.width=this.m_canvas.clientWidth;
    this.m_canvas.height=this.m_canvas.clientHeight;
    this.m_cellSize=this.m_canvas.width/gridSize.width;
  }

  public clear():void{
    this.m_ctx.clearRect(0,0,this.m_canvas.width,this.m_canvas.height);
  }

  public drawGrid(gridSize:ISize):void{
    this.m_ctx.beginPath();
    this.m_ctx.strokeStyle='#1a1a1a';
    this.m_ctx.lineWidth=1;

    for(let x=0;x<=gridSize.width;x++){
      const posX=x*this.m_cellSize;
      this.m_ctx.moveTo(posX,0);
      this.m_ctx.lineTo(posX,this.m_canvas.height);
      console.log(this.m_cellSize,this.m_canvas.height)
    }

    for(let y=0;y<=gridSize.height;y++){
      const posY=y*this.m_cellSize;
      this.m_ctx.moveTo(0,posY);
      this.m_ctx.lineTo(this.m_canvas.width,posY);
    }

    this.m_ctx.stroke();
  }

  public drawCell(pos:IVector2,color:string):void{
    this.m_ctx.fillStyle=color;
    this.m_ctx.fillRect(
      pos.x*this.m_cellSize, 
      pos.y*this.m_cellSize, 
      this.m_cellSize-1,
      this.m_cellSize-1,
    );
  };

  public drawApples(apples:IVector2[]):void{
    apples.forEach(apple=>this.drawCell(apple,'#ff0000'))
  }

  public drawSnake(snake:IVector2[]):void{
    snake.forEach((segment,index)=>{
      const color=index===snake.length-1
        ?'#81C784'
        :'#4CAF50';

      this.drawCell(segment,color);
    });
  };

  public render(
    snake:IVector2[],
    apples:IVector2[],
    gridSize:ISize,
    showGrid:boolean,
  ):void{
    this.clear();

    if(showGrid)this.drawGrid(gridSize);

    this.drawApples(apples);
    this.drawSnake(snake);
  }
}
