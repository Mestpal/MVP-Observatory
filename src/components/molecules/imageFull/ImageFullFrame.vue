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
            class="scrollable"
          >
            <v-row>
              <v-col>
                <p
                  v-if="title"
                  class="d-flex darken-4 display-1 ma-4 text-justify"
                  v-text="title"
                />
                <p
                  v-if="description"
                  class="d-flex darken-4 ma-4 text-justify"
                  v-text="description"
                />
                <p
                  v-if="copyright"
                  class="d-flex darken-4 ma-4 text-justify"
                  v-text="copyright"
                />
              </v-col>
            </v-row>
            <v-row>
              <buttons-row
                :items="buttons"
                @close="onCloseHover"
                @fullImage="onShowModal"
              />
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
import buttonsRow from '@/components/core/buttonsRow'
import imageFullFrameModal from '@/components/molecules/imageFull/imageFullFrameModal'

export default {
  components: {
    buttonsRow,
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
    buttons () {
      return [
        {
          condition: true,
          event: 'fullImage',
          text: 'View full Image',
          size: 12
        }
      ]
    },
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
