// import axios from "axios";
import { axiosClient } from "../http-setting";

export function getUsers(){
  return axiosClient.get('/api/v1/users');
}

export function getUsersWithPageAndLimit(page, limit){
  return axiosClient.get('/api/v1/users?pageNo='+page+'&limitNo='+limit);
}

export function getUsersBySearch(search){
  return axiosClient.get('/api/v1/users?search='+search);
}

export function getUsersByAccess(access){
  return axiosClient.get('/api/v1/users?access='+access);
}

export function getUser(id){
  return axiosClient.get("/api/v1/users/single?id="+id);
}
