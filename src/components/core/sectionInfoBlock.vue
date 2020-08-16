<template>
  <v-row>
    <v-col>
      <v-col>
        <h1 v-text="title" />
      </v-col>
      <v-col>
        <h3 v-text="subtitle" />
      </v-col>
      <v-col>
        <slot />
      </v-col>
    </v-col>

    <v-col v-if="media">
      <slot name="media" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    media: {
      type:Boolean
    },
    title: {
      type: String,
      default: 'Title'
    },
    subtitle: {
      type: String,
      default: 'Subtitle'
    }
  }
}
</script>