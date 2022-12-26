<template>
  <v-footer app color="primary" dark absolute>
    <v-spacer></v-spacer>
    <div>&copy; {{new Date().getFullYear() + ' ' + footer}}</div>
    <v-btn icon @click="openDialog"><v-icon>mdi-pencil</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>
          제목 수정
          <v-spacer/>
          <v-btn icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
          <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="text" outlined label="제목" @keydown.enter="save" hide-details/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-footer>
</template>
<script>
import { getDatabase, ref, update } from 'firebase/database'

export default {
  props: ['footer'],
  data () {
    return {
      dialog: false,
      text: this.footer
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    async save () {
      const db = getDatabase()
      await update(ref(db, 'site/'), {
        footer: this.text
      })
      this.dialog = false
    }
  }
}
</script>
