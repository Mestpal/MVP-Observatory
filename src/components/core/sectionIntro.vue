<template>
  <v-row no-gutters>
    <v-col>
      <v-row
        no-gutters
        justify="center"
        class="my-4"
      >
        <h1
          v-if="!landscape"
          v-text="title"
        />
        <h2
          v-else
          v-text="title"
        />
      </v-row>
    </v-col>

    <v-col v-if="mobile">
      <slot name="mobile" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    landscape: {
      type: Boolean
    },
    mobile: {
      type: Boolean
    },
    title: {
      type: String,
      default: null
    }
  }
}
</script>