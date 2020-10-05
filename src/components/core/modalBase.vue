<template>
  <div>
    <v-dialog
      v-model="show"
      v-bind="$attrs"
      :overlay="true"
      scrollable
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <slot name="title" />
        </v-card-title>
        <v-card-text>
          <slot name="content" />
        </v-card-text>
        <v-card-actions>
          <slot name="actions" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>