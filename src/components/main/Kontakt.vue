<template>
  <h3>Anschrift</h3>
  <p>
    {{operator.name}}<br />
    {{operator.street}}<br />
    {{operator.town}}<br />
    {{operator.phone}}<br />
    {{operator.fax}}<br />
    E-Mail: <a href="{{'mailto:' + operator.email}}">{{operator.email}}</a><br />
  </p>
  <h3>
    Inhalt
  </h3>
  <p>
    Bei Fragen zum Inhalt wenden Sie sich an das gewährende Gericht.
  </p>
  <h3>Technik</h3>
  <p>
    Bei technischen Fragen oder Anregungen wenden Sie sich an <a href="{{'mailto:' + config.supportEmail}}">{{config.supportEmail}}</a>. 
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Contact } from '../../ressources/model'

export default defineComponent({
  name: 'Kontakt',
  mounted () {
      // commit state.title = 'Kontakt' 
  },
  computed : {
    operator(): Contact {
      return this.config.contact
   }
  }
})
</script>

<style>

</style>