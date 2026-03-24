<script setup lang="ts">
defineEmits<{
  (e:'play'):void;
  (e:'tutorial'):void;
  (e:'exit'):void;
}>();
</script>

<template>
  <BaseScene>
    <SnakeGrid></SnakeGrid>
    <div class="menu-content">
      <div class="menu-title">Snake Game</div>
      <div class="menu-actions">
        <SnakeBaseButton @click="$emit('play')">Play</SnakeBaseButton>
        <SnakeBaseButton @click="$emit('tutorial')">Tutorial</SnakeBaseButton>
        <SnakeBaseButton @click="$emit('exit')">Exit</SnakeBaseButton>
      </div>
    </div>
  </BaseScene>
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
