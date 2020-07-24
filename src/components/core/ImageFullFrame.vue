<template>
  <v-col cols="12">
    <v-img
      v-bind="$attrs"
      contain
      max-height="90vh"
      max-width="100vw"
    >
      <template #placeholder>
        <v-row>
          <v-skeleton-loader
            type="image"
            min-width="100vw"
            min-height="90vh"
          />
        </v-row>
      </template>
    </v-img>
  </v-col>
</template>
