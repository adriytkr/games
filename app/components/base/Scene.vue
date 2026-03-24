<script setup lang="ts">
const {
  center=true,
}=defineProps<{
  center?:boolean;
}>();
</script>

<template>
  <div class="scene" :class="{'center':center}">
    <slot></slot>
  </div>
</template>

<style scoped>
.scene{
  width:100%;
  height:100%;
}

.scene.center{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}
</style>
