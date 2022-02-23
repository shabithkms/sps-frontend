import axios from 'axios';
import toast from 'react-hot-toast';

const ADMIN_BASE_URL = `${process.env.REACT_APP_URL}/admin`;

// Admin login with credentials get from env
export const adminLogin = (data) => {
  try {
    return new Promise((resolve, reject) => {
      let ADMIN = process.env.REACT_APP_ADMIN;
      let PASSWORD = process.env.REACT_APP_PASSWORD;
      if (ADMIN === data.Email) {
        if (PASSWORD === data.Password) {
          let Admin = {
            ADMIN,
          };
          localStorage.setItem('admin', JSON.stringify(Admin));
          resolve('loggedin');
        } else {
          toast.error('Incorrect password');
        }
      } else {
        toast.error('Email doesnot exist');
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Add teacher with name and Email
export const addTeacher = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ADMIN_BASE_URL}/addTeacher`, formData)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Get all teachers
export const getAllTeachers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ADMIN_BASE_URL}/getTeacher`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Delete teacher with teacher id
export const deleteTeacherWithID = (teacherId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ADMIN_BASE_URL}/deleteTeacher/:${teacherId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// Admin batch management
// Add new Batch

export const addNewBatch = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ADMIN_BASE_URL}/addBatch`, formData)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
