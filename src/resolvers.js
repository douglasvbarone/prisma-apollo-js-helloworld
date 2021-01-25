export const resolvers = {
  Query: {
    users: (_, args, { db }) =>
      db.user.findMany({
        include: {
          posts: true,
          profile: true
        }
      }),

    async posts(_, { onlyPublished }, { db }) {
      const posts = await db.post.findMany({
        where: { published: onlyPublished ? true : undefined },
        orderBy: { createdAt: 'desc' }
      })

      return posts.map(post => ({
        ...post,
        content: post.content.slice(0, 150) + '...'
      }))
    },

    post(_, { id }, { db }) {
      return db.post.findUnique({ where: { id } })
    }
  },

  Mutation: {
    createUser(_, { email, name, bio }, { db }) {
      return db.user.create({
        data: {
          email,
          name,
          profile: bio
            ? {
                create: {
                  bio
                }
              }
            : undefined
        },
        include: {
          profile: true
        }
      })
    },

    createPost(
      _,
      { data: { title, content, published, authorEmail } },
      { db }
    ) {
      return db.post.create({
        data: {
          title,
          content,
          published,
          author: {
            connect: {
              email: authorEmail
            }
          }
        }
      })
    },

    updatePost(
      _,
      { id, data: { title, content, published, authorEmail } },
      { db }
    ) {
      return db.post.update({
        where: { id },
        data: {
          title,
          content,
          published,
          author: {
            connect: {
              email: authorEmail
            }
          }
        }
      })
    },

    deleteUser(_, { email }, { db }) {
      return db.user.delete({ where: { email } })
    },

    deletePost(_, { postId }, { db }) {
      return db.post.delete({ where: { id: postId } })
    },

    async updateProfile(_, { email, bio }, { db }) {
      const user = await db.user.findUnique({ where: { email } })

      return db.profile.upsert({
        where: {
          userId: user.id
        },
        create: {
          bio,
          user: {
            connect: {
              email
            }
          }
        },
        update: {
          bio
        }
      })
    },

    async publishPost(_, { id }, { db }) {
      const post = await db.post.update({
        where: {
          id
        },
        data: { published: true }
      })

      if (!post) throw new Error('Post inexistent')

      return post
    },

    async unPublishPost(_, { id }, { db }) {
      const post = await db.post.update({
        where: {
          id
        },
        data: { published: false }
      })

      if (!post) throw new Error('Post inexistent')

      return post
    }
  },

  Post: {
    author: (parent, args, { db }) =>
      db.user.findUnique({
        where: {
          id: parent.authorId
        }
      }),

    createdAt: parent => new Date(parent.createdAt).toLocaleString()
  },

  User: {
    profile: (_, args, { db }) =>
      db.profile.findUnique({
        where: {
          userId: _.id
        }
      }),

    posts: (_, args, { db }) => db.post.findMany({ where: { authorId: _.id } })
  },

  Profile: {
    user: (_, args, { db }) => db.user.findUnique({ where: { id: _.userId } })
  }
}
