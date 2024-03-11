import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import { updateProfilePicture } from './controllers/users.js';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); 
app.use(cors({
    origin: ["http://localhost:3000", 
    "https://social-media-app-el95.onrender.com"],
}));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket:"social-media-app-storage-8a9d8.appspot.com"
})

const bucket = admin.storage().bucket();

const upload = multer({ storage: multer.memoryStorage() });

async function uploadToFirebase(req, res, next) {
    if (!req.file) {
        return next();
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    blobStream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    blobStream.on('finish', () => {
        req.file.cloudStoragePublicUrl = getPublicUrl(req.file.originalname);
        next();
    });

    blobStream.end(req.file.buffer);
}

function getPublicUrl(filename) {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media`;
}

app.post("/auth/register", upload.single("picture"), uploadToFirebase, register);
app.post("/posts", verifyToken, upload.single("picture"), uploadToFirebase, createPost);
app.patch("/users/:id/updateProfilePicture", verifyToken, upload.single('picture'), uploadToFirebase, updateProfilePicture);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes); 

const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
