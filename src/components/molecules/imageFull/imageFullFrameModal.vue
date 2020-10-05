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
      <v-col class="align-center d-flex justify-center">
        <v-img
          contain
          max-width="70%"
          height="auto"
          :src="src"
        />
      </v-col>
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