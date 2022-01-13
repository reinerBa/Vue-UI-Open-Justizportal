<template>
    <i class="material-icons jp-rotating">refresh</i>
</template>

<script setup></script>

<style lang="stylus">

// start: .jp-rotating
@-webkit-keyframes jp-rotating {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes jp-rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.jp-rotating {
  -webkit-animation: jp-rotating 2s linear infinite;
  -moz-animation: jp-rotating 2s linear infinite;
  -ms-animation: jp-rotating 2s linear infinite;
  -o-animation: jp-rotating 2s linear infinite;
  animation: jp-rotating 2s linear infinite;
}
// end: .jp-rotating
</style>