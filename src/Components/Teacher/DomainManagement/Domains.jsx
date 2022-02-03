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
import { minWidth } from "@mui/system";

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
  height: 320,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

function Domains() {
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

  const addNewDomain = () => {
    try {
      if (!name === "") {
        axios
          .post(`${url}/teacher/addNewDomain`, { name })
          .then((res) => {
            console.log(res.data);
            setOpen(false);
            setName("");
          })
          .catch((err) => {
            setAlert(err.response.data.errors);
          });
      } else {
        setAlert("This field is required");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDomains = () => {
    try {
      axios
        .get(`${url}/teacher/getDomains`)
        .then((res) => {
          console.log(res.data.domains);
          setDomain(res.data.domains);
        })
        .catch((err) => {
          setAlert(err.response.data.errors);
        });
    } catch (error) {}
  };
  const deleteDomain = () => {
    try {
      axios
        .post(`${url}/teacher/deleteDomain`, { domainId })
        .then((res) => {
          console.log(res.data);
          setDomainId("");
          setSwalShow(false);
        })
        .catch((err) => {
          setDomainId("");
        });
    } catch (error) {}
  };
  useEffect(() => {
    getDomains();
  }, [open, swalShow]);
  return (
    <div>
      <div className="mb-3 mt-2 d-flex">
        <button className="add-btn btn" onClick={handleOpen}>
          Add new
        </button>
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
              <StyledTableCell align="center">No of students</StyledTableCell>
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
              Add new Domain
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

            <center>
              <button
                className="btn login-btn"
                onClick={() => {
                  addNewDomain();
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
                deleteDomain(domainId);
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

export default Domains;
