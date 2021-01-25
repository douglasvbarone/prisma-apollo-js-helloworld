<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn to="/" icon><v-icon>mdi-home</v-icon></v-btn>
      <v-app-bar-title>Blog</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  })
}
</script>
