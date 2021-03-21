import {Arg, Query, Resolver} from 'type-graphql'
import {User} from "../../model/User";

@Resolver()
export class UserResolver {
    @Query(_returns => User, {nullable: false})
    async registerUser(@Arg("id") id: string) {
        console.log(id)
    }
}

