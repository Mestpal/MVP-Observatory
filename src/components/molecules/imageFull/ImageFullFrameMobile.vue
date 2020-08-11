<template>
  <v-col
    cols="12"
    class="ma-0 pa-0"
  >
    <v-card>
      <v-card-title v-if="playerTitle">
        <h2 v-text="playerTitle" />
      </v-card-title>

      <v-img
        :src="src"
        max-height="75vh"
        max-width="100vw"
        @load="showMenuButton"
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
        <v-speed-dial
          v-model="fab"
          :absolute="true"
          :right="true"
        >
          <template v-slot:activator>
            <v-btn
              v-if="isMenuButtonVisible"
              :fab="true"
              :right="true"
              :small="true"
              color="primary"
            >
              <v-icon dark>
                mdi-android
              </v-icon>
            </v-btn>
          </template>

          <v-btn
            v-for="(button, index) in buttons"
            :key="index"
            :color="button.color"
            :fab="true"
            :x-small="true"
            @click="button.action"
          >
            <v-icon>{{ button.icon }}</v-icon>
          </v-btn>
        </v-speed-dial>
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
      fab: false,
      isMenuButtonVisible: false,
      isModalOpen: false,
      isOverlayShown: false
    }
  },
  computed: {
    buttons () {
      return [
        {
          condition: true,
          action: this.onClickClose,
          icon: 'mdi-information',
          color: 'gray'
        },
        {
          condition: true,
          action: this.onShowModal,
          icon: 'mdi-fullscreen',
          color: 'purple'
        }
      ]
    },
  },
  watch: {
    src (){
      this.isMenuButtonVisible = false
    }
  },
  methods: {
    onClick () {
      this.isOverlayShown = !this.isOverlayShown
    },
    onClickClose () {
      this.isOverlayShown = false
    },
    onHideModal () {
      this.$refs.modal.show = false
    },
    onShowModal () {
      this.$refs.modal.show = true
    },
    showMenuButton () {
      this.isMenuButtonVisible = true
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
