<template>
  <v-col
    cols="12"
    class="ma-0 pa-0"
  >
    <v-card flat>
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
          v-model="fabStatus"
          :absolute="true"
          :right="true"
          :bottom="true"
        >
          <template v-slot:activator>
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
      <v-slide-y-reverse-transition>
        <v-overlay
          v-if="isOverlayShown"
          :opacity="0.84"
        >
          <v-row
            align="center"
            justify="start"
          >
            <v-col cols="10">
              <p
                v-if="title"
                class="d-flex darken-4 display-1 ml-4"
                v-text="title"
              />
            </v-col>
            <v-col cols="2">
              <v-row
                align="center"
                justify="end"
                no-gutters
                class="px-4"
              >
                <v-btn
                  :x-small="true"
                  fab
                  outlined
                  @click="onClickClose"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>

          <v-row v-if="!isfullImageVisible">
            <v-col cols="12">
              <p
                v-if="description"
                class="d-flex darken-4 ma-4 text-justify"
                v-text="description"
              />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-img
                contain
                aspect-ratio="1.7778"
                :src="src"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <p
                v-if="copyright"
                class="d-flex darken-4 ma-4"
                v-text="copyright"
              />
            </v-col>
          </v-row>
        </v-overlay>
      </v-slide-y-reverse-transition>
    </v-row>
  </v-col>
</template>

<script>
export default {
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
    onClickClose () {
      this.isOverlayShown = false
      this.isfullImageVisible = false
    },
    showMenuButton () {
      this.isMenuButtonVisible = true
    }
  }
}
</script>