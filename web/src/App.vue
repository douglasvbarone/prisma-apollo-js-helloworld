<template>
  <v-app>
    <v-fab-transition>
      <v-btn
        v-if="$route.name != 'Home'"
        small
        fab
        top
        left
        fixed
        color="white"
        light
        style="z-index: 99"
        @click="$router.back()"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-app-bar app flat dark color="primary" hide-on-scroll>
      <v-spacer />

      <v-toolbar-items>
        <v-btn text to="/" exact>
          <v-icon left>mdi-home</v-icon>
          Home
        </v-btn>
<v-btn text to="/drafts" exact>
          <v-icon left>mdi-pencil</v-icon>
          Drafts
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
