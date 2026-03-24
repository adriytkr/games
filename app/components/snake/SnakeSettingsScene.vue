<script setup lang="ts">
defineEmits<{
  (e:'back'):void;
  (e:'play'):void;
}>();
</script>

<template>
  <TheScene>
    <div class="settings-actions">
      <SnakeButton @click="$emit('back')">Back</SnakeButton>
      <SnakeButton @click="$emit('play')">Start</SnakeButton>
    </div>
  </TheScene>
</template>

<style scoped>
.settings-actions{
  display:flex;
  column-gap:12px;
}
</style>
