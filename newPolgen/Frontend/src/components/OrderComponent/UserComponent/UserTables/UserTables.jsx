import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getProducts } from "../../../../api/product"; // Import the API function

const UserTables = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openRows, setOpenRows] = useState({});

  const toggleRow = (rowId) => {
    setOpenRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts(); // Fetch product data from the backend
        setRows(data); // Set the fetched data to rows
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          Loading products...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "var(--primary-bg-color)",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        padding: "20px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "var(--primary-text-color)",
          marginBottom: "15px",
        }}
      >
        Product List
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "var(--secondary-bg-color)" }}>
            <TableCell />
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "var(--secondary-text-color)",
              }}
            >
              Product
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: "bold",
                color: "var(--secondary-text-color)",
              }}
            >
              Quantity
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: "bold",
                color: "var(--secondary-text-color)",
              }}
            >
              Price
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: "bold",
                color: "var(--secondary-text-color)",
              }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <React.Fragment key={row.id}>
              <TableRow>
                <TableCell>
                  <IconButton
                    onClick={() => toggleRow(row.id)}
                    sx={{
                      color: "var(--primary-text-color)",
                      "&:hover": { color: "var(--accent-color)" },
                    }}
                  >
                    {openRows[row.id] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell sx={{ color: "var(--primary-text-color)" }}>
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "var(--primary-text-color)" }}
                >
                  {row.stock}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "var(--primary-text-color)" }}
                >
                  ${row.price.toFixed(2)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "var(--primary-text-color)" }}
                >
                  {row.status || "N/A"}
                </TableCell>
              </TableRow>
              {openRows[row.id] && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box
                      sx={{
                        backgroundColor: "var(--secondary-bg-color)",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "10px 0",
                        color: "var(--secondary-text-color)",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        Product Details
                      </Typography>
                      <Typography variant="body2">{row.description}</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTables;

