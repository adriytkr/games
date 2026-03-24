<script setup lang="ts">
defineEmits<{
  (e:'retry'):void;
  (e:'menu'):void;
}>();

defineProps<{
  error:string;
}>();
</script>

<template>
  <SnakeGameOverlay>
    <div class="gameOver-wrapper">
      <div class="gameOver">
        <h1 class="gameOver-title">You lost</h1>
        <p class="gameOver-description">{{ error }}</p>
        <div class="actions">
          <SnakeBaseButton @click="$emit('retry')">Try Again</SnakeBaseButton>
          <SnakeBaseButton @click="$emit('menu')">Menu</SnakeBaseButton>
        </div>
      </div>
    </div>
  </SnakeGameOverlay>
</template>

<style scoped>
.gameOver-wrapper{
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.6);
  backdrop-filter: blur(4px);
  position:absolute;
  left:0;
  top:0;
  display:flex;
  justify-content:center;
  align-items:center;
}

.gameOver{
  text-align:center;
}

.gameOver-title,
.gameOver-description{
  color:#fff;
}

.gameOver-title{
  margin-bottom:8px;
}

.gameOver-description{
  margin-bottom:16px;
}

.actions {
  display:flex;
  column-gap:20px;
  justify-content:center;
}
</style>
