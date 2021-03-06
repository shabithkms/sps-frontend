import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 320,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  alignItems: 'center',
};

function Domains() {
  let url = process.env.REACT_APP_URL;
  const [domains, setDomain] = useState([]);
  const [open, setOpen] = useState(false);
  const [swalShow, setSwalShow] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const addNewDomain = (data) => {
    try {
      axios
        .post(`${url}/teacher/addNewDomain`, data)
        .then((res) => {
          toast.success(res.data.message);
          setOpen(false);
        })
        .catch((err) => {
          toast.error(err.response.data.errors);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getDomains = () => {
    try {
      axios
        .get(`${url}/teacher/getAllDomains`)
        .then((res) => {
          setDomain(res.data.domains);
        })
        .catch((err) => {
          console.log(err.response.data.errors);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDomain = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .post(`${url}/teacher/deleteDomain`, { id })
            .then((res) => {
              console.log(res.data);
              setSwalShow(false);
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            })
            .catch((err) => {
              console.log(err.response.data.errors);
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  useEffect(() => {
    reset();
    getDomains();
  }, [open, swalShow]);
  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            background: 'black',
            color: 'white',
          },
        }}
      />
      <div className='mb-3 mt-2 d-flex'>
        <button className='add-btn btn' onClick={handleOpen}>
          Add new
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align='center'>No of students</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {domains
              ? domains.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {obj.DomainName}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {obj.email}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          setSwalShow(true);
                          deleteDomain(obj._id);
                        }}
                      >
                        Delete
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form onSubmit={handleSubmit(addNewDomain)}>
            <Box sx={style} className='container '>
              <Typography
                id='transition-modal-title'
                variant='h3'
                align='center'
                component='h1'
                fontWeight={'500'}
              >
                Add new Domain
              </Typography>
              <TextField
                margin='normal'
                fullWidth
                {...register('DomainName', {
                  required: 'This field is required',
                  minLength: {
                    value: 5,
                    message: 'Minimum 5 characters required',
                  },
                })}
                label='Name'
                type='Text'
                id='Name'
              />
              {errors.DomainName && (
                <span className='error'>{errors.DomainName.message}</span>
              )}

              <center>
                <button className='btn login-btn'>Add</button>
              </center>
            </Box>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

export default Domains;
