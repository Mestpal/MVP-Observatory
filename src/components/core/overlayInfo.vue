<template>
  <v-slide-y-reverse-transition>
    <v-overlay
      v-if="show"
      :absolute="true"
      :opacity="0.84"
      z-index="1"
    >
      <v-row class="ma-2">
        <v-col>
          <p
            v-if="title"
            class="d-flex darken-4 display-1 ma-4 text-justify"
            v-text="title"
          />
          <p
            v-if="description"
            class="d-flex darken-4 ma-2 text-justify"
            v-text="description"
          />
          <p
            v-if="copyright"
            class="d-flex darken-4 ma-2 text-justify"
            v-text="`Author: ${copyright}`"
          />
        </v-col>
      </v-row>

      <slot />
    </v-overlay>
  </v-slide-y-reverse-transition>
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
    show: {
      type: Boolean
    },
    title: {
      type: String,
      default: null
    }
  },
}
</script>