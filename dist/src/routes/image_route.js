"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const baseUrl = "http://192.168.56.1:3000/";
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        console.log("multer storage callback");
        cb(null, Date.now().toString() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
router.post('/upload', upload.single('image'), function (req, res) {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }
    const fileUrl = baseUrl + req.file.destination + req.file.filename;
    res.status(200).send({ url: fileUrl });
});
exports.default = router;
//# sourceMappingURL=image_route.js.map