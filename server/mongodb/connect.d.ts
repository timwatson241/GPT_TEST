declare module "mongodb/connect" {
    const connectDB: (url: string) => void;
    export default connectDB;
  }
  