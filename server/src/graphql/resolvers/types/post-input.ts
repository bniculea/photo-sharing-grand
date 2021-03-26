import {Post} from "../../../model/Post";
import {Field, InputType} from "type-graphql";

@InputType()
export class PostInput implements  Partial<Post> {
    @Field()
    image: string

    @Field()
    ownerId: string

}