import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert/dist/components/SweetAlert";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
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
  width: 550,
  height: 460,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

function StudentTable() {
  let url = process.env.REACT_APP_URL;
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [domainId, setDomainId] = useState("");
  const [alert, setAlert] = useState("");
  const [open, setOpen] = useState(false);
  const [swalShow, setSwalShow] = useState(false);
  const [age, setAge] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {} });
  const addStudent = (data) => {
    try {
      axios
        .post(`${url}/teacher/addStudent`, data)
        .then((res) => {
          console.log(res.data.message);
          setOpen(false);
          toast.success(res.data.message);
          reset();
        })
        .catch((err) => {
          toast.error(err.response.data.errors);
          console.log(err.response.data.errors);
        });
    } catch (error) {
      toast.error(error.response.data.errors);
    }
  };
  const getAllStudents = () => {
    try {
      axios
        .get(`${url}/teacher/getAllStudents`)
        .then((res) => {
          console.log(res.data.students);
          setStudents(res.data.students);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getAllBatches = () => {
    axios.get(`${url}/teacher/getAllBatches`).then((res) => {
      console.log(res.data.batches);
      setBatches(res.data.batches);
    });
  };
  useEffect(() => {
    getAllBatches();
    getAllStudents();
  }, [open]);

  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            background: "black",
            color: "white",
          },
        }}
      />
      <div>
        <h2>All students</h2>
      </div>
      <div className="mb-3 mt-2 d-flex ">
        <div className="addStudent-btn">
          <button className="add-btn btn" onClick={handleOpen}>
            Add new
          </button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Batch</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              ? students.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{obj.Name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.Email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.Batch}
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
            <form onSubmit={handleSubmit(addStudent)}>
              <TextField
                margin="normal"
                fullWidth
                {...register("Name", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 characters required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters allowed",
                  },
                })}
                label="Name"
                type="Text"
                id="Name"
              />
              {errors.Name && (
                <span className="error">{errors.Name.message}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                {...register("Email", {
                  required: "This field is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address",
                  },
                })}
                label="Email"
                type="Text"
                id="Email"
              />
              {errors.Email && (
                <span className="error">{errors.Email.message}</span>
              )}
              <FormControl fullWidth className="mt-3">
                <InputLabel id="demo-simple-select-label">
                  Select Place
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register("Batch", { required: "This field is required" })}
                  label="select Batch"
                >
                  {batches ? (
                    batches.map((obj) => (
                      <MenuItem value={obj.BatchName} >{obj.BatchName}</MenuItem>
                    ))
                  ) : (
                    <span>No batches</span>
                  )}
                </Select>
                {errors.Batch && (
                  <span className="error">{errors.Batch.message}</span>
                )}
              </FormControl>
              <center>
                <button className="btn login-btn">Add</button>
              </center>
            </form>
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
