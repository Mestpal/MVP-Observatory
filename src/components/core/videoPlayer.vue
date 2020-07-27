<template>
  <v-row
    no-gutters
    justify="center"
  >
    <v-card
      height="90vh"
      min-width="60vw"
    >
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            :src="$attrs.src"
            allowfullscreen
            allowtransparency
            allow="autoplay"
          />
        </div>
      </vue-plyr>
      <v-card-text>
        Text
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    checkLoad () {
      this.loaded = true
    }
  }
}
</script>
