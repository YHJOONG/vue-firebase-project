import Vue from 'vue'

Vue.config.errorHandler = e => {
  this.$toast.error(e.message, {
    queueable: true
  })
}
