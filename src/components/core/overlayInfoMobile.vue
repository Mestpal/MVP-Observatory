<template>
  <v-slide-y-reverse-transition>
    <v-overlay
      v-if="show"
      :opacity="0.92"
    >
      <v-row>
        <v-col
          cols="12"
          sm="4"
          align="center"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-col
              sm="12"
              class="text-left"
              cols="10"
            >
              <h2
                v-if="title"
                class="d-flex darken-4 ml-4"
                v-text="title"
              />
              <p
                v-if="copyright"
                class="d-flex darken-4 ml-4"
                v-text="`Author: ${copyright}`"
              />
            </v-col>

            <v-col
              sm="12"
              cols="2"
              align="center"
              justify="center"
            >
              <v-row
                justify="center"
                no-gutters
                class="px-4"
              >
                <v-btn
                  :x-small="true"
                  fab
                  outlined
                  @click="onClickClose"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          sm="8"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-card
              flat
              color="transparent"
            >
              <slot name="content" />
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-overlay>
  </v-slide-y-reverse-transition>
</template>

<script>
export default {
  props: {
    copyright: {
      type: String,
      default: null
    },
    show: {
      type: Boolean
    },
    title: {
      type: String,
      default: null
    }
  },
  methods: {
    onClickClose () {
      this.$emit('close')
    }
  }
}
</script>