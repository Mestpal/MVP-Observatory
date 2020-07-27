<template>
  <v-row no-gutters>
    <v-col cols="12" v-if="Object.keys(apodData).length">
      <image-full-frame
        v-if="!isVideo"
        :description="apodData.explanation"
        :src="apodSrc"
      />
      <video-player
        v-else
        :description="apodData.explanation"
        :src="apodSrc"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'

import imageFullFrame from '@/components/core/ImageFullFrame'
import videoPlayer from '@/components/core/videoPlayer'

export default {
  name: 'Home',
  components: {
    imageFullFrame,
    videoPlayer
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
