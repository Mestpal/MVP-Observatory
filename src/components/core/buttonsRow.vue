<template>
  <v-col cols="12">
    <v-row no-gutters>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        :cols="item.size || 1"
        align="center"
        class="mx-auto my-2"
      >
        <v-btn
          v-if="item.condition"
          :color="item.color || 'primary'"
          @click="launchEvent(item.event)"
          v-text="item.text"
        />
      </v-col>
    </v-row>
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