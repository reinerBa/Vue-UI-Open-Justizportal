<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

class Props {
  msg?: String
}

export default class HelloWorld extends Vue {
  props: { msg: '' }
  // The behavior in class is the same as the current
  count = 0

  increment() {
    this.count++
  }
}
</script>
