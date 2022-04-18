import axios from "./axios";
let {get,post}=axios;
export const getAll=(data:object)=>get(`/getArticalList`,data);
export const upartical=(data:any)=>post(`/upartical`,data);