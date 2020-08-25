<template>
  <v-col>
    <section-info-block>
      <template #title>
        <h1 class="text-center">
          Nasa Menu
        </h1>
      </template>
    </section-info-block>
    <select-section-menu
      :sections="sections"
      :hover="true"
    />
  </v-col>
</template>

<script>

import nasaSections from '@/mixins/nasa/sections'
import sectionInfoBlock from '@/components/core/sectionInfoBlock'
import selectSectionMenu from '@/components/core/selectSectionMenu'

export default {
  components: {
    sectionInfoBlock,
    selectSectionMenu
  },
  mixins:[nasaSections]
}
</script>