<script setup lang="ts">
defineEmits<{
  (e:'play-again'):void;
  (e:'menu'):void;
}>();
</script>

<template>
  <SnakeGameOverlay>
    <div class="gameOver-wrapper">
      <div class="gameOver">
        <h1 class="status-title">You won</h1>
        <div class="actions">
          <SnakeBaseButton @click="$emit('play-again')">Play Again</SnakeBaseButton>
          <SnakeBaseButton @click="$emit('menu')">Menu</SnakeBaseButton>
        </div>
      </div>
    </div>
  </SnakeGameOverlay>
</template>

<style scoped>
.winning-wrapper{
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
