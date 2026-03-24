import type { ISize, IVector2 } from '~/types/';
import type { GameSpeed, GameState, IGameAPI, ISnakeGameConfig, Movement } from '~/types/snake-game';

export function useSnakeGame(
  canvas:HTMLCanvasElement,
  config:ISnakeGameConfig,
):IGameAPI{
  const getMiddleY=()=>Math.floor(config.gridSize.height/2);
  const getLastX=()=>config.gridSize.width-1;

  const renderer=new SnakeRenderer(canvas);

  const generateInitialSnake=()=>generatePositions(
    {
      x:1,
      y:getMiddleY(),
    },
    {x:1,y:0},
    3,
  );

  const INITIAL_SPEED:IVector2={x:1,y:0};

  const generateInitialApples=():IVector2[]=>{
    const defaultApple:IVector2={
      x:getLastX()-1,
      y:getMiddleY(),
    };
    const initialApples:IVector2[]=[defaultApple];

    for(let i=0;i<config.appleCount-1;i++){
      const randomApple=getNewFreePosition(config.gridSize,snake,apples);
      if(randomApple===null)return initialApples;
      initialApples.push(randomApple);
    }

    return initialApples;
  };

  let snake:IVector2[]=[];
  let apples:IVector2[]=[];
  let speed:IVector2={...INITIAL_SPEED};

  const score=ref<number>(0);
  let begin=ref<boolean>(false);
  const {state:gameState}=useGameState<GameState>('PLAY');

  const updateSnake=(head:IVector2)=>{
    snake.push(head);
    snake.shift();
  };

  const getSnakeHead=():IVector2=>
    snake[snake.length-1]!;


  const spawnApple=()=>{
    const randomPosition=getNewFreePosition(config.gridSize,snake,apples);

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

  const totalCells=config.gridSize.width*config.gridSize.height;

  const gameOver=(reason:string)=>{
    gameState.value='GAME-OVER';
    error.value=reason;
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

    if(checkCollision(newHead,snake)!==null){
      gameOver('You self collided');
      return;
    }

    if(checkBounds(newHead,config.gridSize)){
      gameOver('You hit a wall');
      return;
    }

    let eatenApple:IVector2|null=checkCollision(newHead,apples);
    if(eatenApple!==null){
      eatApple(newHead,eatenApple);

      if(checkWinning(snake.length,apples.length,totalCells))
        gameState.value='WIN';
    }
    else updateSnake(newHead);

    renderer.render(
      snake,
      apples,
      config.gridSize,
      config.showGrid,
    );
  };

  const cancelLoop=()=>{
    cancelAnimationFrame(loopId);
  };

  let loopId:number;
  const start=()=>{
    renderer.syncSize(config.gridSize);
    snake=generateInitialSnake();
    apples=generateInitialApples();
    renderer.render(
      snake,
      apples,
      config.gridSize,
      config.showGrid,
    );

    loopId=requestAnimationFrame(loop);
  };

  let lastDirection:Movement='right';

  const handleKeyDown=(event:KeyboardEvent)=>{
    if(gameState.value!=='PLAY')return;

    const newDirection=convert(event);

    if(
      newDirection===null||
      isDirectionOpposite(lastDirection,newDirection)
    )return;

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

    renderer.render(
      snake,
      apples,
      config.gridSize,
      config.showGrid,
    );

    gameState.value='PLAY';
    requestAnimationFrame(loop);
  };

  const attachListeners=()=>{
    window.addEventListener('keydown',handleKeyDown);
  };

  const detachListeners=()=>{
    window.removeEventListener('keydown',handleKeyDown);
    cancelLoop();
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
