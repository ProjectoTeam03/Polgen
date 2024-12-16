import Excel from 'exceljs';
import path from 'path';
import fs from 'fs';

export const generateExcelTemplate = async (templateid, rows, res) => {
  try {
    const templatePath = path.resolve('src/files/siparis_template.xlsx'); // Adjust template file path
    console.log('Loading template from:', templatePath);

    if (!fs.existsSync(templatePath)) {
      console.error('Template file not found:', templatePath);
      throw new Error('Template file not found');
    }

    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(templatePath);

    const sheet = workbook.getWorksheet(1);
    if (!sheet) {
      throw new Error('Worksheet not found');
    }

    // Populate rows if provided
    if (rows.length > 0) {
      rows.forEach((row, rowIndex) => {
        const excelRow = sheet.getRow(rowIndex + 1);
        row.forEach((cell, colIndex) => {
          excelRow.getCell(colIndex + 1).value = cell;
        });
        excelRow.commit();
      });
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="siparis_template.xlsx"');
    await workbook.xlsx.write(res);
  } catch (error) {
    console.error('Error in generateExcelTemplate:', error.message);
    throw error;
  }
};

