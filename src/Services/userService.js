import React from 'react'
import axios from 'axios'
const baseUrl = "http://localhost:3000/api/v1/users/";
export const login = (value) => {
  let res = axios.post(baseUrl+'login',value);
   return res;

}

export const sign = (value) => {
    let res = axios.post(baseUrl + 'signup',value);
    return res;
}
