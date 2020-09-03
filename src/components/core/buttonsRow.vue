<template>
  <v-col cols="12">
    <v-row no-gutters>
      <v-col
        v-for="(button, index) in filteredButtons"
        :key="index"
        :cols="button.size"
        align="center"
        class="ma-2"
      >
        <v-btn
          :color="button.color || 'secondary'"
          :fab="mobile"
          :depressed="mobile"
          :large="!mobile"
          :small="mobile"
          @click="launchEvent(button.event)"
        >
          <v-icon v-if="mobile">
            {{ button.icon }}
          </v-icon>
          <span v-else>
            {{ button.text }}
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    buttons:{
      type: Array,
      required: true
    },
    mobile: {
      type: Boolean
    }
  },
  computed: {
    filteredButtons () {
      return this.buttons.filter(
        function (button) {
          return button.condition
        }
      )
    }
  },
  methods: {
    launchEvent(event) {
      this.$emit(event)
    }
  },
}
</script>