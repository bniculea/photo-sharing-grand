import "reflect-metadata"
import { ObjectType, Field } from "type-graphql"

@ObjectType({description: "The comment user model"})
export class Comment {
    @Field()
    id: string

    @Field()
    content: string
}