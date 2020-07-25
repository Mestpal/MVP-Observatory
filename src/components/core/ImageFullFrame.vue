<template>
  <v-col cols="12">
    <v-card>
      <v-hover #default="{ hover }">
        <v-img
          :src="imageSrc"
          max-height="95vh"
          max-width="100vw"
          @load="checkLoad"
        >
          <template #placeholder>
            <v-row>
              <v-skeleton-loader
                type="image"
                min-width="100vw"
                min-height="90vh"
              />
            </v-row>
          </template>

          <v-row
            align="end"
            height="50%"
            no-gutters
          >
            <v-slide-y-reverse-transition v-if="loaded">
              <v-overlay
                v-if="hover"
                :absolute="true"
              >
                <p
                  class="d-flex darken-4 ma-4"
                  v-text="data.explanation"
                />
              </v-overlay>
            </v-slide-y-reverse-transition>
          </v-row>
        </v-img>
      </v-hover>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    imageSrc () {
      return  this.data.hdurl || this.data.url || ''
    }
  },
  methods: {
    hoverTest (value) {
      console.log('value', value)
    },
    checkLoad () {
      this.loaded = true
    }
  }
}
</script>
