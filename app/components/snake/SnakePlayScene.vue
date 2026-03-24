<script setup lang="ts">
import type { ISnakeGameConfig } from '~/types/snake-game';

const props=defineProps<{
  config:ISnakeGameConfig;
}>();

const canvasRef=ref<HTMLCanvasElement|null>(null);

onMounted(()=>{
  if(canvasRef.value===null){
    console.warn('Canvas could not be loaded.');
    return;
  }

  const engine=useSnakeGame(canvasRef.value,props.config);
  engine.start();
});
</script>

<template>
  <TheScene>
    <canvas id="canvas" ref="canvasRef"></canvas>
  </TheScene>
</template>

<style scoped>
#canvas{
  width:500px;
  height:500px;
  background-color:#000;
}
</style>
