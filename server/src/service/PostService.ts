import {PostInput} from "../graphql/resolvers/types/post-input";
import {Post} from "../model/Post";
import DbSession from "./DbSession";

export class PostService {
    static createPost = async (postInput:PostInput): Promise<Post> => {
        const session = DbSession.getSession()
        try {
            const createPostQuery = ` //cypher
               CREATE (p:Post {id: apoc.create.uuid(), image: $image, ownerId: $ownerId, comments: []})
               RETURN p;
           `
            const result = await session.run(createPostQuery, {...postInput})

            return result.records[0].get(0).properties as Post
        } catch (err) {
            throw err
        } finally {
            await session.close()
        }
    }
}