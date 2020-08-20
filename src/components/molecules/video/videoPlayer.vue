<template>
  <v-row no-gutters>
    <v-card width="100%">
      <v-card-title v-if="playerTitle">
        <h2 v-text="playerTitle" />
      </v-card-title>

      <v-row no-gutters>
        <v-col :cols="videoColSize">
          <vue-plyr>
            <div class="plyr__video-embed">
              <iframe
                :src="src"
                allowfullscreen
                allowtransparency
                allow="autoplay"
              />
            </div>
          </vue-plyr>
        </v-col>

        <v-col :cols="buttonsColSize">
          <buttons-row
            :buttons="buttons"
            :mobile="true"
            @info="onInfo"
            @openTab="onOpen"
          />
        </v-col>
      </v-row>

      <v-row
        v-if="!mobile"
        no-gutters
        align="end"
      >
        <overlay-info-mobile
          :copyright="copyright"
          :show="isOverlayShown"
          :title="title"
          @close="onClose"
          @click="onClose"
        >
          <template #content>
            <v-card-text>
              <p
                class="darken-4 pr-8 scrollable text-justify"
                v-text="description"
              />
            </v-card-text>
          </template>
        </overlay-info-mobile>
      </v-row>
    </v-card>

    <v-row
      v-if="mobile"
      no-gutters
      align="end"
    >
      <overlay-info-mobile
        :copyright="copyright"
        :show="isOverlayShown"
        :title="title"
        @close="onClose"
        @click="onClose"
      >
        <template #content>
          <v-card-text>
            <p
              class="darken-4 pr-8 scrollable text-justify"
              v-text="description"
            />
          </v-card-text>
        </template>
      </overlay-info-mobile>
    </v-row>
  </v-row>
</template>

<script>
import buttonsRow from '@/components/core/buttonsRow'
import overlayInfoMobile from "@/components/core/overlayInfoMobile"

export default {
  components: {
    buttonsRow,
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
    mobile: {
      type: Boolean
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
    },
  },
  data() {
    return {
      isOverlayShown: false
    }
  },
  computed: {
    buttons () {
      return[
        {
          condition: true,
          event: 'info',
          icon: "mdi-information",
          text: 'Info'
        },
        {
          color: 'green',
          condition: true,
          event: 'openTab',
          icon: "mdi-keyboard-tab",
          text: 'open'
        }
      ]
    },
    videoColSize () {
      return  this.mobile ? 12 : 11
    },
    buttonsColSize () {
      return  this.mobile ? 12 : 1
    }
  },
  methods: {
    onClose () {
      this.isOverlayShown = false
    },
    onInfo () {
      this.isOverlayShown = true
    },
    onOpen () {
      window.open(this.src, '_blank');
    }
  }
}
</script>
