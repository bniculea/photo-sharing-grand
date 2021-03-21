import {UserResolver}  from './users.js'
import {NonEmptyArray} from "type-graphql";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    UserResolver
]

export default resolvers
