import {UserInput} from "../graphql/resolvers/types/user-input";
import {UserService} from "../service/UserService";
import {PostInput} from "../graphql/resolvers/types/post-input";


   export const checkPostInputValidation = async (postInput: PostInput): Promise<Array<string>> => {
       const errors: Array<string> = Array.from('')
       if (postInput.image.trim() === '') {
            errors.push('The image url cannot be empty')
       }

       if (postInput.ownerId.trim() === '') {
           errors.push('The post should have an owner')
       }

       return errors
   }
   export const checkUserInputValidation = async (userInput: UserInput): Promise<Array<string>> => {
        const errors: Array<string> = Array.from('')
        if (userInput.username.trim() === '') {
            errors.push('The username cannot be empty')
        }

        if (userInput.email.trim() === '') {
            errors.push('The email cannot be empty')
        } else {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            if (!userInput.email.match(regex)){
                errors.push('The email should have a valid format')
            }
        }

        const isEmailValid = await UserService.isEmailUnique(userInput.email)
        if (!isEmailValid) errors.push('Email address already in use')

        if (userInput.password.trim() === '') {
            errors.push('The password should not be empty')
        }

        return errors
    }