<template>
  <h3>Diensteanbieter im Sinne des Telemediengesetzes ist das:</h3>
  <p>
    {{operator.name}}<br />
    {{operator.street}}<br />
    {{operator.town}}<br />
    {{operator.phone}}<br />
    {{operator.fax}}<br />
    E-Mail: <a :href="'mailto:' + operator.email">{{operator.email}}</a><br />
  </p>
  <p id="license-notice">© 2019 Oberverwaltungsgericht Rheinland-Pfalz, lizenziert unter der <a href="https://joinup.ec.europa.eu/sites/default/files/inline-files/EUPL%20v1_2%20DE.txt">EUPL Version 1.2</a>.</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Contact } from '../../ressources/model'

export default defineComponent({
  name: 'Impressum',
  // get operator Data from vuex
  mounted () {
      // commit state.title = 'Impressum' 
  },
  computed : {
    operator(): Contact {
    return this.config == null ? new Contact() : this.config.impressum;}   
  }
})
</script>

<style>
#license-notice{
  position: absolute;
  bottom: 0;
  font-size: 90%;
}
</style>