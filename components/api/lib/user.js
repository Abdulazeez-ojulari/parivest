// import axios from "axios";
import { axiosClient } from "../http-setting";

export function registerUser(user){
    return axiosClient.post('/users/register', user);
}

export function getUsers(){
  return axiosClient.get('/api/v1/users');
}

export function getUser(id){
  return axiosClient.get("/api/v1/users/single?id="+id);
}

export function addAddress(details){
  return axiosClient.post("/users/address", details);
}

export function editAddress(details){
  return axiosClient.put("/users/address", details);
}

export function deleteAddress(email, id){
  return axiosClient.delete("/users/address/" + email + "/" + id);
}