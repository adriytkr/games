import type { ISize, IVector2 } from '~/types/';
import type { GameSpeed, GameState, IGameAPI, ISnakeGameConfig, Movement } from '~/types/snake-game';

export function useSnakeGame(
  canvas:HTMLCanvasElement,
  config:ISnakeGameConfig,
):IGameAPI{
  const renderer=new SnakeRenderer(canvas);

  const INITIAL_SPEED:IVector2={x:1,y:0};

  const engine=new SnakeEngine(config.gridSize,config.appleCount);
  let velocity:IVector2={...INITIAL_SPEED};

  let begin=ref<boolean>(false);
  const {state:gameState}=useGameState<GameState>('PLAY');

  const updateSnake=(head:IVector2)=>{
    engine.snake.push(head);
    engine.snake.shift();
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

  engine.onEat=(newScore:number)=>{

  };

  engine.onGameOver=(reason:string)=>{};

  engine.onWin=()=>{

  };

  const loop=(timestamp:number)=>{
    const delta=timestamp-lastTime;

    loopId=requestAnimationFrame(loop);

    if(!begin.value)return;
    if(delta<tickRate)return;

    lastTime=timestamp;


    const newHead=addVec(engine.snakeHead,velocity);

    engine.step(velocity);

    if(checkCollision(newHead,engine.snake)!==null){
      gameOver('You self collided');
      return;
    }

    if(checkBounds(newHead,config.gridSize)){
      gameOver('You hit a wall');
      return;
    }

    let eatenApple:IVector2|null=checkCollision(newHead,engine.apples);
    if(eatenApple!==null){
      engine.eatApple(newHead,eatenApple);
      score.value=engine.score;

      if(checkWinning(engine.snake.length,engine.apples.length,totalCells))
        gameState.value='WIN';
    }
    else updateSnake(newHead);

    renderer.render(
      engine.snake,
      engine.apples,
      config.gridSize,
      config.showGrid,
    );
  };

  const cancelLoop=()=>{
    cancelAnimationFrame(loopId);
  };

  let loopId:number;
  const start=()=>{
    engine.bootstrap();
    renderer.syncSize(config.gridSize);

    renderer.render(
      engine.snake,
      engine.apples,
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

    velocity=KEY_MAP[newDirection];
  };

  const reset=()=>{
    engine.bootstrap();
    velocity={...INITIAL_SPEED};

    begin.value=false;
    lastDirection='right';

    renderer.render(
      engine.snake,
      engine.apples,
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
  const score=ref<number>(0);

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
