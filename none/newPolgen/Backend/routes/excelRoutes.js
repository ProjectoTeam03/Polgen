import express from 'express';
import multer from 'multer';
import { exportTemplate, importTemplate } from '../controllers/excelController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory to temporarily store uploaded files

router.post('/exportwb', exportTemplate); // Route to generate Excel template
router.post('/import', upload.single('file'), importTemplate); // Route to import Excel file

export default router;

