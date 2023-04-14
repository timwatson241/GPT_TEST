import express from 'express';
import connectDB from './mongodb/connect';
import postRoutes from './routes/postRoutes';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/post', postRoutes);

app.get('/', async (_req, res) => {
  res.status(200).json({ message: 'Hello!' });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL as string);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();