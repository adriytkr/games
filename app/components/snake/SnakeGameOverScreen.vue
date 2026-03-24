<script setup lang="ts">
defineEmits<{
  (e:'retry'):void;
  (e:'menu'):void;
}>();

defineProps<{
  error:string;
}>();
</script>

<template>
  <SnakeGameOverlay>
    <div class="gameOver">
      <h1 class="gameOver-title">You lost</h1>
      <p class="gameOver-description">{{ error }}</p>
      <SnakeButton @click="$emit('retry')">Try Again</SnakeButton>
      <SnakeButton @click="$emit('menu')">Menu</SnakeButton>
    </div>
  </SnakeGameOverlay>
</template>

<style scoped>
.gameOver{
  text-align:center;
}

.gameOver-title,
.gameOver-description{
  color:#fff;
}

.gameOver-title{
  margin-bottom:8px;
}

.gameOver-description{
  margin-bottom:16px;
}
</style>
