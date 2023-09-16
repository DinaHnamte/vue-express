<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="icon">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line2"></div>
    </div>
  </div>
</template>

<style>
.icon {
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 30px;
  background-color: rgb(39, 39, 39);
  border: 1px solid rgb(126, 126, 126);
  padding: 2px;
}
.icon:hover line1,
line2,
line3 {
  display: none;
}
.line1 {
  height: 1px;
  margin-top: 0px;
  border-top: 2px solid rgb(200, 200, 200);
}
.line2 {
  height: 1px;
  margin-top: 9px;
  border-top: 2px solid rgb(200, 200, 200);
}
.line3 {
  height: 1px;
  margin-top: 9px;
  border-top: 2px solid rgb(200, 200, 200);
}
</style>
