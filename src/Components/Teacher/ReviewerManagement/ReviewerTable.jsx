import {
  Backdrop,
  Box,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
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
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Validation from '../../../Constants/Validation';

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
  height: 'fullWidth',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  alignItems: 'center',
};

function ReviewerTable() {
  let url = process.env.REACT_APP_URL;
  const [reviewer, setReviewer] = useState([]);
  const [domains, setDomains] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  //   Add  new Reviewer
  const addNewReviewer = (data) => {
    console.log(data);
    try {
      axios
        .post(`${url}/teacher/addNewReviewer`, data)
        .then((res) => {
          toast.success(res.data.message);
          setOpen(false);
          reset();
        })
        .catch((err) => {
          toast.error(err.response.data.errors);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //   Delete Reviewer
  const deleteReviewer = (id) => {
    console.log(id);
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
          axios.delete(`${url}/teacher/deleteReviewer/${id}`).then((res) => {
            console.log(res.data.message);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            setTimeout(() => {
              getAllReviewers();
            }, 500);
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const getAllReviewers = () => {
    try {
      axios
        .get(`${url}/teacher/getAllReviewer`)
        .then((res) => {
          setReviewer(res.data.reviewers);
        })
        .catch((err) => {});
    } catch (error) {
      console.log(error);
    }
  };
  const getAllDomain = () => {
    axios.get(`${url}/teacher/getAllDomains`).then((res) => {
      setDomains(res.data.domains);
    });
  };

  useEffect(() => {
    getAllReviewers();
    getAllDomain();
  }, [open]);
  return (
    <div>
      <h2 className='mb-4'>All Reviewers</h2>
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
              <StyledTableCell align='center'>Domain</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewer
              ? reviewer.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{obj.Name}</StyledTableCell>
                    <StyledTableCell align='center'>
                      {obj.DomainName}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          deleteReviewer(obj._id);
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
          <form onSubmit={handleSubmit(addNewReviewer)}>
            <Box sx={style} className='container '>
              <Typography
                id='transition-modal-title'
                variant='h3'
                align='center'
                component='h1'
                fontWeight={'500'}
              >
                Add new Reviewer
              </Typography>
              <TextField
                margin='normal'
                fullWidth
                {...register('Name', {
                  required: Validation.Errors.REQUIRED_ERROR,
                  minLength: {
                    value: 5,
                    message: Validation.MinLength(5),
                  },
                  maxLength: {
                    value: 20,
                    message: Validation.MaxLength(20),
                  },
                })}
                label='Name'
                type='Text'
              />
              {errors.Name && (
                <span className='error'>{errors.Name.message}</span>
              )}
              <TextField
                margin='normal'
                fullWidth
                {...register('Email', {
                  required: Validation.Errors.REQUIRED_ERROR,
                  pattern: {
                    value: Validation.Patterns.EMAIL_PATTERN,
                    message: Validation.Errors.INVALID_EMAIL,
                  },
                })}
                label='Email'
                type='Text'
              />
              {errors.Email && (
                <span className='error'>{errors.Email.message}</span>
              )}
              <FormControl fullWidth className='mt-3'>
                <InputLabel id='demo-simple-select-label'>
                  Select Domain
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  {...register('DomainName', {
                    required: Validation.Errors.REQUIRED_ERROR,
                  })}
                  label='select Batch'
                >
                  {domains ? (
                    domains.map((obj) => (
                      <MenuItem key={obj._id} value={obj.DomainName}>
                        {obj.DomainName}
                      </MenuItem>
                    ))
                  ) : (
                    <span>No batches</span>
                  )}
                </Select>
              </FormControl>
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

export default ReviewerTable;
