<template>
  <v-col
    cols="12"
    class="ma-0 pa-0"
  >
    <v-card
      @mousemove="onHover"
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
      </v-img>

      <v-row
        align="end"
        no-gutters
      >
        <v-slide-y-reverse-transition>
          <v-overlay
            v-if="isOverlayShown"
            :absolute="true"
            :opacity="0.84"
            z-index="0"
          >
            <v-row class="ma-2">
              <v-col>
                <p
                  v-if="title"
                  class="d-flex darken-4 display-1 ma-4 text-justify"
                  v-text="title"
                />
                <p
                  v-if="description"
                  class="d-flex darken-4 ma-2 text-justify"
                  v-text="description"
                />
                <p
                  v-if="copyright"
                  class="d-flex darken-4 ma-2 text-justify"
                  v-text="`Author: ${copyright}`"
                />
              </v-col>
            </v-row>
            <v-row
              justify="center"
              no-gutters
            >
              <v-btn
                color="purple"
                @click="onShowModal"
              >
                View full size
              </v-btn>
            </v-row>
          </v-overlay>
        </v-slide-y-reverse-transition>
      </v-row>
    </v-card>
    <image-full-frame-modal
      ref="modal"
      :src="src"
      :title="title"
      @close="onHideModal"
    />
  </v-col>
</template>

<script>
import imageFullFrameModal from '@/components/molecules/imageFull/imageFullFrameModal'

export default {
  components: {
    imageFullFrameModal
  },
  props: {
    copyright: {
      type: String,
      default: null
    },
    description: {
      type: String,
      required: true
    },
    playerTitle: {
      type: String,
      default: null
    },
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isHover: false,
      isHoverOut: true,
      isModalOpen: false
    }
  },
  computed: {
    isOverlayShown () {
      return this.isHover && !this.isHoverOut
    }
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
    },
    onHideModal () {
      this.$refs.modal.show = false
    },
    onShowModal () {
      this.$refs.modal.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .scrollable {
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
