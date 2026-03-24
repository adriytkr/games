<script setup lang="ts">
defineEmits<{
  (e:'back'):void;
}>();
</script>

<template>
  <BaseScene>
    <div class="tutorial-content">
      <div class="tutorial-main">
        <h1 class="tutorial-title">Under development...</h1>
        <p>Coming soon ;)</p>
      </div>
      <div class="tutorial-actions">
        <SnakeBaseButton @click="$emit('back')">Back</SnakeBaseButton>
      </div>
    </div>
    <SnakeGrid/>
  </BaseScene>
</template>

<style scoped>
.tutorial-content{
  position:relative;
  z-index:10;
}

.tutorial-main{
  margin-bottom:24px;
}

.tutorial-actions{
  display:flex;
  justify-content:flex-end;
}
</style>
