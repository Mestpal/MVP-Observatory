<template>
  <v-row
    v-if="Object.keys(apodData).length"
    no-gutters
  >
    <v-col cols="12">
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
    <v-col cols="12">
      <v-date-picker
        v-model="picker"
        :reactive="true"
        :show-current="true"
        width="100vw"
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
      apodTitle: "NASA Image of the Day",
      picker: new Date().toISOString().substr(0, 10)
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
