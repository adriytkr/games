<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn{
  background-color:#fff;
  padding:16px 24px;
  border-radius:6px;
  border:none;
  font-weight:700;
  font-size:26px;
  text-transform:uppercase;
  color:#000;
  cursor:pointer;
  font-family:'Fira Code';
  letter-spacing:6px;
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
</style>
