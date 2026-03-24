<script setup lang="ts">
defineProps<{
  label:string;
}>();
</script>

<template>
  <div class="option">
    <span class="option-label">{{ label }}</span>
    <div class="option-end">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.option{
  display:flex;
  justify-content:space-between;
  align-items:center;
}
</style>
