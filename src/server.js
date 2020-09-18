import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        db: prisma
    }
})
