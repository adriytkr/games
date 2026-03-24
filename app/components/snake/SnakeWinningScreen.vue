<script setup lang="ts">
defineEmits<{
  (e:'play-again'):void;
  (e:'menu'):void;
}>();
</script>

<template>
  <SnakeGameOverlay>
    <h1>You won</h1>
    <SnakeButton @click="$emit('play-again')">Play Again</SnakeButton>
    <SnakeButton @click="$emit('menu')">Menu</SnakeButton>
  </SnakeGameOverlay>
</template>
