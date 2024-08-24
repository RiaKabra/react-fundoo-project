import React from 'react'
import axios from 'axios'
const baseUrl = "http://localhost:3000/api/v1/notes/";
export const getAll = async () => {

    const token = localStorage.getItem("token")
    const headers = { headers: { 'Authorization': 'bearer ' + token } }

    const res = axios.get(baseUrl, headers);
    console.log(res);
    return res;

}
// export const createNote = (value) => {
//     let res = axios.post(baseUrl+'',value);
//      return res;
  
//   }

//   export const toggleArchiveNote = (value) => {
//     let res = axios.post(baseUrl+'/is_arch_unarch/:_id',value);
//      return res;
  
//   }
//   export const retrieveNote = (value) => {
//     let res = axios.get(baseUrl+'/:_id',value);
//      return res;
  
//   }

//   export const updateNote = (value) => {
//     let res = axios.put(baseUrl+'/:_id',value);
//      return res;
  
//   }

//   export const deleteNote = (value) => {
//     let res = axios.delete(baseUrl+'/:_id',value);
//      return res;
  
//   }
//   export const colourUpdate = (value) => {
//     let res = axios.patch(baseUrl+'/colour/:_id',value);
//      return res;
  
//   }

//   export const toggleTrashNote = (value) => {
//     let res = axios.post(baseUrl+'/is_trash_untrash/:_id',value);
//      return res;
  
//   }

export const createNote = async (data) => {
    console.log(data);
    try {
        const token = localStorage.getItem("token");
        const header = { headers: { 'Authorization': 'bearer ' + token } }
        const res = await axios.post(baseUrl, data, header);
    }
    catch (error) {
        console.error("Error creating note:", error);
    }

}
