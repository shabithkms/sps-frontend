import React from "react";
import { useState, useEffect } from "react";
import "./TeacherTable.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 350,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

export default function TeacherTable() {
  let url = process.env.REACT_APP_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let teacherData = {
    name,
    email,
  };
  const addTeacher = () => {
    try {
      axios.post(`${url}/admin/addTeacher`, teacherData).then((response) => {
        handleClose();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getTeachers = () => {
    try {
      axios.get(`${url}/admin/getTeacher`).then((response) => {
        console.log(response.data[0]);
        setTeachers(response.data);
        console.log(teachers);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTeacher=(teacherId)=>{
    try {
        axios.post(`${url}/admin/deleteTeacher/:${teacherId}`).then((response)=>{
            console.log(response.data);
        })
    } catch (error) {
        
    }
  }

  useEffect(() => {
    getTeachers();
  }, [open]);

  return (
    <div>
      <div className="mb-3 mt-2 ml-auto">
        <button className="add-btn btn " onClick={handleOpen}>
          Add new
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers
              ? teachers.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{obj.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {obj.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <button className="btn btn-danger" onClick={()=>{
                          deleteTeacher(obj._id)
                      }}>Delete</button>
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
              Add new Teacher
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="Name"
              label="Name"
              type="Text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="Name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Email"
              label="Email"
              type="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="Email"
            />
            <center>
              <button
                className="btn login-btn"
                onClick={() => {
                  addTeacher();
                }}
              >
                Add
              </button>
            </center>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
