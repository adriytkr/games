<script setup lang="ts">
defineEmits<{
  (e:'back'):void;
}>();
</script>

<template>
  <TheScene>
    <div class="tutorial-content">
      <div class="tutorial-main">
        <h1 class="tutorial-title">Under development...</h1>
        <p>Coming soon ;)</p>
      </div>
      <div class="tutorial-actions">
        <SnakeButton @click="$emit('back')">Back</SnakeButton>
      </div>
    </div>
  </TheScene>
</template>

<style scoped>
.tutorial-main{
  margin-bottom:24px;
}

.tutorial-actions{
  display:flex;
  justify-content:flex-end;
}
</style>
