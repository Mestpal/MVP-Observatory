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
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    increment() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    }
  }
}
</script>
