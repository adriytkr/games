<script setup lang="ts">
defineEmits<{
  (e:'play'):void;
  (e:'tutorial'):void;
}>();
</script>

<template>
  <TheScene>
    <div class="menu-content">
      <div class="menu-title">Snake Game</div>
      <SnakeButton @click="$emit('play')">Play</SnakeButton>
      <SnakeButton @click="$emit('tutorial')">Tutorial</SnakeButton>
    </div>
  </TheScene>
</template>

<style scoped>
.menu-content{
  display:flex;
  flex-direction:column;
  row-gap:12px;
}
</style>
