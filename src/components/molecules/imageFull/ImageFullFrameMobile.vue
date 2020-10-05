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
        :key="updateKey"
        :src="src"
        :height="isLandscape ? '75vh' : 'auto'"
        max-width="100vw"
        @load="showMenuButton"
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
              color="accent"
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
        :show="isOverlayShown"
        v-bind="$attrs"
        @close="hideOverlay"
      >
        <template #content>
          <v-col v-if="!isfullImageVisible">
            <v-card-text
              :class="{textHeight: isLandscape}"
              class="darken-4 scrollable text-justify"
              v-text="$attrs.description || noDataMessage"
            />
          </v-col>
          <v-col
            v-else
            class="ml-4"
          >
            <v-img
              :src="src"
              :width="previewWitdhMobile"
              alt="Full Image"
              contain
            />
          </v-col>
        </template>
      </overlay-info-mobile>
    </v-row>
  </v-col>
</template>

<script>
import commons from '@/mixins/commons'

export default {
  components:{
    overlayInfoMobile: () => import("@/components/core/overlayInfoMobile")
  },
  mixins: [commons],
  props: {
    playerTitle: {
      type: String,
      default: null
    },
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fabStatus: false,
      isfullImageVisible: false,
      isMenuButtonVisible: false,
      isOverlayShown: false,
      noDataMessage: 'No data',
      updateKey: 0
    }
  },
  computed: {
    buttons () {
      return [
        {
          condition: true,
          action: this.onClick,
          icon: 'mdi-information',
          color: 'info'
        },
        {
          condition: true,
          action: this.onClickFullscreen,
          icon: 'mdi-fullscreen',
          color: 'secondary'
        }
      ]
    },
    isLandscape () {
      return this.$vuetify.breakpoint.smAndUp
    },
  },
  watch: {
    src (newSrc, oldSrc){
      this.isMenuButtonVisible = false
      if(newSrc !== oldSrc) this.updateLoadImageKey()
    }
  },
  methods: {
    hideOverlay () {
      this.isOverlayShown = false
      this.isfullImageVisible = false
    },
    onClick () {
      this.isOverlayShown = true
    },
    onClickFullscreen () {
      this.isfullImageVisible = true
      this.onClick()
    },
    showMenuButton () {
      this.isMenuButtonVisible = true
    },
    updateLoadImageKey () {
      this.updateKey += 1
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