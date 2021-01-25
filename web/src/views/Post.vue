<template>
  <v-container v-if="post">
    <h1 class="display-4 mb-6">{{ post.title }}</h1>
    <h3 class="display-1 font-weight-light">
      {{ post.author.name }},
      <small>
        {{ post.createdAt }}
      </small>
    </h3>
    <small>{{ post.author.profile.bio }}</small>
    <p class="my-12">{{ post.content }}</p>
    <v-btn icon :to="`/post/${$route.params.id}/edit`">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn color="red darken-2" dark fab bottom right fixed @click="deletePost">
      <v-icon>mdi-trash-can</v-icon>
    </v-btn>
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
  },
  methods: {
    async deletePost() {
      if (confirm('Are you sure?'))
        try {
          await this.$apollo.mutate({
            mutation: gql`
              mutation($postId: String!) {
                deletePost(postId: $postId) {
                  id
                }
              }
            `,
            variables: {
              postId: this.$route.params.id
            }
          })

          this.$router.replace('/')
        } catch (e) {
          console.log(e)
        }
    }
  }
}
</script>

<style></style>
