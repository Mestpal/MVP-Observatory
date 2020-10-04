<template>
  <v-col>
    <section-info-block>
      <template #title>
        <h1
          class="text-center"
          v-text="epicTitle"
        />
      </template>
    </section-info-block>
    <v-row>
      <v-col
        cols="6"
        class="pa-0"
      >
        <v-carousel
          :hide-delimiters="true"
          height="auto"
          @change="setActualSlide"
        >
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
      </v-col>
      <v-col
        cols="6"
        class="pa-0"
      >
        <v-simple-table>
          <tbody>
            <tr
              v-for="(item, index) in actualSlide"
              :key="index"
            >
              <td>{{ index }}</td>
              <td>{{ item }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
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
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
      isOverlayShown: false,
      maxDate: null
    }
  },
  computed: {
    ...mapGetters([
      'epicData',
      'epicAvailableDates'
    ]),
    imageBaseUrl () {
      return process.env.VUE_APP_NASA_EPIC_ARCHIVE_BASE_URL
    },
    selectedDateArray () {
      if(this.maxDate) return this.maxDate.split("-")
      return this.moment().toISOString().substr(0, 10)
    }
  },
  watch: {
    epicAvailableDates(newDates){
      this.maxDate = newDates[0].date
    }
  },
  mounted () {
    this.getEpicDates()
      .then(() => {
        this.getEpic(this.maxDate)
      })
  },
  methods: {
    ...mapActions([
      'getEpic',
      'getEpicDates',
      'setApodDate'
    ]),
    getUrlImage(image) {
      return`${this.imageBaseUrl}natural/${this.selectedDateArray[0]}/${this.selectedDateArray[1]}/${this.selectedDateArray[2]}/jpg/${image}.jpg`
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