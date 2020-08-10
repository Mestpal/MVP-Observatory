<template>
  <div>
    <v-dialog
      v-model="show"
      scrollable
      persistent
      :overlay="false"
      max-width="90%"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <h2 v-text="'playerTitle'" />
        </v-card-title>
        <v-card-text>
          Text
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="success"
            @click="onClickClose"
          >
            Close
          </v-btn>
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
  },
  methods: {
    onClickClose () {
      this.$emit('close')
    }
  }
}
</script>