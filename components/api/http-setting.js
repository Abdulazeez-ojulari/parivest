import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `https://parivest-mock-api.herokuapp.com`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'
  }
});
// export default axiosClientt;
