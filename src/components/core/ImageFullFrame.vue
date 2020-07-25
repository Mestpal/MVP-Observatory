<template>
  <v-col cols="12">
    <v-hover #default="{ hover }">
      <v-img
        :src="imageSrc"
        max-height="100vh"
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

        <v-expand-transition>
          <v-overlay
            v-if="hover && loaded"
            :absolute="true"
          >
            <p
              class="d-flex darken-2"
              v-text="data.explanation"
            />
          </v-overlay>
        </v-expand-transition>
      </v-img>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      loaded: false
    }
  },
  props: {
    data: {
      type: Object,
      required: true
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
