import {User} from '../../../model/User'
import {Field, InputType, ID} from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
    @Field(()=> ID)
    id: string

    @Field()
    username: string

    @Field()
    email: string




}