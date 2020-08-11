<template>
  <modal-base
    :show.sync="show"
    @close="onClickClose"
  >
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <v-img
        contain
        aspect-ratio="1.7778"
        :src="src"
      />
    </template>
    <template #actions>
      <v-spacer />
      <v-btn @click.prevent="onClickClose">
        Close
      </v-btn>
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