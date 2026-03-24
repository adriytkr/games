<template>
  <div class="grid">
    <slot></slot>
  </div>
</template>

<style scoped>
.grid{
  width:100%;
  height:100%;
  position:absolute;
  left:0;
  top:0;
  background-color:#000;
  background-image: 
    linear-gradient(to right,#1a1a1a 1px,transparent 1px),
    linear-gradient(to bottom,#1a1a1a 1px,transparent 1px);
  background-size:45.45px 45.45px;
  z-index:5;
}
</style>
