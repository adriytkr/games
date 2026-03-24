import type {
  GameState,
  IGameAPI,
  ISnakeGameConfig,
  Direction,
} from '~/features/snake/types/snake-game';
import { SnakeRenderer } from '../utils/SnakeRenderer';
import { SnakeEngine } from '../utils/SnakeEngine';
import { convert, getTickRate, isDirectionOpposite, KEY_MAP } from '../utils/snake';

export function useSnakeGame(
  canvas:HTMLCanvasElement,
  config:ISnakeGameConfig,
):IGameAPI{
  const gameState=ref<GameState>('PLAY');
  const score=ref<number>(0);

  const renderer=new SnakeRenderer(canvas);
  const engine=new SnakeEngine(config.gridSize,config.appleCount);
  const looper=new GameLoop(
    loop,
    getTickRate(config.speed),
  );

  const error=ref<string>('');

  let begin=ref<boolean>(false);
  let currentDirection:Direction='right';
  let directionBuffer:Direction='right';

  engine.onEat=(newScore:number)=>{
    score.value=newScore;
  };

  engine.onGameOver=(reason:string)=>{
    gameState.value='GAME-OVER';
    error.value=reason;
    looper.stop();
  };

  engine.onWin=()=>{
    gameState.value='WIN';
  };

  function loop(){
    if(!begin.value)return;

    currentDirection=directionBuffer;
    const velocity=KEY_MAP[currentDirection];
    engine.step(velocity);

    renderer.render(
      engine.snake,
      engine.apples,
      config.gridSize,
      config.showGrid,
    );
  };

  function start(){
    engine.bootstrap();
    renderer.syncSize(config.gridSize);
    renderStatic();
    looper.start();
  };

  function renderStatic(){
    renderer.render(
      engine.snake,
      engine.apples,
      config.gridSize,
      config.showGrid,
    );
  }

  function handleKeyDown(event:KeyboardEvent){
    if(gameState.value!=='PLAY')return;

    const newDirection=convert(event);

    if(
      newDirection===null||
      isDirectionOpposite(currentDirection,newDirection)
    )return;

    if(!begin.value)begin.value=true;
    directionBuffer=newDirection;
  };

  function reset(){
    engine.bootstrap();

    begin.value=false;
    currentDirection='right';

    renderStatic();
    gameState.value='PLAY';
    looper.start();
  };

  function attachListeners(){
    window.addEventListener('keydown',handleKeyDown);
  };

  function detachListeners(){
    window.removeEventListener('keydown',handleKeyDown);
    looper.stop();
  };

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
