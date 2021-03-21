import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import resolvers from './src/graphql/resolvers'
import Express from 'express'

const PORT = process.env.PORT || 8080;

const run = async () => {
    const schema = await buildSchema({
        resolvers: resolvers,
        emitSchemaFile: true,
        validate: false
    })

    const server = new ApolloServer({schema});
    const app = Express();
    server.applyMiddleware({ app })

    app.listen( {port: PORT}, () => {
        console.log(`Server running on ${PORT}\n Apollo server running on ${server.graphqlPath}`)
    })
}

run()
.catch(err => console.error(err))