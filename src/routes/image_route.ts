import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const baseUrl = "http://192.168.56.1:3000/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        console.log("multer storage callback");
        cb(null, Date.now().toString() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), function (req: Request, res: Response) {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }
    const fileUrl = baseUrl + req.file.destination + req.file.filename;
    res.status(200).send({ url: fileUrl });
});

export default router;
