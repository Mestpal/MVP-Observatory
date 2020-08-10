<template>
  <v-row no-gutters>
    <v-card>
      <v-card-title v-if="playerTitle">
        <h2 v-text="playerTitle" />
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col
            class="darken-4 pa-1 text-justify"
            cols="12"
            md="6"
          >
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
      </v-card-text>
    </v-card>
  </v-row>
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
  }
}
</script>
