<template>
  <v-container>
    <v-card>
      <v-card-title class="display-1">
        New Post
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            :rules="titleRules"
          />
          <v-autocomplete
            v-model="author"
            outlined
            label="Author"
            :items="authors"
            :rules="authorRules"
            clearable
          />
          <v-textarea
            v-model="content"
            height="300"
            label="Content"
            outlined
            :rules="contentRules"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-switch v-model="published" label="Published" class="mr-4" />
        <v-btn color="primary" @click="save">
          <v-icon left>mdi-content-save</v-icon>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: () => ({
    loading: false,

    valid: false,

    titleRules: [
      v => !!v || "Title can't be empty",
      v => v.length < 70 || 'Title must be less than 70 characters long'
    ],
    authorRules: [v => !!v || 'You must choose an author'],
    contentRules: [v => !!v || "Content can't be empty"],

    author: null,
    title: '',
    content: '',
    published: false
  }),
  apollo: {
    users: gql`
      {
        users {
          id
          name
          email
        }
      }
    `
  },
  computed: {
    authors() {
      return this.users?.map(user => ({ text: user.name, value: user.email }))
    }
  },
  methods: {
    async save() {
      this.$refs.form.validate()

      if (this.valid)
        try {
          const {
            data: { createPost }
          } = await this.$apollo.mutate({
            mutation: gql`
              mutation($data: PostInput!) {
                createPost(data: $data) {
                  id
                }
              }
            `,
            variables: {
              data: {
                title: this.title,
                content: this.content,
                published: this.published,
                authorEmail: this.author
              }
            }
          })

          this.$router.push(`/post/${createPost.id}`)
        } catch (e) {
          console.log(e)
        }
    }
  }
}
</script>

<style></style>
