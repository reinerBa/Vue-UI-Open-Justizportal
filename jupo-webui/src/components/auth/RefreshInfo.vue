<script setup>
  function refresh(){}
  function resetTimer(){}

  var _updateTimerSub = null
  var SnackbarVisible = false
  var ShowSnackbar = false
  var SECONDS = 60
</script>

<template>
  <div v-if="SnackbarVisible" class="mdl-snackbar" :class="{'mdl-snackbar--active': ShowSnackbar }">
    <div class="mdl-snackbar__text">
      Achtung, Ihre Sitzung läuft bald ab!
    </div>
    <div class="mdl-snackbar__button">
      <button id="refresh_token_alert_button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" @click="refresh()">
          <i class="material-icons">refresh</i>
      </button>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.mdl-snackbar 
  background-color: rgb(135,29,51);

.mdl-snackbar__text
  font-size: 26px;
  line-height: normal;
  align-self:center;

.material-icons
  font-size: 40px;
  height: unset !important;
  width: unset !important;

.mdl-button
  background: whitesmoke;
  height: 50px;

.mdl-snackbar__button
  align-self:center;
  padding:14px 24px 14px 12px;
</style>
