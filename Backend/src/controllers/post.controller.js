
import { posts, updateDataFilePosts } from "../data/postData.js";
import { users } from "../data/userData.js";
import { TOKEN_SECRET } from "../config.js";


export const getPosts = async (req, res) => {
    res.json(posts);
}