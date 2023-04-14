// Importing required dependencies
import mongoose from 'mongoose'; // mongoose for MongoDB object modeling

// Define the schema for a post document in the MongoDB database
const Post = new mongoose.Schema({
  service: { type: String, required: true }, // Name of the post author
  prompt: { type: String, required: true }, // Prompt for the post content
  photo: { type: String, required: true }, // URL of the photo associated with the post
});

// Create a model from the post schema, with the name 'Post' and using the 'mongoose' instance
const PostSchema = mongoose.model('Post', Post);

// Export the post schema model for use in other parts of the application
export default PostSchema;
