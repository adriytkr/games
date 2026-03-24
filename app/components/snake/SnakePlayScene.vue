<script setup lang="ts">
import type { IGameAPI, ISnakeGameConfig } from '~/types/snake-game';

const props=defineProps<{
  config:ISnakeGameConfig;
}>();

const canvasRef=ref<HTMLCanvasElement|null>(null);

let engine=shallowRef<IGameAPI|null>(null);

onMounted(()=>{
  if(canvasRef.value===null){
    console.warn('Canvas could not be loaded.');
    return;
  }

  engine.value=useSnakeGame(canvasRef.value,props.config);
  engine.value.start();
  engine.value.attachListeners();
});

onUnmounted(()=>{
  engine.value?.detachListeners();
});

const emit = defineEmits<{
  (e:'menu'):void;
}>();
</script>

<template>
  <TheScene>
    <div class="game-content">
      <div class="game-hud" v-if="engine">
        <span class="game-score">{{ engine.score }}</span>
      </div>
      <div class="game-main">
        <canvas id="canvas" ref="canvasRef"></canvas>
        <div class="overlay" v-if="engine">
          <div class="gameOver" v-if="engine.gameState.value==='GAME-OVER'">
            <h1>You lost</h1>
            <SnakeButton @click="engine.reset">Try Again</SnakeButton>
            <SnakeButton @click="$emit('menu')">Menu</SnakeButton>
          </div>
          <div class="gameOver" v-else-if="engine.gameState.value==='WIN'">
            <h1>You won</h1>
            <SnakeButton @click="">Play Again</SnakeButton>
            <SnakeButton @click="$emit('menu')">Menu</SnakeButton>
          </div>
        </div>
      </div>
    </div>
  </TheScene>
</template>

<style scoped>
#canvas{
  width:500px;
  height:500px;
  background-color:#000;
}

.game-main{
  position:relative;
}

.overlay{
  width:100%;
  height:100%;
  position:absolute;
  left:0;
  top:0;
}
</style>
