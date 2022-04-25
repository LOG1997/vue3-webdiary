import axios from "./axios";
let {get,post}=axios;
// 获取所有文章
export const getAll=(data:object)=>get(`/getArticalList`,data);
// 获取单篇文章指定id
export const getArtical=(data:object)=>get('/getArtical',data)

export const submitArtical=(data:object)=>post(`/submitArtical`,data);