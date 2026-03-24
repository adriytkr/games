<script setup lang="ts">
defineEmits<{
  (e:'back'):void;
}>();
</script>

<template>
  <TheScene>
    <h1>Under construction</h1>
    <SnakeButton @click="$emit('back')">Back</SnakeButton>
  </TheScene>
</template>
