import "reflect-metadata"
import { ObjectType, Field } from "type-graphql";

@ObjectType({description: "The user model"})
export class User {
    @Field()
    id: string

    @Field()
    username: string

    @Field()
    email: string
}