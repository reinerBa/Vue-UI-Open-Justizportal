<script setup>
function operator(){
    return {}
}
var config = {}
</script>

<template>
    <h3>Anschrift</h3>
    <p>
    {{operator.name}}<br />
    {{operator.street}}<br />
    {{operator.town}}<br />
    {{operator.phone}}<br />
    {{operator.fax}}<br />
    E-Mail: <a class="operator-email-link" href="{{'mailto:' + operator.email}}">{{operator.email}}</a><br />
    </p>
    <h3>
    Inhalt
    </h3>
    <p>
    Bei Fragen zum Inhalt wenden Sie sich an das gewährende Gericht.
    </p>
    <h3>Technik</h3>
    <p>
    Bei technischen Fragen oder Anregungen wenden Sie sich an <a class="support-email-link" href="{{'mailto:' + config.supportEmail}}">{{config.supportEmail}}</a>. 
    </p>
</template>

<style lang="stylus" scoped>
</style>
