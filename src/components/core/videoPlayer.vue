<template>
  <v-col cols="12">
    <v-card>
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
    </v-card>
  </v-col>
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
