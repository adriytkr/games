<template>
  <div class="overlay">
    <slot></slot>
  </div>
</template>

<style scoped>
.overlay{
  width:100%;
  height:100%;
  position:absolute;
  left:0;
  top:0;
  display:flex;
  justify-content:center;
  align-items:center;
}
</style>
