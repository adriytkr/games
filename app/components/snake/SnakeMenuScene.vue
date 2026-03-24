<script setup lang="ts">
defineEmits<{
  (e:'play'):void;
  (e:'tutorial'):void;
  (e:'exit'):void;
}>();
</script>

<template>
  <TheScene>
    <SnakeGrid></SnakeGrid>
    <div class="menu-content">
      <div class="menu-title">Snake Game</div>
      <div class="menu-actions">
        <SnakeButton @click="$emit('play')">Play</SnakeButton>
        <SnakeButton @click="$emit('tutorial')">Tutorial</SnakeButton>
        <SnakeButton @click="$emit('exit')">Exit</SnakeButton>
      </div>
    </div>
  </TheScene>
</template>

<style scoped>
.menu-content{
  position:relative;
  z-index:10;
}

.menu-title{
  margin-bottom:48px;
  font-size:108px;
  text-transform:uppercase;
  font-weight:900;
}

.menu-actions{
  max-width:min-content;
  margin:0 auto;
  display:flex;
  flex-direction:column;
  row-gap:12px;
}
</style>
