<template>
  <v-app>
    <v-app-bar
      app
      flat
    >
      <v-app-bar-nav-icon
        v-if="!isDrawerVisible"
        @click="updateDrawerVisibility"
      />
      <v-toolbar-title>MVP Observatory</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="isDrawerVisible"
      app
      class="accent-4 deep-purple"
    >
      <v-list>
        <v-list-item
          link
          @click="updateDrawerVisibility"
        >
          <v-list-item-icon>
            <v-icon>mdi-menu</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> Close Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="section in drawerSections"
          :key="section.title"
          :to="section.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ section.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ section.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      isDrawerVisible: false,
      drawerSections: [
        {
          icon:'mdi-home',
          title: 'Home',
          route: '/'
        },
        {
          icon:'mdi-help-box',
          title: 'About',
          route: 'about'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'isMobileBrowser'
    ]),
  },
  methods: {
    updateDrawerVisibility () {
      this.isDrawerVisible = !this.isDrawerVisible
    }
  },
};
</script>
