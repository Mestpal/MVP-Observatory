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
          />
        </v-col>
      </v-row>

      <!-- <v-card-text>
        <v-row no-gutters>
          <v-col
            class="text-body-1"
            cols="12"
            md="6"
          >
            <p
              class="d-flex darken-4 mx-4 text-justify"
              v-text="description"
            />
            <p
              v-if="copyright"
              class="d-flex darken-4 mx-4 text-justify"
              v-text="copyright"
            />
          </v-col>
        </v-row>
      </v-card-text> -->
    </v-card>
  </v-row>
</template>

<script>
import buttonsRow from '@/components/core/buttonsRow'

export default {
  components: {
    buttonsRow
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
          icon: "mdi-calendar-today",
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
  }
}
</script>
