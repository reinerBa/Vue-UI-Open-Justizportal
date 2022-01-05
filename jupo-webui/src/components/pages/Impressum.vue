<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    inject: {
        operator: {
            from: 'operatorConfig'
        }
    }
})
</script>

<template>
    <h3>Diensteanbieter im Sinne des Telemediengesetzes ist das:</h3>
    <p>
    {{operator.impressum.name}}<br />
    {{operator.impressum.street}}<br />
    {{operator.impressum.town}}<br />
    {{operator.impressum.phone}}<br />
    {{operator.impressum.fax}}<br />
    E-Mail: <a :href="'mailto:' + operator.impressum.email" class="operator-email-link impressum-content">{{operator.impressum.email}}</a><br />
    </p>
    <p id="license-notice">© 2019 Oberverwaltungsgericht Rheinland-Pfalz, lizenziert unter der 
    <a href="https://joinup.ec.europa.eu/sites/default/files/inline-files/EUPL%20v1_2%20DE.txt">EUPL Version 1.2</a>. 
    Eine Liste der verwendeten Drittanbietersoftwares und deren Lizenzen finden Sie <a href="/3rdpartylicenses.txt">hier</a>.
    </p>
</template>

<style lang="stylus" scoped>
#license-notice
  position absolute
  bottom 0
  font-size 90%
</style>
