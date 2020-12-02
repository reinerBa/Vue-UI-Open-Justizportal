<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <p>{{getInfos}}</p>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import i from './infos.json'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
  return {
	getInfos: i.infos
  }}
}
</script>
