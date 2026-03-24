import type { IVector2 } from '~/types/';
import type { GameSpeed, GameState, IGameAPI, ISnakeGameConfig, Movement } from '~/types/snake-game';

export function useSnakeGame(
  canvas:HTMLCanvasElement,
  config:ISnakeGameConfig,
):IGameAPI{
  const getMiddleY=()=>Math.floor(config.gridSize.height/2);
  const getLastX=()=>config.gridSize.width-1;

  const generateInitialSnake=():IVector2[]=>[
    {x:1,y:getMiddleY()},
    {x:2,y:getMiddleY()},
    {x:3,y:getMiddleY()},
  ];

  const INITIAL_SPEED:IVector2={
    x:1,
    y:0,
  };

  const generateInitialApples=():IVector2[]=>{
    const defaultApple:IVector2={
      x:getLastX()-1,
      y:getMiddleY(),
    };
    const initialApples:IVector2[]=[defaultApple];

    for(let i=0;i<config.appleCount-1;i++){
      const randomApple=getNewFreePosition();
      if(randomApple===null)return initialApples;
      initialApples.push(randomApple);
    }

    return initialApples;
  };

  let snake:IVector2[]=[];
  let apples:IVector2[]=[];
  let speed:IVector2={...INITIAL_SPEED};

  function isPositionOccupied(pos:IVector2):boolean{
    return snake.some(segment=>samePosition(segment,pos))||
      apples.some(apple=>samePosition(apple,pos));
  }

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

  const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle='#1a1a1a';
    ctx.lineWidth=1;

    for(let x=0;x<=config.gridSize.width;x++){
      const posX=x*cellSize;
      ctx.moveTo(posX,0);
      ctx.lineTo(posX,canvas.height);
    }

    for(let y=0;y<=config.gridSize.height;y++){
      const posY=y*cellSize;
      ctx.moveTo(0,posY);
      ctx.lineTo(canvas.width,posY);
    }

    ctx.stroke();
  };

  const draw=()=>{
    if(config.showGrid)
      drawGrid();

    for(const apple of apples)drawApple(apple);
    drawSnake(snake);
  };

  const updateSnake=(head:IVector2)=>{
    snake.push(head);
    snake.shift();
  };

  const getSnakeHead=():IVector2=>
    snake[snake.length-1]!;

  function getNewFreePosition():IVector2|null{
    const emptyTiles:IVector2[]=[];

    for(let x=0;x<config.gridSize.width;x++){
      for (let y=0;y<config.gridSize.height;y++){
        const position:IVector2={x,y};
        const isOccupied=isPositionOccupied(position);
        
        if(!isOccupied)emptyTiles.push({x,y});
      }
    }

    if(emptyTiles.length===0)return null;

    const randomIndex=Math.floor(Math.random()*emptyTiles.length);
    return emptyTiles[randomIndex]!;
  };

  const spawnApple=()=>{
    const randomPosition=getNewFreePosition();

    if(randomPosition===null)
      throw Error('Could not spawn new apple');

    apples.push(randomPosition);
  };

  const eatApple=(head:IVector2,eatenApple:IVector2)=>{
    score.value++;
    snake.push(head);

    const index=apples.findIndex(apple=>apple===eatenApple);
    if(index!==-1)apples.splice(index,1);

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

  const gameOver=()=>{
    gameState.value='GAME-OVER';
    cancelLoop();
  };

  let lastTime=0;
  const factorMap:Record<GameSpeed,number>={
    'slow':1.5,
    'normal':1,
    'fast':0.6,
  };
  const speedFactor=factorMap[config.speed];
  const tickRate=100*speedFactor;
  const loop=(timestamp:number)=>{
    const delta=timestamp-lastTime;

    loopId=requestAnimationFrame(loop);

    if(!begin.value)return;
    if(delta<tickRate)return;

    lastTime=timestamp;

    const newHead=addVec(getSnakeHead(),speed);

    if(checkSelfCollision(newHead)){
      gameOver();
      error.value='You self collided';
      return;
    }

    if(checkWallCollision(newHead)){
      gameOver();
      error.value='You hit a wall';
      return;
    }

    let eatenApple:IVector2|null=checkCollision(newHead,apples);
    if(eatenApple!==null){
      eatApple(newHead,eatenApple);

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

  const cancelLoop=()=>{
    cancelAnimationFrame(loopId);
  };

  let loopId:number;
  const start=()=>{
    initCanvas();
    snake=generateInitialSnake();
    apples=generateInitialApples();
    draw();

    loopId=requestAnimationFrame(loop);
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

  let lastDirection:Movement='right';
  const isOppositeDirection=(directionA:Movement,directionB:Movement):boolean=>{
    const speedA=KEY_MAP[directionA];
    const speedB=KEY_MAP[directionB];

    return (speedA.x+speedB.x===0)&&(speedA.y+speedB.y===0);
  };

  const handleKeyDown=(event:KeyboardEvent)=>{
    if(gameState.value!=='PLAY')return;

    const newDirection=convert(event);

    if(newDirection===null)return;
    if(isOppositeDirection(newDirection,lastDirection))return;

    if(!begin.value)begin.value=true;
    lastDirection=newDirection;

    speed=KEY_MAP[newDirection];
  };

  const reset=()=>{
    snake=generateInitialSnake();
    apples=generateInitialApples();
    speed={...INITIAL_SPEED};
    begin.value=false;
    score.value=0;
    lastDirection='right';
    clear();
    draw();
    gameState.value='PLAY';
    requestAnimationFrame(loop);
  };

  const attachListeners=()=>{
    window.addEventListener('keydown',handleKeyDown);
  };

  const detachListeners=()=>{
    window.removeEventListener('keydown',handleKeyDown);
  };

  const error=ref<string>('');

  return{
    start,
    attachListeners,
    detachListeners,
    reset,
    gameState,
    score,
    error,
    begin,
  };
}
