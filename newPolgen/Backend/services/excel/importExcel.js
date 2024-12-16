import Excel from 'exceljs';
import fs from 'fs';

export const importExcelFile = async (filePath) => {
  try {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filePath);

    const sheet = workbook.getWorksheet(1);
    if (!sheet) {
      throw new Error('No valid worksheet found');
    }

    const products = [];
    sheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return; // Skip header row
      products.push({
        category: row.getCell(1).value || 'prime',
        modifications: {
          fivePrime: row.getCell(2).value || '',
          threePrime: row.getCell(3).value || '',
        },
        saflaştırma: row.getCell(4).value || null,
        scale: row.getCell(5).value || '50 nmol',
        totalPrice: parseFloat(row.getCell(6).value) || 0,
        oligoAdi: row.getCell(7).value || `Imported Product ${rowIndex}`,
      });
    });

    fs.unlinkSync(filePath); // Delete the file after processing

    return products;
  } catch (error) {
    console.error('Error processing Excel file:', error.message);
    throw error;
  }
};

