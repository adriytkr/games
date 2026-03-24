<script setup lang="ts" generic="T">
defineProps<{
  value:T;
}>();

defineEmits<{
  (e:'left'):void;
  (e:'right'):void;
}>();
</script>

<template>
  <div class="count-wrapper">
    <button class="btn is-decrement" @click="$emit('left')">-</button>
    <div class="count">{{ value }}</div>
    <button class="btn is-increment" @click="$emit('right')">+</button>
  </div>
</template>

<style scoped>
.count-wrapper {
  display:flex;
  align-items:center;
  column-gap:12px;
}

.btn {
  width:20px;
  height:20px;
  background-color:white;
  border:none;
  cursor:pointer;
  transition:
    background-color 0.2s,
    transform 0.1s;
}

.btn:hover{
  background-color:#4CAF50;
}

.btn:active{
  transform:scale(0.9);
}

.is-decrement{
  clip-path:polygon(100% 0%,0% 50%,100% 100%);
}

.is-increment{
  clip-path:polygon(0% 0%,100% 50%,0% 100%);
}

.count{
  min-width:40px;
  padding:4px 8px;
  background-color:#fff;
  border-radius:8px;
  font-weight:600;
  color:#000;
  text-transform:uppercase;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:18px;
}
</style>
