<template>
  <v-col
    cols="12"
    class="ma-0 pa-0"
  >
    <v-card
      color="transparent"
      flat
      @mousemove="onHover"
      @mouseleave="onLeaveHover"
    >
      <v-card-title v-if="playerTitle">
        <h2 v-text="playerTitle" />
      </v-card-title>

      <v-img
        :key="updataeKey"
        :src="src"
        :height="$attrs['height'] || 'auto'"
        max-width="100%"
        v-bind="$attrs"
      >
        <template #placeholder>
          <v-skeleton-loader
            :height="$attrs['height'] || 'auto'"
            type="image"
            max-width="100%"
          />
        </template>
      </v-img>

      <v-row
        align="end"
        no-gutters
      >
        <overlay-info
          :show="isOverlayShown"
          :description="description"
          :title="title"
        >
          <template>
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
          </template>
        </overlay-info>
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
export default {
  components: {
    imageFullFrameModal: () => import("@/components/molecules/imageFull/imageFullFrameModal"),
    overlayInfo: () => import("@/components/core/overlayInfo")
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
      isModalOpen: false,
      updataeKey: 0
    }
  },
  computed: {
    isOverlayShown () {
      return this.isHover && !this.isHoverOut
    }
  },
  watch: {
    src(newSrc, oldSrc){
      if(newSrc !== oldSrc) this.updateLoadImageKey()
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
    },
    updateLoadImageKey () {
      this.updataeKey += 1
    }
  },
}
</script>

<style lang="scss" scoped>
  .scrollable {
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
