import bcrypt from 'bcrypt';

import DbSession from "./DbSession";
import {UserInput} from "../graphql/resolvers/types/user-input";
import {User} from "../model/User";
import {UserInputError} from "apollo-server-errors";


export class UserService {

    static createUser = async (userInput: UserInput): Promise<User> => {
        const session = DbSession.getSession()
        try {
            userInput.password = await bcrypt.hash(userInput.password, 10);
            const createUserQuery = ` //Cypher
                CREATE (u: User {id: apoc.create.uuid(), username: $username, email: $email, password: $password})
                RETURN u;
            `
            const result = await session.run(createUserQuery, {...userInput})

            return result.records[0].get(0).properties as User
        } catch (err) {
            throw err
        } finally {
            await session.close()
        }
    }

    static getUser = async (userId: string):  Promise<User> => {
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
            foundUser.password = ''
            return foundUser

        } catch (err) {
            throw err
        } finally {
            await session.close
        }
    }

    static isEmailUnique = async (email: string): Promise<boolean> => {
        const findEmailUniquenessQuery = ` //Cypher
            MATCH (u:User {email: $email} ) RETURN u;
        `
        const result = await DbSession.getSession().run(findEmailUniquenessQuery, {email})

        return result.records.length === 0
    }
}