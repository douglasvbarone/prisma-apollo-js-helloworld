<template>
  <v-container class="home">
    <v-row>
      <v-col v-for="post in posts" :key="post.id" cols="12" md="6">
        <v-card class="fill-height" outlined flat>
          <v-card-title class="display-1">
            {{ post.title }}
          </v-card-title>
          <v-card-text>
            <span>
              Author: {{ post.author.name }} - Published {{ post.createdAt }}
            </span>
          </v-card-text>
          <v-card-text> {{ post.content }} </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" :to="`/post/${post.id}`">
              Continue Reading...
            </v-btn>
          </v-card-actions>
        </v-card>
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
    posts: gql`
      {
        posts(onlyPublished: true) {
          id
          createdAt
          title
          content
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
</script>
