<template>
  <v-col
    cols="12"
    class="ma-0 pa-0"
  >
    <v-card
      flat
      rounded
    >
      <v-card-title v-if="playerTitle">
        <h3 v-text="playerTitle" />
      </v-card-title>

      <v-img
        :src="src"
        :height="isLandscape ? '100vh' : '60vh'"
        width="100vw"
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
          v-model="fabStatus"
          :absolute="true"
          :right="true"
          :bottom="true"
        >
          <template #activator>
            <v-btn
              v-if="isMenuButtonVisible"
              :fab="true"
              :right="true"
              :medium="true"
              color="purple"
            >
              <v-icon v-if="!fabStatus">
                mdi-menu
              </v-icon>
              <v-icon v-else>
                mdi-close
              </v-icon>
            </v-btn>
          </template>

          <v-btn
            v-for="(button, index) in buttons"
            :key="index"
            :color="button.color"
            :fab="true"
            :small="true"
            @click="button.action"
          >
            <v-icon>{{ button.icon }}</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-row>
    </v-card>

    <v-row
      align="end"
      no-gutters
    >
      <overlay-info-mobile
        :copyright="copyright"
        :show="isOverlayShown"
        :title="title"
        @close="onClose"
      >
        <template #content>
          <v-card-text
            v-if="description && !isfullImageVisible"
            :class="{textHeight: isLandscape}"
            class="darken-4 pr-8 scrollable text-justify"
            v-text="description"
          />
          <v-img
            v-else
            contain
            :src="src"
            :width="previewWitdh"
          />
        </template>
      </overlay-info-mobile>
    </v-row>
  </v-col>
</template>

<script>
import overlayInfoMobile from "@/components/core/overlayInfoMobile"

export default {
  components: {
    overlayInfoMobile
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
      fabStatus: false,
      isMenuButtonVisible: false,
      isfullImageVisible: false,
      isOverlayShown: false
    }
  },
  computed: {
    buttons () {
      return [
        {
          condition: true,
          action: this.onClick,
          icon: 'mdi-information',
          color: 'secondary'
        },
        {
          condition: true,
          action: this.onClickFullscreen,
          icon: 'mdi-fullscreen',
          color: 'primary'
        }
      ]
    },
    isLandscape () {
      return this.$vuetify.breakpoint.smAndUp
    },
    previewWitdh () {
      return this.isLandscape ? "60vw" : "90vw"
    }
  },
  watch: {
    src (){
      this.isMenuButtonVisible = false
    }
  },
  methods: {
    onClick () {
      this.isOverlayShown = true
    },
    onClickFullscreen () {
      this.onClick()
      this.isfullImageVisible = true
    },
    onClose () {
      this.isOverlayShown = false
      this.isfullImageVisible = false
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
  .textHeight {
    max-height: 100vh;
  }
</style>