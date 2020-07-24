<template>
  <v-row
    align="center"
    justify="center"
    no-gutters
  >
    <v-img
      v-bind="$attrs"
      contain
      height="100vh"
    >
      <template #placeholder>
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col cols="12">
            <v-progress-circular
              color="amber"
              indeterminate
            />
          </v-col>
        </v-row>
      </template>
    </v-img>
  </v-row>
</template>
