<script setup lang="ts">
defineEmits<{
  (e:'play-again'):void;
  (e:'menu'):void;
}>();
</script>

<template>
  <SnakeGameOverlay>
    <div class="begin">
      <h1 class="begin-title">Use arrow keys or WASD to start</h1>
    </div>
  </SnakeGameOverlay>
</template>

<style scoped>
.begin{
  position:absolute;
  top:50px;
  margin:0 auto;
}

.begin-title{
  color:#fff;
}
</style>
