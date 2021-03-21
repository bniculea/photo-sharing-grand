var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import resolvers from './graphql/resolvers';
import Express from 'express';
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield buildSchema({
        resolvers: resolvers,
        emitSchemaFile: true,
        validate: false
    });
    const server = new ApolloServer({ schema });
    const app = Express();
    server.applyMiddleware({ app });
    app.listen({ port: 8080 }, () => {
        console.log('running....');
    });
});
run()
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map