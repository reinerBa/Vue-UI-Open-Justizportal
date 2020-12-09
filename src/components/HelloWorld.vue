<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>{{title}} <input v-model="title"/></p>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { reactive, defineComponent } from 'vue'

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data () {
    return {
      count: 0,
      title:"hi"
    }
  },
  methods: {
    increment() {
      this.count++
    } 
  }
}
</script>
