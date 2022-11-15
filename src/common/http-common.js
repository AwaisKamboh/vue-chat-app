import axios from 'axios';

 const HTTP = axios.create({
  baseURL: `http://127.0.0.1:8000/api/`,
  
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default HTTP