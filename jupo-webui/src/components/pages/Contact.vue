<script lang="ts" setup>
import { inject } from "@vue/runtime-core"
 const operator = inject('operatorConfig')
</script>

<template>
    <h3>Anschrift</h3>
    <p>
    {{operator.contact.name}}<br />
    {{operator.contact.street}}<br />
    {{operator.contact.town}}<br />
    {{operator.contact.phone}}<br />
    {{operator.contact.fax}}<br />
    E-Mail: <a class="operator-email-link" href="{{'mailto:' + operator.contact.email}}">{{operator.contact.email}}</a><br />
    </p>
    <h3>
    Inhalt
    </h3>
    <p>
    Bei Fragen zum Inhalt wenden Sie sich an das gewährende Gericht.
    </p>
    <h3>Technik</h3>
    <p>
    Bei technischen Fragen oder Anregungen wenden Sie sich an <a class="support-email-link" :href="'mailto:' + operator.supportEmail">{{operator.supportEmail}}</a>. 
    </p>
</template>

<style lang="stylus" scoped>
</style>
