import React, { useState, useEffect, useMemo } from "react";
import Stack from "@mui/material/Stack";
import MailIcon from "@mui/icons-material/Mail";
import styles from "./AdminTables.module.css"; // Import the CSS module

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TablePagination,
  Box,
  LinearProgress,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Checkbox,
  TextField,
} from "@mui/material";
import EditInfo from "../EditInfo/EditInfo";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../../../api/product";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ShowUserInfo from "../ShowUserInfo/ShowUserInfo";
import AreYouSureMsg from "../../AreYouSureMessg/AreYouSureMessg";
import AdminSynthisGroup from "../AdminSynthisGroup/AdminSynthisGroup";

// const nosearch = false;
const AdminTables = ({ filterCondition, AdminPageName, nosearch }) => {
  const [rows, setRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  // const [filteredRows, setFilteredRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Renamed from filteredRows
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  // هنا هغير الشو سينتس
  const [showSynthisGroup, setshowSynthisGroup] = useState(false);

  const [productToEdit, setProductToEdit] = useState(null);
  const noSearch = false;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        const normalizedData = data.map((row) => ({
          id: row.id || "N/A", // Product ID
          category: row.category || "N/A",
          oligoAdi: row.oligoAdi || "Unknown",
          sekans: row.sekans || "",
          uzunluk: row.uzunluk,
          saflaştırma: row.saflaştırma || "Unknown",
          scale: row.scale || "Unknown",
          modifications: {
            fivePrime: row.modifications?.fivePrime || "None",
            threePrime: row.modifications?.threePrime || "None",
          },
          quantity: row.quantity || 0,
          totalPrice: row.totalPrice || 0,
          userId: row.userId || "Unknown", // Default userId to avoid issues
          isOrder: row.isOrder || true,
          isApproved: row.isApproved || false,
          isWorkingOn: row.isWorkingOn || false,
          isFinished: row.isFinished || false,
        }));
        setRows(normalizedData);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredRows = useMemo(() => {
    const query = searchQuery.toLowerCase();

    // Apply search filtering
    let result = rows.filter((row) => {
      const status = row.isFinished
        ? "Finished"
        : row.isWorkingOn
        ? "In Progress"
        : row.isApproved
        ? "Approved"
        : "Ordered";

      return (
        row.category?.toLowerCase().includes(query) ||
        row.oligoAdi?.toLowerCase().includes(query) ||
        row.scale?.toLowerCase().includes(query) ||
        row.modifications?.fivePrime?.toLowerCase().includes(query) ||
        row.modifications?.threePrime?.toLowerCase().includes(query) ||
        row.userId?.toLowerCase().includes(query) ||
        (row.totalPrice && row.totalPrice.toString().includes(query)) ||
        status.toLowerCase().includes(query)
      );
    });

    // Apply additional filtering from the `filterCondition` prop if provided
    if (filterCondition) {
      result = result.filter(filterCondition);
    }

    return result;
  }, [rows, searchQuery, filterCondition]);

  const getProgress = (row) => {
    if (row.isFinished) return 100;
    if (row.isWorkingOn) return 80;
    if (row.isApproved) return 50;
    if (row.isOrder) return 25;
    return 0;
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleAdminSynthisGroup = () => {
    setshowSynthisGroup(true);
  };
  const handleEditProduct = (product) => {
    if (!product.id) {
      console.error("Product ID is missing:", product);
      return;
    }
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      await deleteProduct(productToDelete);
      setRows(rows.filter((row) => row.id !== productToDelete));
      setFilteredData(filteredRows.filter((row) => row.id !== productToDelete));
      setShowDeleteModal(false); // Close the modal after deletion
      setProductToDelete(null); // Clear the selected product
    } catch (error) {
      setError("Failed to delete the product. Please try again.");
    }
  };

  const handleApproveProduct = async (id) => {
    setProcessing((prev) => [...prev, id]); // Set the product as "processing"
    try {
      await updateProduct(id, { isApproved: true }); // Update the product's isApproved field
      const updatedRows = rows.map((row) =>
        row.id === id ? { ...row, isApproved: true } : row
      );
      setRows(updatedRows);
      setFilteredData(updatedRows);
    } catch (error) {
      setError("Failed to approve the product. Please try again.");
    } finally {
      setProcessing((prev) => prev.filter((pid) => pid !== id)); // Remove from "processing"
    }
  };

  // -----------------------------

  const handleBulkIsWorkingOn = async () => {
    const bulkWorkingOnIds = selectedProducts.filter(
      (id) => !rows.find((row) => row.id === id)?.isWorkingOn
    );

    if (bulkWorkingOnIds.length === 0) {
      return;
    }

    setProcessing((prev) => [...prev, ...bulkWorkingOnIds]);

    try {
      // Send bulk approval request to the backend
      const response = await updateProduct("all", {
        productIds: bulkWorkingOnIds,
        isWorkingOn: true, // This is the status being updated
      });

      // Update the UI with the backend response
      const updatedRows = rows.map((row) =>
        bulkWorkingOnIds.includes(row.id) ? { ...row, isWorkingOn: true } : row
      );
      setRows(updatedRows);
      setFilteredData(updatedRows);

      setSelectedProducts([]); // Clear selected products
    } catch (error) {
      setError("Failed to approve selected products. Please try again.");
    } finally {
      setProcessing((prev) =>
        prev.filter((id) => !bulkWorkingOnIds.includes(id))
      );
    }
  };
  //----------------------
  const handleBulkApprove = async () => {
    const bulkApproveIds = selectedProducts.filter(
      (id) => !rows.find((row) => row.id === id)?.isApproved
    );

    if (bulkApproveIds.length === 0) {
      return;
    }

    setProcessing((prev) => [...prev, ...bulkApproveIds]);

    try {
      // Send bulk approval request to the backend
      const response = await updateProduct("all", {
        productIds: bulkApproveIds,
        isApproved: true, // This is the status being updated
      });

      // Update the UI with the backend response
      const updatedRows = rows.map((row) =>
        bulkApproveIds.includes(row.id) ? { ...row, isApproved: true } : row
      );
      setRows(updatedRows);
      setFilteredData(updatedRows);

      setSelectedProducts([]); // Clear selected products
    } catch (error) {
      setError("Failed to approve selected products. Please try again.");
    } finally {
      setProcessing((prev) =>
        prev.filter((id) => !bulkApproveIds.includes(id))
      );
    }
  };

  const confirmBulkDelete = async () => {
    try {
      await Promise.all(selectedProducts.map((id) => deleteProduct(id)));
      const updatedRows = rows.filter(
        (row) => !selectedProducts.includes(row.id)
      );
      setRows(updatedRows);
      setFilteredData(updatedRows);
    } catch (error) {
      setError("Failed to delete selected products. Please try again.");
    } finally {
      setSelectedProducts([]); // Clear selections after action
      setShowBulkDeleteModal(false); // Close the confirmation modal
    }
  };

  const handleNextStatus = async (id, currentStatus) => {
    setProcessing((prev) => [...prev, id]); // Mark as processing

    let updatedFields = {};

    // Determine the next state based on currentStatus
    if (!currentStatus.isApproved) {
      updatedFields = {
        isApproved: true,
        isWorkingOn: false,
        isFinished: false,
      };
    } else if (!currentStatus.isWorkingOn) {
      updatedFields = { isWorkingOn: true, isFinished: false };
    } else if (!currentStatus.isFinished) {
      updatedFields = { isFinished: true };
    } else {
      // If already finished, stop further transitions
      setProcessing((prev) => prev.filter((pid) => pid !== id));
      return;
    }

    try {
      // Update product status in the backend
      await updateProduct(id, updatedFields);

      // Reflect changes in UI
      const updatedRows = rows.map((row) =>
        row.id === id ? { ...row, ...updatedFields } : row
      );
      setRows(updatedRows);
      setFilteredData(updatedRows);
    } catch (error) {
      setError("Failed to update product status. Please try again.");
    } finally {
      // Mark processing complete
      setProcessing((prev) => prev.filter((pid) => pid !== id));
    }
  };

  {
    /*
 -----------------------------------
  */
  }

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const visibleRows = useMemo(() => {
    return filteredRows
      .sort((a, b) =>
        order === "desc" ? b[orderBy] - a[orderBy] : a[orderBy] - b[orderBy]
      )
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredRows, order, orderBy, page, rowsPerPage]);

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
    <TableContainer component={Paper} sx={{ padding: "20px" }}>
      {/* from  here copilat */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          alignItems: "center",
          gap: 2,
        }}
      >
        <div>
          {/* Conditionally render the title based on AdminPageName */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {AdminPageName || "Admin Products"}
          </Typography>
        </div>
        {/* ------------------- */}
        {AdminPageName === "AdminApprovedOrders" ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",

              alignItems: "center",
              gap: 2,
            }}
          >
            <div>
              <Button
                variant="contained"
                onClick={handleBulkIsWorkingOn}
                className={styles["table-bulk-approve"]} // Apply the CSS class
                disabled={selectedProducts.length === 0}
              >
                Synthing All
              </Button>
            </div>

            <div>
              <Button
                variant="contained"
                onClick={handleAdminSynthisGroup}
                className={styles["table-bulk-SynthisGroup"]} // Apply the CSS class

                //---Aliyev bu  asagaidaki kismi uncomment edersen (ANCA BIR YA DA COK  URURU SECTIGINDE DUGUME CALISACAGK ACILACAK)

                // disabled={selectedProducts.length === 0}
              >
                Synthing Group
              </Button>
            </div>
          </Box>
        ) : (
          " "
        )}
        {AdminPageName === "Orders" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearch}
                sx={{ marginRight: 2 }}
              />
            </Box>

            <div>
              <Button
                variant="contained"
                onClick={handleBulkApprove}
                className={styles["table-bulk-approve"]} // Apply the CSS class
                disabled={selectedProducts.length === 0}
              >
                Approve All
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                className={styles["table-bulk-delete"]} // Apply the CSS class
                onClick={() => setShowBulkDeleteModal(true)} // Open confirmation modal
                disabled={selectedProducts.length === 0}
              >
                Delete All
              </Button>
            </div>
          </Box>
        ) : (
          ""
        )}

        {/* ------------------- */}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectedProducts.length === rows.length}
                onChange={(e) =>
                  setSelectedProducts(
                    e.target.checked ? rows.map((row) => row.id) : []
                  )
                }
              />
            </TableCell>
            <TableCell>Category</TableCell>
            <TableCell>UserId</TableCell>
            <TableCell>Oligo Name</TableCell>
            <TableCell>sekans</TableCell>
            <TableCell> uzunluk</TableCell>
            <TableCell>saflaştırma</TableCell>
            <TableCell>Scale</TableCell>
            <TableCell>5' Modification</TableCell>
            <TableCell>3' Modification</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Price</TableCell> {/* Add this */}
            <TableCell>Progress</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedUser(row.userId)}>
                  {row.userId ? row.userId.split("-")[0] : "Unknown"}
                </Button>
              </TableCell>
              <TableCell>{row.oligoAdi}</TableCell>
              <TableCell>{row.sekans}</TableCell>
              <TableCell>{row.uzunluk}</TableCell>
              <TableCell>{row.saflaştırma}</TableCell>
              <TableCell>{row.scale}</TableCell>
              <TableCell>{row.modifications?.fivePrime || "N/A"}</TableCell>
              <TableCell>{row.modifications?.threePrime || "N/A"}</TableCell>
              <TableCell>
                {row.isFinished
                  ? "Finished"
                  : row.isWorkingOn
                  ? "In Progress"
                  : row.isApproved
                  ? "Approved"
                  : "Ordered"}
              </TableCell>
              <TableCell>{row.totalPrice || "N/A"}</TableCell>
              <TableCell>
                <LinearProgress
                  variant="determinate"
                  value={getProgress(row)}
                />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() =>
                    handleNextStatus(row.id, {
                      isApproved: row.isApproved,
                      isWorkingOn: row.isWorkingOn,
                      isFinished: row.isFinished,
                    })
                  }
                  disabled={processing.includes(row.id)}
                >
                  {processing.includes(row.id) ? (
                    <HourglassBottomIcon />
                  ) : row.isFinished ? (
                    <CheckCircleIcon color="success" />
                  ) : row.isWorkingOn ? (
                    <CheckCircleIcon color="warning" />
                  ) : row.isApproved ? (
                    <CheckCircleIcon color="primary" />
                  ) : (
                    <CheckCircleIcon color="disabled" />
                  )}
                </IconButton>
                <IconButton onClick={() => handleEditProduct(row)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() => {
                    setProductToDelete(row.id); // Set the selected product
                    setShowDeleteModal(true); // Show the confirmation modal
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
                {/* the mail part */}
                {/* </IconButton>
                <IconButton onClick={() => handleEmail(ro)}>
                  <MailIcon />
                </IconButton> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedUser && (
        <ShowUserInfo
          userId={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {showDeleteModal && (
        <AreYouSureMsg
          onConfirm={confirmDeleteProduct} // Call the delete function on confirmation
          onCancel={() => {
            setShowDeleteModal(false); // Close the modal on cancel
            setProductToDelete(null); // Clear the selected product
          }}
          message="are you sure u want to  delete this selected one?"
        />
      )}
      {showBulkDeleteModal && (
        <AreYouSureMsg
          onConfirm={confirmBulkDelete}
          onCancel={() => setShowBulkDeleteModal(false)}
          message="are you sure u want to  delete all?"
        />
      )}
      {showSynthisGroup && (
        <AdminSynthisGroup
          onClose={() => setshowSynthisGroup(false)} // Close the modal
        />
      )}
      {showEditModal && (
        <EditInfo
          product={productToEdit} // Pass the selected product
          onClose={() => setShowEditModal(false)} // Close the modal
          onSave={(updatedProduct) => {
            // Update the product in the table after saving
            const updatedRows = rows.map((row) =>
              row.id === updatedProduct.id ? updatedProduct : row
            );
            setRows(updatedRows);
            setFilteredData(updatedRows);
            setShowEditModal(false); // Close the modal
          }}
        />
      )}
    </TableContainer>
  );
};

export default AdminTables;
