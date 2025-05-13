import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
// import projectRoutes from './src/routes/projectRoutes.js'; // To be implemented
// import documentRoutes from './src/routes/documentRoutes.js'; // To be implemented
// import stripeRoutes from './src/routes/stripeRoutes.js'; // To be implemented
// import adminRoutes from './src/routes/adminRoutes.js'; // To be implemented

dotenv.config();

connectDB();

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:5173']; // Add your frontend URL
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('AuthorityGPT API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/documents', documentRoutes);
// app.use('/api/stripe', stripeRoutes);
// app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
