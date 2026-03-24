import type { IVector2 } from '~/types/';
import type { ISnakeGameConfig } from '~/types/snake-game';

export function useSnakeGame(
  canvas:HTMLCanvasElement,
  config:ISnakeGameConfig,
){
  const snake:IVector2[]=[
    {x:1,y:5},
    {x:2,y:5},
    {x:3,y:5},
  ];
  const apple:IVector2={
    x:9,
    y:5,
  };

  const getCanvasContext=(canvas:HTMLCanvasElement):CanvasRenderingContext2D=>{
    const ctx=canvas.getContext('2d');

    if(ctx===null)
      throw Error('Canvas Context 2D is not available');

    return ctx;
  }

  const ctx=getCanvasContext(canvas);
  let cellSize:number;

  const drawCell=(pos:IVector2,color:string)=>{
    ctx.fillStyle=color;
    ctx.fillRect(
      pos.x*cellSize, 
      pos.y*cellSize, 
      cellSize-1,
      cellSize-1,
    );
  };

  const drawApple=(apple:IVector2)=>{
    drawCell(apple,'#ff0000');
  };

  const drawSnake=(snake:IVector2[])=>{
    snake.forEach((segment,index)=>{
      const color=index===snake.length-1
        ?'#81C784'
        :'#4CAF50';

      drawCell(segment,color);
    });
  };

  const clear=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
  };

  const draw=()=>{
    drawApple(apple);
    drawSnake(snake);
  };

  const loop=()=>{
    clear();
    draw();
    requestAnimationFrame(loop);
  };

  const initCanvas=()=>{
    canvas.width=canvas.clientWidth;
    canvas.height=canvas.clientHeight;
    cellSize=canvas.width/config.gridSize.width;
  }

  const start=()=>{
    initCanvas();
    requestAnimationFrame(loop);
  };

  return{
    start,
  };
}
