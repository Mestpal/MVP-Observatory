<template>
  <v-row>
    <v-col v-if="media && inverse">
      <slot name="media" />
    </v-col>

    <v-col>
      <v-col>
        <slot name="title" />
      </v-col>
      <v-col>
        <slot name="subtitle" />
      </v-col>
      <v-col>
        <slot name="text" />
      </v-col>
    </v-col>

    <v-col v-if="media && !inverse">
      <slot name="media" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    inverse: {
      type:Boolean
    },
    media: {
      type:Boolean
    }
  }
}
</script>