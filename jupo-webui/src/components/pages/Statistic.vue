<script setup>
    import moment from 'moment'

    function onLogin(){ return null; }
    function loadData(){ return null; }
    var startDate = ""
    var endDate = ""
    var password = ""
    var errorMessage = ""
    var precision = ""
    var isLoading = false
    var usagesTable = []
    var usageDays = []
</script>

<template>
<h2>
  Nutzungsauswertung
</h2>

<form v-if="!loginDone" class="jp-login-form" @submit="onLogin()">
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label jp-textfield jp-login-form__textfield">
    <input class="mdl-textfield__input" type="password" name="password" id="statistic-password" v-model="password" required>
    <label class="mdl-textfield__label" for="password">Passwort</label>
    <span class="mdl-textfield__error">Eingabe erforderlich</span>
  </div>
  <div class="jp-login-form__textfield jp-login-button">
    <button id="submit_statistic_button" :disabled="isLoading || password === ''" class="mdl-button mdl-js-button mdl-button--raised jp-login-form__button" type="submit">
      <div class="jp-login-form__button-text" v-if="!isLoading">Anmelden</div>
      <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner jp-login-form__button-spinner" :class="{'is-active' : isLoading}"></div>
    </button>

    <span class="msg-error" v-if="errorMessage != ''">
      {{ errorMessage }}
    </span>
  </div>
</form>

<div v-if="loginDone">
  <p>
    <label class="pad1em">Von: <input v-model="startDate" type="date"></label>&emsp;
    <label class="pad1em">Bis: <input v-model="endDate" type="date"></label>&emsp; 
  </p>
  <p>
    <label class="pad1em"><input type="radio" name="precision" value="d" v-model="precision"/> Tageweise</label>
    <label class="pad1em"><input type="radio" name="precision" value="h" v-model="precision"/> Stundenweise</label>
    <button class="pad1em" @click="loadData()">Aktualisieren</button>
  </p>

<div v-if="precision=='h'">
  <h5>Stundensummen</h5>

<div v-for="(value, key) in usagesTable" :key="'stundensummen' + key"> 
  <table class="jp-stat-table">
    <thead><th></th></thead>
    <thead><th>{{key}}</th></thead>
    <thead><th></th>        
      <th v-for="hour in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]" :key="'hour1' + hour">{{hour}}</th>
    </thead>
    <tbody v-for="(value2, key2) in value" :key="'stdDetail'+ key2">
      <tr>
        <td>{{key2}}</td>
        <td v-for="hour in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]" :key="'hour' + hour">
            {{value2[hour]}}
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
<div v-if="precision=='d'">
  <h5>Tagessummen</h5>
  <table v-for="(dayStat, idx) in usageDays" :key="'dayStat' + idx">
    <tbody>
      <tr><td>{{dayStat}}</td></tr>
    </tbody>
  </table>
</div>
</div>    
</template>

<style lang="stylus" scoped>
.pad1em 
    padding 1rem

.jp-stat-table td:not(:first-of-type)
    text-align center
    border 1px solid gray
    min-width 1.5em
</style>