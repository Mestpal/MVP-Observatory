<template>
  <v-col>
    <section-info-block>
      <template #title>
        <h1 class="text-center">
          Welcome to MVP Observatory!
        </h1>
      </template>
    </section-info-block>

    <v-col>
      <v-expansion-panels
        v-model="openPanel"
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h2>
              NASA
            </h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              Here you can consult the public data of the NASA, choose one of
              the available sections to start exploring
            </p>
            <select-section-menu
              :sections="sections"
              :outlined="true"
              :hover="true"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-col>
</template>

<script>
import nasaSections from '@/mixins/nasa/sections'
import sectionInfoBlock from '@/components/core/sectionInfoBlock'
import selectSectionMenu from '@/components/core/selectSectionMenu'

export default {
  name: 'Home',
  components: {
    sectionInfoBlock,
    selectSectionMenu
  },
  mixins: [nasaSections],
  data () {
    return {
      openPanel: [0]
    }
  }
}
</script>
