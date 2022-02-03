import React from "react";
import { useState, useEffect } from "react";
// import "./TeacherTable.css";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert/dist/components/SweetAlert";
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  TextField,
  Alert,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

function StudentTable() {
  let url = process.env.REACT_APP_URL;
  const [domains, setDomain] = useState([]);
  const [name, setName] = useState("");
  const [domainId, setDomainId] = useState("");
  const [alert, setAlert] = useState("");
  const [open, setOpen] = useState(false);
  const [swalShow, setSwalShow] = useState(false);
  const [age, setAge] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <div>
        <h2>All students</h2>
      </div>
      <div className="mb-3 mt-2 d-flex ">
        <div className="addStudent-btn">
          <button className="add-btn btn" onClick={handleOpen}>
            Add new
          </button>
        </div>
        {/* <Box sx={{ minWidth: 200, maxWidth: 220, marginLeft: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select students
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="select students"
          onChange={handleChange}
        >
          <MenuItem value={"Active"} selected>Active</MenuItem>
          <MenuItem value={"Placed"} >Placed</MenuItem>
          <MenuItem value={"Terminated"}>Terminated</MenuItem>
        </Select>
      </FormControl>
    </Box> */}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Batch</StyledTableCell>
              <StyledTableCell align="center">Domain</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {domains
              ? domains.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.DomainName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setSwalShow(true);
                          setDomainId(obj._id);
                        }}
                      >
                        Delete
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="container ">
            <Typography
              id="transition-modal-title"
              variant="h3"
              align="center"
              component="h1"
              fontWeight={"500"}
            >
              Add new Student
            </Typography>
            {alert ? (
              <Alert className="mb-3 mt-2" severity="error">
                {alert}
              </Alert>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="Name"
              label="Name"
              type="Text"
              onChange={(e) => {
                setName(e.target.value);
                setAlert("");
              }}
              value={name}
              id="Name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Name"
              label="Email"
              type="Text"
              onChange={(e) => {
                setName(e.target.value);
                setAlert("");
              }}
              value={name}
              id="Name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Name"
              label="Batch"
              type="Text"
              onChange={(e) => {
                setName(e.target.value);
                setAlert("");
              }}
              value={name}
              id="Name"
            />

            <center>
              <button
                className="btn login-btn"
                onClick={() => {
                  //   addNewDomain();
                }}
              >
                Add
              </button>
            </center>
          </Box>
        </Fade>
      </Modal>
      <SweetAlert
        warning
        show={swalShow}
        customButtons={
          <>
            <button
              className="btn btn-light m-3"
              onClick={() => {
                setSwalShow(false);
              }}
            >
              Cancel
            </button>
            <button
              autoFocus
              className="btn btn-danger m-3"
              onClick={() => {
                // deleteDomain(domainId);
              }}
            >
              Delete
            </button>
          </>
        }
      >
        Are you sure to delete Domain?
      </SweetAlert>
    </div>
  );
}

export default StudentTable;
