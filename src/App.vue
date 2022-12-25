<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <site-title :title="title"/>
      <v-spacer></v-spacer>
      <v-btn icon to="/about">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <site-menu/>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <SiteFooter :footer="footer"/>
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/TitleView'
import SiteFooter from '@/views/site/FooterView'
import SiteMenu from '@/views/site/MenuView'
export default {
  components: { SiteTitle, SiteFooter, SiteMenu },
  name: 'App',
  data () {
    return {
      drawer: false,
      title: '나의 타이틀입니다.',
      footer: '푸터입니다.'
    }
  }
}
</script>
