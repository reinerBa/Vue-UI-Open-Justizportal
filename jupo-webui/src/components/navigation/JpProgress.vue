<template>
    <div class="jp-progress-line"></div>
</template>

<script setup></script>

<style lang="stylus">
// start: intermediate progress bar
.jp-progress-line, .jp-progress-line:before
    margin 0
    width 50%
    height .3rem

.jp-progress-line 
    background-color #ff000030
    display -webkit-flex
    display flex

.jp-progress-line:before
    content ''
    background-color rgb(135,29,51)
    -webkit-animation jp-running-progress 1.75s cubic-bezier(0.4, 0, 0.2, 1) infinite
    animation jp-running-progress 1.75s cubic-bezier(0.4, 0, 0.2, 1) infinite

@-webkit-keyframes jp-running-progress
    0% { margin-left: 0px; margin-right: 100%; }
    50% { margin-left: 25%; margin-right: 0%; }
    100% { margin-left: 100%; margin-right: 0; }

@keyframes jp-running-progress
    0% { margin-left: 0px; margin-right: 100%; }
    50% { margin-left: 25%; margin-right: 0%; }
    100% { margin-left: 100%; margin-right: 0; }
// end: intermediate progress bar
</style>