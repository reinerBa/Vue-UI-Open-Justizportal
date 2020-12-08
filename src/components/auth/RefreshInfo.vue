<template>
<div v-if="snackbarVisible" class="mdl-snackbar" :class="{'mdl-snackbar--active': showSnackbar }">
  <div class="mdl-snackbar__text">
    Achtung, Ihre Sitzung läuft bald ab!
  </div>
  <div class="mdl-snackbar__button">
    <button  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" @click="refresh()">
        <i class="material-icons">refresh</i>
    </button>
  </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from "vue"
import { duration, now } from 'moment'
import { AuthInfo } from '../../ressources/model'

const SECONDS: number = 60
let intervalHandler: NodeJS.Timeout = null
export default defineComponent({
  name: 'RefreshInfo',
  data () {
    return {
      showSnackbar: false,
      snackbarVisible: false
    }
  },
  mounted () {
    this.checkInterval()
    intervalHandler = setInterval(this.checkInterval, 1000)
  },
  unmounted () {
    clearInterval(intervalHandler)
  },
  methods: {
    checkInterval () {
      // todo: from vuex!
      const authInfo: AuthInfo = this.auth.getAuthInfo()
      if (!authInfo) {
        this.showSnackbar = false
        this.snackbarVisible = false
      } else {
        const sec = duration(authInfo.expiresAt.diff(now())).asSeconds();
        if (sec < this.SECONDS) { this.showSnackbar=true; }
        else { this.showSnackbar=false; }
        
        if (sec<=(this.SECONDS+1)) { this.snackbarVisible=true; }
        else { this.snackbarVisible=false; }
      }
    },
    async refresh() {
      await this.authService.refresh()
      this.showSnackbar = false
    }
  }
})
</script>

<style>
.mdl-snackbar {
  background-color: rgb(135,29,51);
}

.mdl-snackbar__text {
  font-size: 26px;
  line-height: normal;
  align-self:center;
}

.material-icons {
  font-size: 40px;
  height: unset !important;
  width: unset !important;
}

.mdl-button {
  background: whitesmoke;
  height: 50px;
}

.mdl-snackbar__button{
  align-self:center;
  padding:14px 24px 14px 12px;
}
</style>