<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <site-title :title="site.title"/>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <site-menu :itmes="site.menu"/>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <SiteFooter :footer="site.footer"/>
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/TitleView'
import SiteFooter from '@/views/site/FooterView'
import SiteMenu from '@/views/site/MenuView'
import { getDatabase, ref, set, child, get, onValue } from 'firebase/database'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu },
  name: 'App',
  data () {
    return {
      drawer: false,
      site: {
        menu: [{
          title: 'home',
          action: true,
          icon: 'mdi-home',
          subItems: [
            {
              title: 'Dashboard',
              to: '/'
            },
            {
              title: 'About',
              to: '/about'
            }
          ]
        }],
        title: '나의 타이틀입니다.',
        footer: '푸터입니다.'
      }
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    subscribe () {
      const db = getDatabase()
      const starCountRef = ref(db, 'site/')
      onValue(starCountRef, (snapshot) => {
        if (!snapshot.val()) {
          set(ref(db, 'site/'), this.site)
          return
        }
        this.site = snapshot.val()
        console.log(snapshot.val())
      }, error => {
        console.log(error.message)
      })
    },
    read () {
      const dbRef = ref(getDatabase())
      get(child(dbRef, 'title/')).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
        } else {
          console.log('No data available')
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  readOnce () {
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'site/')).then((snapshot) => {
      if (snapshot.exists()) {
        this.site = snapshot.val()
      } else {
        const db = getDatabase()
        set(ref(db, 'site/'), this.site)
      }
    }).catch((error) => {
      console.error(error)
    })
  }
}
</script>
