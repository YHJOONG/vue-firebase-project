<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <site-title :title="title"/>
      <v-spacer></v-spacer>
      <v-btn icon @click="save"><v-icon>mdi-check</v-icon></v-btn>
      <v-btn icon @click="read"><v-icon>mdi-numeric</v-icon></v-btn>
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
    <v-main>
      <router-view/>
    </v-main>
    <SiteFooter :footer="footer"/>
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/TitleView'
import SiteFooter from '@/views/site/FooterView'
import SiteMenu from '@/views/site/MenuView'
import { getDatabase, ref, set, onValue } from 'firebase/database'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu },
  name: 'App',
  data () {
    return {
      drawer: false,
      title: '나의 타이틀입니다.',
      footer: '푸터입니다.'
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    save () {
      console.log('save')
      const db = getDatabase()
      set(ref(db, 'title/'), {
        title: '제목입니다.',
        text: '테스트 텍스트입니다.'
      })
    },
    read () {
      const db = getDatabase()
      const starCountRef = ref(db, 'title/')
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        console.log(data)
      })
    }
  }
}
</script>
