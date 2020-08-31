<template>
  <v-col>
    <section-info-block>
      <template #title>
        <h1
          v-if="checkMobileNavigation"
          class="text-center"
          v-text="epicTitle"
        />
        <h2
          v-else
          class="text-center"
          v-text="epicTitle"
        />
      </template>
    </section-info-block>

    <v-row no-gutters>
      <v-col>
        <v-carousel :hide-delimiters="true" @change="setActualSlide">
          <v-carousel-item
            v-for="(epic, index) in epicData"
            :key="index"
          >
            <image-full-frame
              v-if="!checkMobileNavigation"
              :copyright="epic.caption"
              :description="epic.caption"
              :src="getUrlImage(epic.image)"
              :title="epic.date"
            />
            <image-full-frame-mobile
              v-else
              :copyright="epic.caption"
              :description="epic.caption"
              :src="getUrlImage(epic.image)"
              :title="epic.date"
              @fullframe="showOverlayImage"
              @overlay="showOverlay"
            />
          </v-carousel-item>
        </v-carousel>
        <v-row
          v-if="actualSlide"
          align="end"
          no-gutters
        >
          <overlay-info-mobile
            :show="isOverlayShown"
            :title="actualSlide.date"
            @close="hideOverlay"
          >
            <template #content>
              <v-col v-if="actualSlide.caption && !isfullImageVisible">
                <v-card-text
                  :class="{textHeight: isLandscape}"
                  class="darken-4 scrollable text-justify"
                  v-text="actualSlide.caption"
                />
              </v-col>
              <v-col
                v-else
                class="ml-4"
              >
                <v-img
                  contain
                  :src="getUrlImage(actualSlide.image)"
                  :width="previewWitdhMobile"
                />
              </v-col>
            </template>
          </overlay-info-mobile>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'

import commons from '@/mixins/commons'
import sectionInfoBlock from '@/components/core/sectionInfoBlock'

export default {
  name:'Epic',
  components: {
    imageFullFrame: () => import('@/components/molecules/imageFull/ImageFullFrame'),
    imageFullFrameMobile: () => import('@/components/molecules/imageFull/ImageFullFrameMobile'),
    overlayInfoMobile: () => import("@/components/core/overlayInfoMobile"),
    sectionInfoBlock
  },
  mixins: [commons],
  data() {
    return {
      actualSlide: null,
      epicTitle: "EPIC: Earth captures of astronomical events",
      datePickerDate: null,
      isfullImageVisible: false,
      isOverlayShown: false
    }
  },
  computed: {
    ...mapGetters([
      'epicData',
      'isMobileBrowser',
      'selectedEpicDate'
    ]),
    imageBaseUrl () {
      return process.env.VUE_APP_NASA_EPIC_ARCHIVE_BASE_URL
    },
    selectedEpicDateArray () {
      return this.today.split("-")
    }
  },
  mounted () {
    if (!this.datePickerDate) this.datePickerDate = this.today
    if(isEmpty(this.apodData)) this.getEpic()
  },
  methods: {
    ...mapActions([
      'getEpic',
      'setApodDate'
    ]),
    getUrlImage(image) {
      return`${this.imageBaseUrl}/natural/${this.selectedEpicDateArray[0]}/${this.selectedEpicDateArray[1]}/${this.selectedEpicDateArray[2] - 1}/jpg/${image}.jpg`
    },
    hideOverlay () {
      this.isOverlayShown = false
      this.isfullImageVisible = false
    },
    setActualSlide ($event) {
      this.actualSlide = this.epicData[$event]
    },
    showOverlay () {
      this.isOverlayShown = true
    },
    showOverlayImage () {
      this.isfullImageVisible = true
      this.showOverlay()
    }
  }
}
</script>