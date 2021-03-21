import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import resolvers from './graphql/resolvers'
import Express from 'express'

const run = async () => {
    const schema = await buildSchema({
        resolvers: resolvers,
        emitSchemaFile: true,
        validate: false
    })

    const server = new ApolloServer({schema});
    const app = Express();
    server.applyMiddleware({ app })

    app.listen( {port: 8080}, () => {
        console.log('running....')
    })
}

run()
.catch(err => console.error(err))