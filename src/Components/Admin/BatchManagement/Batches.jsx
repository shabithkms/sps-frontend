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
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { addNewBatch, deleteBatchWithID, getAllBatches } from '../../../api/adminApi';

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
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  alignItems: 'center',
};

function Batches() {
  const [batches, setBatches] = useState([]);
  const [open, setOpen] = useState(false);
  const [swalShow, setSwalShow] = useState(false);
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
  // Add new Batch
  const addBatch = (data) => {
    addNewBatch(data)
      .then((res) => {
        setOpen(false);
        toast.success(res.data.message);
        reset();
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        toast.error(err.response.data.errors);
      });
  };
  // Delete batch
  const deleteBatch = (BatchId) => {
    deleteBatchWithID(BatchId)
      .then((res) => {
        setSwalShow(false);
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
      });
  };
  // get all batches
  const getBatches = () => {
    getAllBatches()
      .then((res) => {
        setBatches(res.data.batches);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // alert for delete batch
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
                    <StyledTableCell align='center'>{obj.BatchName}</StyledTableCell>
                    <StyledTableCell align='center'>{obj.Place}</StyledTableCell>
                    <StyledTableCell align='center'>{obj.Count}</StyledTableCell>
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
            <Typography id='transition-modal-title' variant='h3' align='center' component='h1' fontWeight={'500'}>
              Add new Batch
            </Typography>
            <form onSubmit={handleSubmit(addBatch)}>
              <TextField
                margin='normal'
                fullWidth
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
              {errors.BatchName && <span className='error'>{errors.BatchName.message}</span>}
              <FormControl fullWidth className='mt-3'>
                <InputLabel id='demo-simple-select-label'>Select Place</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  {...register('Place', { required: true })}
                  label='select students'
                >
                  <MenuItem selected>Select place</MenuItem>
                  <MenuItem value={'Calicut'}>Calicut</MenuItem>
                  <MenuItem value={'Kochi'}>Kochi</MenuItem>
                </Select>
                {errors.Place && <span className='error'>This field is required</span>}
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
