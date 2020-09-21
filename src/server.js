import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

const context = {
    db: new PrismaClient()
}

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})
