<template>
  <v-app>
    <v-app-bar app flat>
      <v-toolbar-items>
        <v-btn text x-large to="/"><v-icon left>mdi-home</v-icon> Blog</v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-btn color="primary" text to="/post/new"
          ><v-icon left>mdi-plus</v-icon> Post</v-btn
        >
      </v-toolbar-items>
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
