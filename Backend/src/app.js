import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import likesRoutes from './routes/likes.routes.js';
import postsRoutes from './routes/posts.routes.js';
import usersRoutes from './routes/users.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
}));

// Cookie parser
app.use(cookieParser());

// Middlewares
app.use(morgan('dev'));

// JSON
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", commentsRoutes);
app.use("/api", likesRoutes);
app.use("/api", postsRoutes);
app.use("/api", usersRoutes);


export default app;


