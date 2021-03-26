import {Arg, Mutation, Resolver} from "type-graphql";
import {Post} from "../../model/Post";
import {PostInput} from "./types/post-input";
import {checkPostInputValidation} from "../../utils/validator";
import {UserInputError} from "apollo-server-errors";
import {PostService} from "../../service/PostService";

@Resolver()
export class PostResolver {

    @Mutation(_returns => Post, {nullable: false})
    async createPost(@Arg('postInput') postInput: PostInput): Promise<Post> {
        const validationResult = await checkPostInputValidation(postInput)
        if (validationResult.length > 0) {
            throw new UserInputError('Error', validationResult)
        }

        const createdPost = await PostService.createPost(postInput)

        return createdPost
    }
}