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
          :fab="mobile"
          :depressed="mobile"
          :large="!mobile"
          :small="mobile"
          @click="launchEvent(item.event)"
        >
          <v-icon v-if="mobile">
            {{ item.icon }}
          </v-icon>
          <span v-else>
            {{ item.text }}
          </span>
        </v-btn>
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
    },
    mobile: {
      type:Boolean
    }
  },
  methods: {
    launchEvent(event) {
      this.$emit(event)
    }
  },
}
</script>