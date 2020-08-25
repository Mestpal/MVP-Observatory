<template>
  <v-app>
    <v-app-bar
      app
      :flat="isDarkTheme"
      color="primary"
    >
      <v-app-bar-nav-icon
        v-if="!isDrawerVisible"
        @click="updateDrawerVisibility"
      />
      <v-toolbar-title>MVP Observatory</v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        @click="changeTheme"
      >
        <template>
          <v-icon v-if="isDarkTheme">
            mdi-white-balance-sunny
          </v-icon>
          <v-icon v-else>
            mdi-moon-waning-crescent
          </v-icon>
        </template>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="isDrawerVisible"
      app
      class="accent-4"
      color="info"
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
import { mapActions, mapGetters } from 'vuex'

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
          icon:'mdi-rocket-launch-outline',
          title: 'Nasa',
          route: '/nasa'
        },
        {
          icon:'mdi-help-box',
          title: 'About',
          route: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'isDarkTheme',
      'isMobileBrowser'
    ]),
  },
  beforeMount () {
    this.$vuetify.theme.dark = this.isDarkTheme
  },
  methods: {
    ...mapActions([
      'updateTheme'
    ]),
    changeTheme () {
      this.updateTheme()
      this.$vuetify.theme.dark = this.isDarkTheme
    },
    updateDrawerVisibility () {
      this.isDrawerVisible = !this.isDrawerVisible
    }
  },
};
</script>
