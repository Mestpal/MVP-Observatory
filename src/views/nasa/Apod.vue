<template>
  <v-col>
    <section-info-block :media="isLandscape">
      <template #title>
        <h1
          v-if="checkMobileNavigation"
          class="text-center"
          v-text="apodTitle"
        />
        <h2
          v-else
          class="text-center"
          v-text="apodTitle"
        />
      </template>

      <template #media>
        <buttons-row
          :buttons="buttons"
          :mobile="checkMobileNavigation"
          @today="onClickToday"
          @prevDay="onClickPrev"
          @nextDay="onClickNext"
        />
      </template>
    </section-info-block>

    <v-row no-gutters>
      <v-col
        v-if="Object.keys(apodData).length"
        :cols="landscapeColsSize"
      >
        <v-col
          v-if="!checkMobileNavigation"
          class="pa-0"
        >
          <image-full-frame
            v-if="!isVideo"
            :copyright="copyright"
            :description="apodData.explanation"
            :src="apodSrc"
            :title="apodData.title"
            class="justify-center"
            height="65vh"
          />
          <video-component
            v-else
            :copyright="copyright"
            :description="apodData.explanation"
            :src="apodSrc"
            :title="apodData.title"
          />
        </v-col>

        <v-col
          v-else
          class="ma-0 pa-0"
        >
          <image-full-frame-mobile
            v-if="!isVideo"
            :copyright="copyright"
            :description="apodData.explanation"
            :src="apodSrc"
            :title="apodData.title"
            @fullframe="showOverlayImage"
            @overlay="showOverlay"
          />
          <video-component
            v-else
            :copyright="copyright"
            :description="apodData.explanation"
            :mobile="checkMobileNavigation"
            :src="apodSrc"
            :title="apodData.title"
          />

          <v-row
            align="end"
            no-gutters
          >
            <overlay-info-mobile
              :copyright="copyright"
              :show="isOverlayShown"
              :title="apodData.title"
              @close="hideOverlay"
            >
              <template #content>
                <v-col v-if="apodData.explanation && !isfullImageVisible">
                  <v-card-text
                    :class="{textHeight: isLandscape}"
                    class="darken-4 scrollable text-justify"
                    v-text="apodData.explanation"
                  />
                </v-col>
                <v-col
                  v-else
                  class="ml-4"
                >
                  <v-img
                    contain
                    :src="apodSrc"
                    :width="previewWitdhMobile"
                  />
                </v-col>
              </template>
            </overlay-info-mobile>
          </v-row>
        </v-col>
      </v-col>

      <v-col v-if=" !isLandscape">
        <buttons-row
          :buttons="buttons"
          :mobile="checkMobileNavigation"
          @today="onClickToday"
          @prevDay="onClickPrev"
          @nextDay="onClickNext"
          @show-datepicker="onClickShowDatepicker"
        />
      </v-col>

      <v-col
        v-if="!checkMobileNavigation || isLandscape"
        :cols="landscapeColsSize"
      >
        <v-col
          :class="{'pa-0': !isLandscape}"
          class="py-0"
        >
          <v-date-picker
            v-model="datePickerDate"
            :disabled="disabledDatePicker"
            :first-day-of-week="1"
            :full-width="true"
            :max="today"
            :min="minDateAPOD"
            :reactive="true"
            :show-current="true"
            @change="onChangeDate"
          />
        </v-col>
      </v-col>
    </v-row>

    <overlay-info-mobile
      :show="showMobileDatePicker"
      @close="onCloseModal"
    >
      <template #content>
        <v-date-picker
          v-model="datePickerDate"
          :disabled="disabledDatePicker"
          :first-day-of-week="1"
          :full-width="true"
          :max="today"
          :min="minDateAPOD"
          :reactive="true"
          :show-current="true"
          @change="onChangeDate"
        />
      </template>
    </overlay-info-mobile>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import commons from '@/mixins/commons'
import buttonsRow from '@/components/core/buttonsRow'
import sectionInfoBlock from '@/components/core/sectionInfoBlock'

export default {
  name: 'Home',
  components: {
    imageFullFrame: () => import("@/components/molecules/imageFull/ImageFullFrame"),
    imageFullFrameMobile: () => import("@/components/molecules/imageFull/ImageFullFrameMobile"),
    overlayInfoMobile: () => import("@/components/core/overlayInfoMobile"),
    videoComponent: () => import("@/components/molecules/video/videoPlayer"),
    buttonsRow,
    sectionInfoBlock
  },
  mixins: [commons],
  data () {
    return {
      apodTitle: "NASA Image of the Day",
      disabledDatePicker: false,
      isfullImageVisible: false,
      isOverlayShown: false,
      minDateAPOD: "2015-01-01",
      showMobileDatePicker: false
    }
  },
  computed: {
    ...mapGetters([
      'apodData',
      'selectedApodDate'
    ]),
    apodSrc () {
      return  this.apodData.url || this.apodData.hdurl || ''
    },
    buttons () {
      return [
        {
          condition: this.minDateAPOD !== this.datePickerDate,
          event: 'prevDay',
          icon: "mdi-skip-previous",
          text: 'Previous'
        },
        {
          color: 'orange',
          condition: (this.today !== this.datePickerDate ) && (this.isLandscape || !this.checkMobileNavigation),
          event: 'today',
          icon: "mdi-calendar-today",
          text: 'Today'
        },
        {
          color: 'indigo',
          condition: !this.isLandscape && this.checkMobileNavigation,
          event: 'show-datepicker',
          icon: "mdi-calendar-today",
          text: 'Today'
        },
        {
          condition: this.today !== this.datePickerDate,
          event: 'nextDay',
          icon: "mdi-skip-next",
          text: 'Next'
        }
      ]
    },
    copyright () {
      return this.apodData.copyright || null
    },
    datePickerDate: {
      get () {
        return this.selectedApodDate || this.today
      },
      set (newDate) {
        this.setApodDate(newDate)
      }
    },
    landscapeColsSize () {
      return this.isLandscape ? 6 : 12
    },
    isVideo () {
      return this.apodData.media_type === 'video'
    }
  },
  mounted () {
    if (!this.datePickerDate) this.datePickerDate = this.today
    if(isEmpty(this.apodData)) this.getApod()
  },
  methods: {
    ...mapActions([
      'getApod',
      'setApodDate'
    ]),
    async onChangeDate () {
      this.disabledDatePicker = true
      await this.getApod(this.selectedApodDate)
      this.disabledDatePicker = false
      this.onCloseModal()
    },
    onClickNext () {
      const nextDate = moment(this.datePickerDate, 'YYYY-MM-DD')
        .add(24, 'hours')
        .toISOString()
        .substr(0, 10)
      this.datePickerDate = nextDate
      this.onChangeDate()
    },
    onClickPrev () {
      const prevDate = moment(this.datePickerDate, 'YYYY-MM-DD')
        .subtract(24, 'hours')
        .toISOString()
        .substr(0, 10)
      this.datePickerDate = prevDate
      this.onChangeDate()
    },
    onClickShowDatepicker () {
      this.showMobileDatePicker = true
    },
    onClickToday () {
      this.datePickerDate = this.today
      this.onChangeDate()
    },
    onCloseModal () {
      this.showMobileDatePicker = false
    },
    hideOverlay () {
      this.isOverlayShown = false
      this.isfullImageVisible = false
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
