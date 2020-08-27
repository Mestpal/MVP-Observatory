<template>
  <v-row no-gutters>
    <v-col
      v-if="media && inverse"
      cols="12"
      sm="6"
    >
      <slot name="media" />
    </v-col>

    <v-col>
      <v-col class="pa-0">
        <slot name="title" />
      </v-col>
      <v-col class="pa-0">
        <slot name="subtitle" />
      </v-col>
      <v-col class="pa-0">
        <slot name="text" />
      </v-col>
    </v-col>

    <v-col
      v-if="media && !inverse"
      cols="12"
      sm="6"
    >
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