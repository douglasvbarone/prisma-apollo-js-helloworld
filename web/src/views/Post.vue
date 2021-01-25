<template>
  <v-container v-if="post">
    <h1 class="display-4 mb-6">{{ post.title }}</h1>
    <h3 class="display-1 font-weight-light">{{ post.author.name }}</h3>
    <small>{{ post.author.profile.bio }}</small>
    <p class="my-12">{{ post.createdAt }}: {{ post.content }}</p>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    post: {
      query: gql`
        query($id: String!) {
          post(id: $id) {
            id
            createdAt
            title
            content
            published

            author {
              name
              email
              profile {
                bio
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
}
</script>

<style></style>
