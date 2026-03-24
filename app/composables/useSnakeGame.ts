import type { IVector2 } from '~/types/';
import type { GameState, IGameAPI, ISnakeGameConfig, Movement } from '~/types/snake-game';

export function useSnakeGame(
  canvas:HTMLCanvasElement,
  config:ISnakeGameConfig,
):IGameAPI{
  const INITIAL_SNAKE_POSITION:IVector2[]=[
    {x:1,y:5},
    {x:2,y:5},
    {x:3,y:5},
  ];
  const INITIAL_APPLE_POSITION:IVector2={
    x:9,
    y:5,
  };
  const INITIAL_SPEED:IVector2={
    x:1,
    y:0,
  };

  let snake:IVector2[]=[...INITIAL_SNAKE_POSITION];
  let apple:IVector2={...INITIAL_APPLE_POSITION};
  let speed:IVector2={...INITIAL_SPEED};

  const score=ref<number>(0);
  let begin=ref<boolean>(false);
  const {state:gameState}=useGameState<GameState>('PLAY');

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

  const updateSnake=(head:IVector2)=>{
    snake.push(head);
    snake.shift();
  };

  const getSnakeHead=():IVector2=>
    snake[snake.length-1]!;

  const getNewFreePosition=():IVector2|null=>{
    const emptyTiles:IVector2[]=[];

    for(let x=0;x<config.gridSize.width;x++){
      for (let y=0;y<config.gridSize.height;y++){
        const position:IVector2={x,y};
        const isOccupied=snake.some(segment=>samePosition(segment,position));
        
        if(!isOccupied)emptyTiles.push({x,y});
      }
    }

    if(emptyTiles.length===0)return null;

    const randomIndex=Math.floor(Math.random()*emptyTiles.length);
    return emptyTiles[randomIndex]!;
  };

  const spawnApple=()=>{
    const newPosition=getNewFreePosition();

    if(newPosition===null)
      throw Error('Could not spawn new apple');

    apple=newPosition;
  };

  const eatApple=(head:IVector2)=>{
    score.value++;
    snake.push(head);
    spawnApple();
  };

  const appleCount=1;
  const gridSize=config.gridSize.width*config.gridSize.height;

  const checkWinning=():boolean=>
    snake.length+appleCount===gridSize;

  const checkSelfCollision=(head:IVector2):boolean=>{
    for(let i=0;i<snake.length-1;i++){
      if(samePosition(snake[i]!,head))return true;
    }

    return false;
  }

  const checkWallCollision=(head:IVector2):boolean=>
    !isInInterval(0,config.gridSize.width-1,head.x)||
    !isInInterval(0,config.gridSize.height-1,head.y);

  const checkGameOver=(head:IVector2):boolean=>
    checkSelfCollision(head)||
    checkWallCollision(head);

  let lastTime=0;
  const tickRate=50;
  const loop=(timestamp:number)=>{
    const delta=timestamp-lastTime;

    requestAnimationFrame(loop);

    if(!begin.value)return;
    if(delta<tickRate)return;

    lastTime=timestamp;

    const newHead=addVec(getSnakeHead(),speed);

    if(checkGameOver(newHead)){
      gameState.value='GAME-OVER';
      return;
    }

    if(samePosition(newHead,apple)){
      eatApple(newHead);

      if(checkWinning())gameState.value='WIN';
    }
    else updateSnake(newHead);

    clear();
    draw();
  };

  const initCanvas=()=>{
    canvas.width=canvas.clientWidth;
    canvas.height=canvas.clientHeight;
    cellSize=canvas.width/config.gridSize.width;
  }

  const start=()=>{
    initCanvas();
    draw();

    requestAnimationFrame(loop);
  };

  const isUp=(key:string):boolean=>
    key==='ArrowUp'||key==='w';

  const isLeft=(key:string):boolean=>
    key==='ArrowLeft'||key==='a';

  const isDown=(key:string):boolean=>
    key==='ArrowDown'||key==='s';

  const isRight=(key:string):boolean=>
    key==='ArrowRight'||key==='d';

  const convert=(event:KeyboardEvent):Movement|null=>{
    const key=event.key;

    if(isUp(key))return 'up';
    if(isLeft(key))return 'left';
    if(isRight(key))return 'right';
    if(isDown(key))return 'down';

    return null;
  };

  const KEY_MAP:Record<Movement,IVector2>={
    'up':{x:0,y:-1},
    'left':{x:-1,y:0},
    'down':{x:0,y:1},
    'right':{x:1,y:0},
  };

  const handleKeyDown=(event:KeyboardEvent)=>{
    const movement=convert(event);

    if(movement===null)return;

    if(!begin.value)begin.value=true;

    speed=KEY_MAP[movement];
  };

  const reset=()=>{
    snake=[...INITIAL_SNAKE_POSITION];
    apple={...INITIAL_APPLE_POSITION};
    speed={...INITIAL_SPEED}
    begin.value=false;
    score.value=0;
    clear();
    draw();
    gameState.value='PLAY';
  };

  const attachListeners=()=>{
    window.addEventListener('keydown',handleKeyDown);
  };

  const detachListeners=()=>{
    window.removeEventListener('keydown',handleKeyDown);
  };

  return{
    start,
    attachListeners,
    detachListeners,
    reset,
    gameState,
    score,
  };
}
