import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {User} from "../../model/User";
import {UserInput} from "./types/user-input";
import {UserInputError} from "apollo-server-errors";
import {UserInputValidator} from "../../utils/validator";
import {UserService} from "../../service/UserService";

@Resolver()
export class UserResolver {
    @Mutation(_returns => User, {nullable: false})
    async registerUser( @Arg('userInput') userInput: UserInput): Promise<User> {
        const validationResult = await UserInputValidator.getStatus(userInput)
        if (validationResult.length > 0) {
            throw new UserInputError('Errors', validationResult)
        }
        const createdUser = await UserService.createUser(userInput)

        return createdUser
    }

    @Query(_returns=>User, {nullable: false})
    async getUser(@Arg('userId') userId: string) : Promise<User> {
        return UserService.getUser(userId)
    }

}

