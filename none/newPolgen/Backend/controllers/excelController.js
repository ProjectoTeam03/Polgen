import { generateExcelTemplate } from '../services/excel/generateTemplate.js';
import { importExcelFile } from '../services/excel/importExcel.js';
import path from 'path';

export const exportTemplate = async (req, res) => {
  try {
    const { templateid, rows } = req.body;

    if (!templateid || !Array.isArray(rows)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    await generateExcelTemplate(templateid, rows, res);
  } catch (error) {
    console.error('Error in exportTemplate:', error.message);
    res.status(500).json({ message: 'Error generating Excel file' });
  }
};

export const importTemplate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.resolve(process.cwd(), req.file.path);
    const products = await importExcelFile(filePath);

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error in importTemplate:', error.message);
    res.status(500).json({ message: 'Error processing Excel file' });
  }
};

