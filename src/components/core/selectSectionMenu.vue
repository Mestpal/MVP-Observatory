<template>
  <v-row no-gutters>
    <v-col
      v-for="(section, index) in sections"
      :key="index"
    >
      <v-card
        v-bind="$attrs"
        class="ma-2 px-4"
        height="200px"
        @click="onClick(section.route)"
      >
        <v-row
          v-if="section.title"
          align="center"
          class="card-block"
        >
          <v-col class="text-center text-h5 text-truncate">
            {{ section.title }}
          </v-col>
        </v-row>

        <v-row
          justify="center"
          align="center"
          class="card-block"
        >
          <v-icon
            v-if="section.icon"
            :x-large="true"
          >
            {{ section.icon }}
          </v-icon>
        </v-row>
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

<style scoped>
  div.card-block {
    height: 100px;
  }
</style>