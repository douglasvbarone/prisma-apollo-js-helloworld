<template>
  <v-container class="home">
    <v-row>
      <v-col v-for="post in posts" :key="post.id" cols="12" md="6">
        <v-hover v-slot="{ hover }">
          <v-card class="fill-height" :elevation="hover ? 16 : 1">
            <v-card-title class="display-1">
              {{ post.title }}
            </v-card-title>
            <v-card-text>
              <span>
                Author: {{ post.author.name }} - Published {{ post.createdAt }}
              </span>
            </v-card-text>
            <v-card-text>
              {{ post.intro }}...
              <router-link
                :to="`/post/${post.id}`"
                style="text-decoration: none"
              >
                continue reading
              </router-link>
            </v-card-text>
          </v-card>
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
      fetchPolicy: 'cache-and-network',
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
            }
          }
        }
      `
    }
  }
}
</script>
