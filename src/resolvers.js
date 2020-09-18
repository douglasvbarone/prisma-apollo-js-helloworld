export const resolvers = {
    Query: {
        users: (_, args, { db }) => db.user.findMany({
            include: {
                posts: true,
                profile: true,
            },
        }),
        
        posts: (_, args, {db})=> db.post.findMany()
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
        })
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
        })
    }
}