<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn{
  background-color:#000;
  padding:8px 16px;
  border:none;
  font-weight:600;
  color:#fff;
  cursor:pointer;
}
</style>
