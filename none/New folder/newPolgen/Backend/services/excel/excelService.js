const express = require('express');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const multer = require('multer');
const ExcelJS = require('exceljs');
const XlsxPopulate = require('xlsx-populate');
const bodyParser = require('body-parser');

// Set up express router and middleware
const router = express.Router();

// Middleware for handling JSON body parsing
router.use(bodyParser.json());

// Define upload destination
const upload = multer({ dest: 'files/' });

// Helper function to convert Excel column letters to number (1-based)
const columnIndex = (val) => {
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = 0;
  for (let i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
    result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
  }
  return result;
};

// Helper function to convert Excel range (e.g., A1:B2) to row/column indexes
const rangeIndex = (val) => {
  const [start, end] = val.split(':');
  const [sc, sr] = start.match(/[A-Z]+/)[0], start.match(/\d+/)[0];
  const startCol = columnIndex(sc);
  const startRow = parseInt(sr);
  
  let result = { sc: startCol, sr: startRow };
  
  if (end) {
    const [ec, er] = end.match(/[A-Z]+/)[0], end.match(/\d+/)[0];
    result = { ...result, ec: columnIndex(ec), er: parseInt(er) };
  }
  
  return result;
};

// Home route
router.get('/', (req, res) => {
  res.send('Excel Service');
});

// Create an Excel file
router.post('/create', async (req, res) => {
  const { excel_entries, sheets } = req.body;

  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
    stream: res,
    useSharedStrings: true,
    useStyles: true,
  });

  sheets.forEach((sheet_map) => {
    const { name, pageSetup, columns, properties, cellStyles, validations, merges, cells } = sheet_map;
    const ws = workbook.addWorksheet(name, { state: 'visible' });

    // Apply page setup and columns
    if (pageSetup) ws.pageSetup = pageSetup;
    if (columns) ws.columns = columns;
    if (properties) Object.assign(ws.properties, properties);

    // Apply cell styles
    if (cellStyles) {
      cellStyles.forEach(({ target, style }) => {
        target.forEach((range_key) => {
          const { sc, sr, ec, er } = rangeIndex(range_key);
          for (let i = sr; i <= er; i++) {
            for (let j = sc; j <= ec; j++) {
              ws.getCell(i, j).style = style;
            }
          }
        });
      });
    }

    // Apply data validation
    if (validations) {
      validations.forEach(({ target, validation }) => {
        target.forEach((range_key) => {
          const { sc, sr, ec, er } = rangeIndex(range_key);
          for (let i = sr; i <= er; i++) {
            for (let j = sc; j <= ec; j++) {
              ws.getCell(i, j).dataValidation = validation;
            }
          }
        });
      });
    }

    // Merge cells
    if (merges) merges.forEach((merge) => ws.mergeCells(merge));

    // Fill cell content
    Object.entries(cells).forEach(([start_key, values]) => {
      const { sc, sr } = rangeIndex(start_key);
      values.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (value !== undefined) ws.getCell(sr + rowIndex, sc + colIndex).value = value;
        });
      });
    });

    ws.commit();
  });

  await workbook.commit();
  console.log('Excel file creation complete');
});

// Export Excel file based on template
router.post('/export', async (req, res) => {
  const { templateid, excel_entries, sheets } = req.body;

  let filename = getTemplateFilename(templateid);
  const filepath = path.join(__dirname, 'files', filename);

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(filepath);

  const imagePath = path.join(__dirname, 'files', 'logo-white.png');
  const imageId = wb.addImage({
    buffer: fs.readFileSync(imagePath),
    extension: 'png',
  });

  // Set workbook properties
  if (req.body.creator) wb.creator = req.body.creator;
  if (req.body.lastModifiedBy) wb.lastModifiedBy = req.body.lastModifiedBy;
  wb.modified = new Date();

  sheets.forEach((sheet_map) => {
    const { name, id, cells, cellStyles, validations, merges, imageRange } = sheet_map;
    let ws = wb.getWorksheet(id) || wb.addWorksheet(name, { state: 'visible' });

    // Apply image to sheet
    if (imageRange) ws.addImage(imageId, imageRange);

    // Fill cell content and apply styles/validation
    fillSheetCells(ws, cells, excel_entries);
    applyCellStyles(ws, cellStyles);
    applyDataValidation(ws, validations);
    if (merges) merges.forEach((merge) => ws.mergeCells(merge));
  });

  await wb.xlsx.write(res);
  console.log('Excel file exported');
});

// Helper function to determine the filename based on the template ID
const getTemplateFilename = (templateid) => {
  switch (templateid) {
    case 1: return 'primer.xlsx';
    case 2: return 'probe.xlsx';
    case 3: return 'production_report_template.xlsx';
    case 4: return 'siparis_template.xlsx';
    case 5: return 'sekans.xlsx';
    default: return 'default_template.xlsx';
  }
};

// Helper function to fill sheet cells
const fillSheetCells = (ws, cells, excel_entries) => {
  Object.entries(cells).forEach(([start_key, values]) => {
    const { sc, sr } = rangeIndex(start_key);
    values.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        const cellValue = excel_entries[value] || value;
        if (cellValue !== undefined) {
          ws.getCell(sr + rowIndex, sc + colIndex).value = cellValue;
        }
      });
    });
  });
};

// Helper function to apply cell styles
const applyCellStyles = (ws, cellStyles) => {
  if (cellStyles) {
    cellStyles.forEach(({ target, style }) => {
      target.forEach((range_key) => {
        const { sc, sr, ec, er } = rangeIndex(range_key);
        for (let i = sr; i <= er; i++) {
          for (let j = sc; j <= ec; j++) {
            ws.getCell(i, j).style = style;
          }
        }
      });
    });
  }
};

// Helper function to apply data validation
const applyDataValidation = (ws, validations) => {
  if (validations) {
    validations.forEach(({ target, validation }) => {
      target.forEach((range_key) => {
        const { sc, sr, ec, er } = rangeIndex(range_key);
        for (let i = sr; i <= er; i++) {
          for (let j = sc; j <= ec; j++) {
            ws.getCell(i, j).dataValidation = validation;
          }
        }
      });
    });
  }
};

module.exports = router;
