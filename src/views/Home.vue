<template>
  <v-row no-gutters>
    <image-full-frame
      v-if="Object.keys(apodData).length"
      :src="imageApodSrc"
      :description="apodData.explanation"
    />
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'

import imageFullFrame from '@/components/core/ImageFullFrame'

export default {
  name: 'Home',
  components: {
    imageFullFrame
  },
  computed: {
    ...mapGetters([
      'apodData'
    ]),
    imageApodSrc () {
      return  this.apodData.url || this.apodData.hdurl || ''
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
