import "reflect-metadata"
import {Field, ObjectType} from "type-graphql";
import {Comment} from './Comment'

@ObjectType({ description:  'The post model'})
export class Post {
    @Field()
    id:  string

    @Field()
    image: string

    // @ts-ignore
    @Field( type =>[Comment])
    comments: Array<Comment>

    @Field()
    ownerId: string

}