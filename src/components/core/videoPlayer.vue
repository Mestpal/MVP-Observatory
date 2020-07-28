<template>
  <v-row no-gutters>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col md="7">
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
            md="5"
          >
            <p v-text="description" />
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
    }
  }
}
</script>
