<template>
  <v-col cols="12">
    <v-hover #default="{ hover }">
      <v-img
        :src="imageSrc"
        max-height="100vh"
        max-width="100vw"
      >
        <template #placeholder>
          <v-row>
            <v-skeleton-loader
              type="image"
              min-width="100vw"
              min-height="90vh"
            />
          </v-row>
        </template>

        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex orange darken-2 fill-height"
          >
            {{ data.explanation }}
          </div>
        </v-expand-transition>
      </v-img>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  computed: {
    imageSrc () {
      return  this.data.hdurl || this.data.url || ''
    }
  },
  methods: {
    hoverTest (value) {
      console.log('value', value)
    }
  }
}
</script>
