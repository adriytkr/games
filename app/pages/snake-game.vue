<script setup lang="ts">
import type {
  GameScene,
  ISnakeGameConfig,
} from '~/types/snake-game';

const {state:currentScene}=useGameState<GameScene>('MENU');

const gameConfig=ref<ISnakeGameConfig>({
  gridSize:{
    width:11,
    height:11,
  },
});
</script>

<template>
  <div class="game">
    <SnakeMenuScene
      v-if="currentScene==='MENU'"
      @play="currentScene='SETTINGS'"
      @tutorial="currentScene='TUTORIAL'"
    />
    <SnakeSettingsScene
      v-else-if="currentScene==='SETTINGS'"
      @back="currentScene='MENU'"
      @play="currentScene='PLAY'"
    />
    <SnakeTutorialScene
      v-else-if="currentScene==='TUTORIAL'"
      @back="currentScene='MENU'"
    />
    <SnakePlayScene
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
}
</style>
