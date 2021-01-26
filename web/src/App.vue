<template>
  <v-app>
    <v-app-bar app flat dark color="primary" collapse-on-scroll>
      <v-fab-transition>
        <v-btn
          v-if="$route.name != 'Home'"
          fab
          color="white"
          light
          @click="$router.back()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-spacer />

      <v-toolbar-items>
        <v-btn text to="/" exact>
          <v-icon left>mdi-home</v-icon>
          Home
        </v-btn>

        <v-btn text to="/post/new">
          <v-icon left>mdi-plus</v-icon>
          Post
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main class="mt-6">
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
