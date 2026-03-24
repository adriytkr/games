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
      <SnakeGameHud
        v-if="engine"
        :score="engine.score.value"
      />
      <div class="game-main">
        <canvas id="canvas" ref="canvasRef"></canvas>
        <div class="overlay" v-if="engine">
          <SnakeGameBeginScreen v-if="!engine.begin.value"/>
          <SnakeGameOverScreen
            v-if="engine.gameState.value==='GAME-OVER'"
            :error="engine.error.value"
            @retry="engine.reset"
            @menu="$emit('menu')"
          />
          <SnakeWinningScreen
            v-else-if="engine.gameState.value==='WIN'"
            @play-again="engine.reset"
            @menu="$emit('menu')"
          />
        </div>
      </div>
    </div>
  </TheScene>
</template>

<style scoped>
#canvas{
  width:700px;
  height:700px;
  background-color:#000;
  border:4px solid #333;
}

.game-main{
  position:relative;
}
</style>
