<template>
  <v-container class="home" style="max-width: 960px">
    <v-row>
      <v-col v-for="post in posts" :key="post.id" cols="12" md="6">
        <v-hover v-slot="{ hover }">
          <router-link :to="`/post/${post.id}`" class="text-decoration-none">
            <v-card class="fill-height pop" :elevation="hover ? 24 : 5">
              <v-card-title class="headline font-weight-light">
                {{ post.title }}
              </v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col class="shrink">
                      <v-img
                        :src="post.author.profile.avatar"
                        contain
                        :height="42"
                        :width="42"
                      />
                    </v-col>
                    <v-col class="grow">
                      {{ post.author.name }} <br />
                      Published {{ post.createdAt }}
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-text>
                {{ post.intro }}... <small>Continue reading</small>
              </v-card-text>
            </v-card>
          </router-link>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'Home',
  components: {},
  apollo: {
    posts: {
      query: gql`
        {
          posts(onlyPublished: true) {
            id
            createdAt
            title
            intro
            published
            createdAt
            author {
              name
              profile {
                avatar
              }
            }
          }
        }
      `
    }
  }
}
</script>

<style scoped></style>
