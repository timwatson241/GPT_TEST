declare module 'mongodb/models/post' {
    import { Document, Model } from 'mongoose';
  
    interface IPost {
      name: string;
      prompt: string;
      photo: string;
    }
  
    interface IPostDocument extends IPost, Document {}
    interface IPostModel extends Model<IPostDocument> {}
  
    const Post: IPostModel;
  
    export default Post;
  }
  