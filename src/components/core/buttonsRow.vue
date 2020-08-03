<template>
  <v-col
    class="pa-2"
    cols="12"
  >
    <v-col cols="8">
      <span
        v-for="(item, index) in items"
        :key="index"
      >
        <v-btn
          v-if="item.condition"
          class="mx-4 my-2"
          @click="launchEvent(item.event)"
          v-text="item.text"
        />
      </span>
    </v-col>
  </v-col>
</template>

<script>
export default {
  props: {
    items:{
      type: Array,
      required: true
    }
  },
  methods: {
    launchEvent(event) {
      this.$emit(event)
    }
  },
}
</script>