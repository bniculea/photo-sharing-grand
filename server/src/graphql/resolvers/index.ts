import {UserResolver}  from './user.js'
import {NonEmptyArray} from "type-graphql";
import {PostResolver} from "./post";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    UserResolver,
    PostResolver
]

export default resolvers
