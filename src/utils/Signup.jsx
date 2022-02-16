import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Signup function for Teacher and Reviewer
function Signup(data, token, endPoint) {
  try {
    const decoded = jwtDecode(token);
    return new Promise((resolve, reject) => {
      console.log(data, token, endPoint);
      if (data.Password === data.Confirm_Password) {
        if (decoded.Email === data.Email) {
          axios
            .post(endPoint, data)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err.response.data);
            });
        } else {
          reject({ errors: 'Not a registered email' });
        }
      } else {
        reject({ errors: 'Passwords not same' });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// Function for student signup
function StudentSignup(data, endPoint) {
  return new Promise((resolve, reject) => {
    if (data.Password !== data.Confirm_Password) {
      reject({ errors: 'Passwords not same' });
    } else {
      axios
        .post(endPoint, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    }
  });
}
export { StudentSignup, Signup };
