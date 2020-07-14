<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          {{ apodData }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'apodData'
    ])
  },
  mounted () {
    if(isEmpty(this.apodData)) this.getApod()
  },
  methods: {
    ...mapActions([
      'increment',
      'getApod'
    ])
  }
}
</script>
