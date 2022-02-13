import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
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
} from '@mui/material';

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
  height: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  alignItems: 'center',
};

function Batches() {
  let url = process.env.REACT_APP_URL;
  const [batches, setBatches] = useState([]);
  const [alert, setAlert] = useState('');
  const [open, setOpen] = useState(false);
  const [swalShow, setSwalShow] = useState(false);
  const [age, setAge] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const addBatch = (data) => {
    console.log(data);
    try {
      axios
        .post(`${url}/admin/addBatch`, data)
        .then((res) => {
          console.log(res.data.message);
          setOpen(false);
          toast.success(res.data.message);
          reset();
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          setAlert(err.response.data.errors);
          setTimeout(() => {
            setAlert('');
          }, 3000);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBatch = (BatchId) => {
    try {
      axios
        .delete(`${url}/admin/deleteBatch/${BatchId}`)
        .then((res) => {
          console.log(res.data.message);
          setSwalShow(false);
        })
        .catch((err) => {
          toast.error(err.response.data.errors);
        });
    } catch (error) {
      toast('Something error');
    }
  };

  const getBatches = () => {
    try {
      axios
        .get(`${url}/admin/getAllBatches`)
        .then((res) => {
          setBatches(res.data.batches);
        })
        .catch((err) => {
          console.log(err.response.data.errors);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const setSwal = (id) => {
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
        deleteBatch(id);
        setSwalShow(false);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  useEffect(() => {
    getBatches();
  }, [open, swalShow]);

  return (
    <div>
      <div className='pt-2 pb-2'>
        <h2>All Batches</h2>
      </div>
      <div className='mb-3 mt-2 d-flex '>
        <div className='addStudent-btn'>
          <button className='add-btn btn' onClick={handleOpen}>
            Add new
          </button>
        </div>
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: 'black',
            color: 'white',
          },
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align='center'>Batch</StyledTableCell>
              <StyledTableCell align='center'>No of students</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {batches
              ? batches.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {obj.BatchName}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {obj.Place}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {obj.Count}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          setSwalShow(true);
                          setSwal(obj._id);
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
          <Box sx={style} className='container '>
            <Typography
              id='transition-modal-title'
              variant='h3'
              align='center'
              component='h1'
              fontWeight={'500'}
            >
              Add new Batch
            </Typography>
            {alert ? (
              <Alert className='mb-3 mt-2' severity='error'>
                {alert}
              </Alert>
            ) : (
              ''
            )}
            <form onSubmit={handleSubmit(addBatch)}>
              <TextField
                margin='normal'
                fullWidth
                autoCapitalize='on'
                {...register('BatchName', {
                  required: 'This field is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum 4 characters required',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Maximum 10 characters allowed',
                  },
                })}
                label='Name'
                type='Text'
                id='Name'
              />
              {errors.BatchName && (
                <span className='error'>{errors.BatchName.message}</span>
              )}
              <FormControl fullWidth className='mt-3'>
                <InputLabel id='demo-simple-select-label'>
                  Select Place
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={age}
                  {...register('Place', { required: true })}
                  label='select students'
                  onChange={handleChange}
                >
                  <MenuItem selected>Select place</MenuItem>
                  <MenuItem value={'Calicut'}>Calicut</MenuItem>
                  <MenuItem value={'Kochi'}>Kochi</MenuItem>
                </Select>
                {errors.Place && (
                  <span className='error'>This field is required</span>
                )}
              </FormControl>

              <center>
                <button className='btn login-btn'>Add</button>
              </center>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Batches;
