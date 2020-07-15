<template>
  <v-row no-gutters>
    <v-col cols="12">
      <image-full-frame :src="imageSrc"/>
    </v-col>
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
    imageSrc () {
      return  this.apodData.hdurl || this.apodData.url || ''
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
