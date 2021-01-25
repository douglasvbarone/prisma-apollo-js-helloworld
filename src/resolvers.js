export const resolvers = {
    Query: {
        users: (_, args, { db }) => db.user.findMany({
            include: {
                posts: true,
                profile: true,
            },
        }),

        posts: (_, args, { db }) => db.post.findMany()
    },

    Mutation: {
        createUser: (_, { email, name, bio }, { db }) => db.user.create({
            data: {
                email,
                name,
                profile: bio ? {
                    create: {
                        bio
                    }
                } : undefined
            },
            include: {
                profile: true
            }
        }),

        createPost: (_, { title, content, published, authorEmail }, { db }) => db.post.create({
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
        }),

        deleteUser: (_, { email }, { db }) => db.user.delete({ where: { email } }),

        deletePost: (_, { postId }, { db }) => db.post.delete({ where: { id: postId } }),

        updateProfile: async (_, { email, bio }, { db }) => {
            const user = await db.user.findOne({ where: { email } })

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
        }
    },

    Post: {
        author: (_, args, { db }) => db.user.findOne({
            where: {
                id: _.authorId
            }
        })
    },

    User: {
        profile: (_, args, { db }) => db.profile.findOne({
            where: {
                userId: _.id
            }
        }),

        posts: (_, args, { db }) => db.post.findMany({ where: { authorId: _.id } })
    },

    Profile: {
        user: (_, args, { db }) => db.user.findOne({ where: { id: _.userId } })
    }
}