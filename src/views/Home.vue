<template>
  <div class="home">
    <div>
      Here some data will be shown
    </div>

    <div>
      Count: {{ $store.state.count }}
    </div>

    <button @click="increment">
      Add
    </button>

    <button @click="getApod">
      Get Images
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  methods: {
  ...mapActions([
      'increment',
      'getApod'
    ])
  }
}
</script>
