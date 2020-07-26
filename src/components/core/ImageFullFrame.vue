<template>
  <v-col cols="12">
    <v-card>
      <v-hover #default="{ hover }">
        <v-img
          v-bind="$attrs"
          max-height="95vh"
          max-width="100vw"
          @load="checkLoad"
        >
          <template #placeholder>
            <v-row>
              <v-skeleton-loader
                type="image"
                min-width="100vw"
                min-height="95vh"
              />
            </v-row>
          </template>

          <v-row
            align="end"
            no-gutters
          >
            <v-slide-y-reverse-transition v-if="loaded">
              <v-overlay
                v-if="hover"
                :absolute="true"
              >
                <p
                  class="d-flex darken-4 ma-4"
                  v-text="$attrs.description"
                />
              </v-overlay>
            </v-slide-y-reverse-transition>
          </v-row>
        </v-img>
      </v-hover>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    checkLoad () {
      this.loaded = true
    }
  }
}
</script>
