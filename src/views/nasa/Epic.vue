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
        :cols="landscapeColsSize"
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
        :cols="landscapeColsSize"
        class="pa-0"
      >
        <v-simple-table>
          <tbody>
            <tr
              v-for="(item, index) in actualSlide"
              :key="index"
            >
              <td>{{ index }}</td>
              <td v-if="typeof item !== 'object'">
                {{ item }}
              </td>
              <td v-else>
                <v-row
                  v-for="(value, key) in item"
                  :key="key"
                  no-gutters
                >
                  <v-col>
                    <td>{{ key }}</td>
                  </v-col>
                  <v-col>
                    <td>{{ value }}</td>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
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
    landscapeColsSize () {
      return this.isLandscape ? 12 : 6
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