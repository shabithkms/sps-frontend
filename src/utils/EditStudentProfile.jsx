import axios from 'axios';
import toast from 'react-hot-toast';

function EditStudentProfile(data, file, student) {
  const url = process.env.REACT_APP_URL;
  console.log(data);
  return new Promise((resolve, reject) => {
    data._id = student._id;
    let studentData = new FormData();
    console.log(data.Name);
    studentData.append('Name', data.Name);
    studentData.append('Domain', data.Domain);
    studentData.append('DOB', data.DOB);
    studentData.append('Age', data.Age);
    studentData.append('Gender', data.Gender);
    studentData.append('Email', student.Email);
    studentData.append('Mobile', data.Mobile);
    studentData.append('FatherName', data.FatherName);
    studentData.append('FatherNo', data.FatherNo);
    studentData.append('MotherName', data.MotherName);
    studentData.append('MotherNo', data.MotherNo);
    studentData.append('Guardian', data.Guardian);
    studentData.append('Relationship', data.Relationship);
    studentData.append('Address', data.Address);
    studentData.append('Village', data.Village);
    studentData.append('Taluk', data.Taluk);
    studentData.append('Qualification', data.Qualification);
    studentData.append('School', data.School);
    studentData.append('Experience', data.Experience);
    studentData.append('PaymentMethod', data.PaymentMethod);
    studentData.append('ID_Proof', file);
    console.log(file);
    try {
      axios
        .post(`${url}/editProfile`, studentData)
        .then((res) => {
          toast.success(res.data.message);
          localStorage.removeItem('student');
          localStorage.setItem('student', JSON.stringify(res.data.student));
          resolve(res.data);
        })
        .catch((err) => {
          toast.error(err.response.data.errors);
          reject(err);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export default EditStudentProfile;
