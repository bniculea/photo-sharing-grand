import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {User} from "../../model/User";
import DbSession from "../../repository/DbSession";
import {UserInput} from "./types/user-input";
import {UserInputError} from "apollo-server-errors";

@Resolver()
export class UserResolver {
    @Mutation(_returns => User, {nullable: false})
    async registerUser( @Arg('userInput') userInput: UserInput): Promise<User> {
        const session = DbSession.getSession()
        const {username, email} = userInput
        try {
            const createUserQuery = ` //Cypher
                CREATE (u: User {id: apoc.create.uuid(), username: $username, email: $email})
                RETURN u;
            `
            const result = await session.run(createUserQuery, {username, email})
            const createdUser = result.records[0].get(0).properties as User

            return createdUser
        } catch (err) {
            throw err
        } finally {
            await session.close()
        }
    }

    @Query(_returns=>User, {nullable: false})
    async getUser(@Arg('userId') userId: String) : Promise<User> {
        const session = DbSession.getSession()
        try {
            const createUserQuery = ` //Cypher
               MATCH (u: User {id: $userId})
               RETURN u;
            `
            const result = await session.run(createUserQuery, {userId})
            if (!result || result.records.length === 0) {
                throw new UserInputError('User not found')
            }
            const foundUser = result.records[0].get(0).properties as User

            return foundUser

        } catch (err) {
            throw err
        } finally {
            await session.close
        }
    }

}

