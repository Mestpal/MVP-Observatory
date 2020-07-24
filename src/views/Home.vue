<template>
  <v-row no-gutters>
    <image-full-frame :data="apodData"/>
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
