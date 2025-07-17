
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import productRoutes from './routes/productRoutes.js';

dotenv.config();


const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // ✅ Allow requests from your React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // ✅ Allow only these HTTP methods
  credentials: true, // ✅ Allow cookies or credentials (optional if not using auth)
}));

app.use('/api/products', productRoutes);



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on  port ${process.env.PORT}`);
  });
})
.catch(err => console.error(err));
