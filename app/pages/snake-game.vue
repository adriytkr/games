<script setup lang="ts">
import type {
  GameScene,
  ISnakeGameConfig,
} from '~/features/snake/types/snake-game';

const currentScene=ref<GameScene>('MENU');

const DEFAULT_GAME_CONFIG:ISnakeGameConfig={
  gridSize:{
    width:7,
    height:7,
  },
  appleCount:1,
  showGrid:true,
  speed:'normal',
};

const gameConfig=ref<ISnakeGameConfig>({...DEFAULT_GAME_CONFIG});

function play(settings:ISnakeGameConfig){
  currentScene.value='PLAY';
  gameConfig.value=settings;
}

const router=useRouter();
function exit(){
  router.push('/');
}
</script>

<template>
  <div class="game">
    <SnakeScenesMenu
      v-if="currentScene==='MENU'"
      @play="currentScene='SETTINGS'"
      @tutorial="currentScene='TUTORIAL'"
      @exit="exit"
    />
    <SnakeScenesSettings
      v-else-if="currentScene==='SETTINGS'"
      @back="currentScene='MENU'"
      @play="play"
    />
    <SnakeScenesTutorial
      v-else-if="currentScene==='TUTORIAL'"
      @back="currentScene='MENU'"
    />
    <SnakeScenesPlay
      v-else-if="currentScene==='PLAY'"
      :config="gameConfig"
      @menu="currentScene='MENU'"
    />
  </div>
</template>

<style scoped>
.game{
  height:100vh;
  width:100vw;
  background-color:#000;
  color:#fff;
}
</style>
