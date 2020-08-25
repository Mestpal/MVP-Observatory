<template>
  <v-row no-gutters>
    <v-col
      v-for="(section, index) in sections"
      :key="index"
      cols="4"
      class="pa-2"
    >
      <v-card
        v-bind="$attrs"
        min-width="75px"
        min-height="100px"
        @click="onClick(section.route)"
      >
        <v-card-title
          v-if="section.title"
          primary-title
        >
          <v-row justify="center">
            {{ section.title }}
          </v-row>
        </v-card-title>
        <v-card-text class="text-center">
          <v-row justify="center">
            <v-icon
              v-if="section.icon"
              :x-large="true"
            >
              {{ section.icon }}
            </v-icon>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props:{
    sections: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    onClick (route) {
      this.$router.push(route)
    }
  },
}
</script>