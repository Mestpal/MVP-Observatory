<template>
  <modal-base
    :show.sync="show"
    :fullscreen="true"
    @close="onClickClose"
  >
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <v-row
        justify="center"
        align="center"
      >
        <v-spacer />
        <v-col cols="10">
          <v-img
            contain
            :src="src"
          />
        </v-col>
        <v-spacer />
      </v-row>
    </template>
    <template #actions>
      <v-spacer />
      <v-col cols="1">
        <v-btn
          color="error"
          @click.prevent="onClickClose"
        >
          Close
        </v-btn>
      </v-col>
    </template>
  </modal-base>
</template>

<script>
import modalBase from '@/components/core/modalBase'

export default {
  components: {
    modalBase
  },
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onClickClose () {
      this.$emit('close')
    },
    onShowModal () {
      this.isModalOpen = true
    }
  }
}
</script>