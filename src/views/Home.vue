<template>
  <v-row no-gutters>
    <v-col
      v-if="Object.keys(apodData).length"
      cols="12"
    >
      <image-full-frame
        v-if="!isVideo"
        :description="apodData.explanation"
        :player-title="apodTitle"
        :src="apodSrc"
      />
      <video-component
        v-else
        :description="apodData.explanation"
        :player-title="apodTitle"
        :src="apodSrc"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'

import imageFullFrame from '@/components/core/ImageFullFrame'
import videoComponent from '@/components/core/videoPlayer'

export default {
  name: 'Home',
  components: {
    imageFullFrame,
    videoComponent
  },
  data() {
    return {
      apodTitle: "NASA Image of the Day"
    }
  },
  computed: {
    ...mapGetters([
      'apodData'
    ]),
    apodSrc () {
      return  this.apodData.url || this.apodData.hdurl || ''
    },
    isVideo () {
      return this.apodData.media_type === 'video'
    }
  },
  mounted () {
    if(isEmpty(this.apodData)) this.getApod()
  },
  methods: {
    ...mapActions([
      'getApod'
    ])
  }
}
</script>
