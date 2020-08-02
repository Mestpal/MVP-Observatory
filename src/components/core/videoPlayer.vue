<template>
  <v-row no-gutters>
    <v-card>
      <v-card-title v-if="playerTitle">
        <h2 v-text="playerTitle" />
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col
            class="pr-2"
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
            class="pl-2 text-body-1"
            cols="12"
            md="6"
          >
            <p
              class="text-justify"
              v-text="description"
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
    src: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    playerTitle: {
      type: String,
      default: null
    }
  }
}
</script>
