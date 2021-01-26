<template>
  <v-container v-if="post" style="max-width: 960px">
    <h1 class="display-4 mb-6">{{ post.title }}</h1>
    <v-container fluid>
      <v-row>
        <v-col class="shrink" align-self="center">
          <v-img
            :src="post.author.profile.avatar"
            contain
            :height="128"
            :width="128"
          />
        </v-col>
        <v-col align-self="center">
          <h3 class="display-1 font-weight-light">{{ post.author.name }},</h3>
          <small>{{ post.author.profile.bio }}</small>
          <br />
          <small>
            {{ post.createdAt }}
          </small>
        </v-col>
      </v-row>
    </v-container>

    <p
      class="my-12 content font-weight-light text-justify"
      v-html="content"
    ></p>

    <v-speed-dial
      fixed
      bottom
      right
      direction="top"
      transition="scale-transition"
    >
      <template #activator>
        <v-btn x-large fab color="primary"><v-icon>mdi-plus</v-icon></v-btn>
      </template>
      <v-btn fab color="green" :to="`/post/${$route.params.id}/edit`" dark>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn color="red darken-2" dark fab @click="deletePost">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </v-speed-dial>
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
                avatar
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
  computed: {
    content() {
      return this.post?.content.replaceAll('\n', '</p><p>')
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

<style>
.content {
  line-height: 1.8em;
  font-size: 24px;
}
</style>
