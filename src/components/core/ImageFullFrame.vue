<template>
  <v-card
    class="ma-0 pa-0"
    @mouseenter="onHover"
    @mouseleave="onLeaveHover"
  >
    <v-card-title v-if="playerTitle">
      <h2 v-text="playerTitle" />
    </v-card-title>
    <v-img
      :src="src"
      max-height="75vh"
      max-width="100vw"
    >
      <template #placeholder>
        <v-row no-gutters>
          <v-skeleton-loader
            type="image"
            height="80vh"
            min-width="100vw"
          />
        </v-row>
      </template>

      <v-row
        align="end"
        no-gutters
      >
        <v-slide-y-reverse-transition>
          <v-overlay
            v-if="isHover && !isHoverOut"
            :absolute="true"
            :opacity="0.84"
          >
            <v-row>
              <v-col>
                <p
                  class="d-flex darken-4 ma-4 text-justify"
                  v-text="description"
                />
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="center"
            >
              <v-btn
                v-if="isMobileBrowser"
                @click="onCloseHover"
              >
                Close
              </v-btn>
            </v-row>
          </v-overlay>
        </v-slide-y-reverse-transition>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    playerTitle: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isHover: false,
      isHoverOut: true
    }
  },
  computed: {
    ...mapGetters([
      'isMobileBrowser'
    ])
  },
  methods: {
    onCloseHover () {
      this.isHover = false
    },
    onLeaveHover () {
      this.isHoverOut = true
    },
    onHover () {
      if (this.isHoverOut) {
        this.isHover = true
        this.isHoverOut = false
      }
    }
  }
}
</script>
