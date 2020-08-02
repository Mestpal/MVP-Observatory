<template>
  <v-card class="ma-0 pa-0">
    <v-card-title v-if="playerTitle">
      <h2 v-text="playerTitle" />
    </v-card-title>
    <v-hover #default="{ hover }">
      <v-img
        :src="src"
        max-height="80vh"
        max-width="100vw"
      >
        <template #placeholder>
          <v-row no-gutters>
            <v-skeleton-loader
              type="image"
              min-height="80vh"
              min-width="100vw"
            />
          </v-row>
        </template>

        <v-row
          align="end"
          no-gutters
        >
          <v-slide-y-reverse-transition>
            <v-overlay
              v-if="hover"
              :absolute="true"
              :opacity="0.54"
            >
              <p
                class="d-flex darken-4 ma-4 text-justify"
                v-text="description"
              />
            </v-overlay>
          </v-slide-y-reverse-transition>
        </v-row>
      </v-img>
    </v-hover>
  </v-card>
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
