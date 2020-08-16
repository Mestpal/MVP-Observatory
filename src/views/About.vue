<template>
  <v-col>
    <section-intro title="About MVP Observatory Project" />

    <section-info-block
      :title="infoBlocks[0].title"
      :subtitle="infoBlocks[0].subtitle"
      :media="infoBlocks[0].media"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed eu ultrices turpis, ac fringilla turpis. Donec ut lorem dolor.
        Duis metus neque, pharetra sit amet lectus id, mattis varius libero.
        Quisque pulvinar tristique mattis. Nullam nisi sapien
      </p>
    </section-info-block>

    <section-info-block
      :title="infoBlocks[1].title"
      :subtitle="infoBlocks[1].subtitle"
      :media="infoBlocks[1].media"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed eu ultrices turpis, ac fringilla turpis. Donec ut lorem dolor.
        Duis metus neque, pharetra sit amet lectus id, mattis varius libero.
        Quisque pulvinar tristique mattis. Nullam nisi sapien
      </p>
    </section-info-block>
  </v-col>
</template>

<script>
import sectionIntro from '@/components/core/sectionIntro'
import sectionInfoBlock from '@/components/core/sectionInfoBlock'

export default {
  components: {
    sectionIntro,
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