<template>
  <v-col>
    <section-info-block>
      <template #title>
        <h1 class="text-center">
          About MVP Observatory Project
        </h1>
      </template>
    </section-info-block>

    <section-info-block class="block-info__negative">
      <template #title>
        <h1>
          Objective
        </h1>
      </template>

      <template #subtitle>
        <h4 class="font-italic">
          "Data should be available and easy to understand for everyone, complexity is not equal to wisdom "
        </h4>
      </template>

      <template #text>
        <p>
          Nowadays is easy to find all the data you need but sometimes is hard to understand or
          requires a lot of effort to get the meaning of the data you found.
        </p>

        <p>
          In the field of astronomy,the amount of public data available is incredible but only
          a few people can understand it without effort, this is one of the causes many people lost
          interest in this kind of theme.
        </p>

        <p>
          In MVP Observatory we know that, and we are trying to offer you all the data available from
          space agencies like NASA or ESA in a way that makes you easy to assimilate astronomy info in
          a user-friendly way
        </p>
      </template>
    </section-info-block>

    <section-info-block :media="true">
      <template #title>
        <h1>
          Technology
        </h1>
      </template>

      <template #subtitle>
        <h3>
          &#129302;&#128241; &#10145; &#128640;&#128126; &#10145; &#129327;
        </h3>
      </template>

      <template #text>
        <p>
          The MVP Observatory is a SPA web app, in few words is a front end project that consumes
          the data from the public API of the different space agencies and show them to you in a pretty way.
        </p>

        <p>
          To make this web app we are using many tools but the most important are: <b>Vue.js</b>, a progressive JavaScript framework that allows us to use
          "components", thanks to this we can reuse a lot of code avoiding a resource expensive and
          an unmaintainable web app
        </p>

        <p>
          For the look&field of the web, we use <b>Vuetify</b> a Material Design Component Framework
          that facilitate us to give you that look that you are used to see in your devices like your smartphone
        </p>

        <p>
          Agencies API in use: <br>
          <a
            href="https://api.nasa.gov/"
            target="_blank"
          > NASA API Website</a>
        </p>

        <p>
          Space icons design by <a
            href="https://api.nasa.gov/"
            target="_blank"
          > Freepik.com</a>
        </p>
      </template>

      <template #media>
        <v-row
          no-gutters
          align="center"
          justify="center"
          class="fill-height"
        >
          <img
            alt="Vue logo"
            src="@/assets/logo.png"
          >
        </v-row>
      </template>
    </section-info-block>

    <section-info-block
      :media="true"
      :inverse="true"
      class="block-info__negative"
    >
      <template #title>
        <h1 class="text-right">
          What's next?
        </h1>
      </template>

      <template #subtitle>
        <h3 class="font-italic text-right">
          "to the infinity and beyond"
        </h3>
      </template>

      <template #text>
        <p>
          MVP Observatory is a work in progress project,  where we want to show you all the public data available
          from all sort of agencies and time to time we will be adding more and more functions to the web app

          In the future, when this web app will have more functionalities we also want to do a backend project
          that allow us to manage all the data offered by the agencies to improve efficiency and avoid traffic
          limits and other issues related to the developer's world :D

          Now we are working to improve everything, meanwhile, we hope you enjoy your time in MVP Observatory
        </p>

        <p>
          In the future, when this web app will have more functionalities we also want to do a backend project
          that allow us to manage all the data offered by the agencies to improve efficiency and avoid traffic
          limits and other issues related to the developer's world &#129299;
        </p>

        <p>
          Now we are working to improve everything, meanwhile, we hope you enjoy your time in MVP Observatory
        </p>
      </template>

      <template #media>
        <v-row
          no-gutters
          align="center"
          justify="center"
          class="fill-height"
        >
          <v-img
            alt="Vue logo"
            src="@/assets/spaceIcons/astronaut.png"
            width="100px"
          />
        </v-row>
      </template>
    </section-info-block>
  </v-col>
</template>

<script>
import sectionInfoBlock from '@/components/core/sectionInfoBlock'

export default {
  components: {
    sectionInfoBlock
  },
  data() {
    return {
      infoBlocks: [
        {
          title: 'Lorem Ipsum',
          subTitle: 'Lorem Ipsum',
        },
        {
          media: true,
          title: 'Lorem Ipsum',
          subTitle: 'Lorem Ipsum',
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .block-info__negative {
    background-color:white;
    color: black
  }
</style>