import React from 'react'
import axios from 'axios'
const baseUrl = "http://localhost:3000/api/v1/notes/";
const token = localStorage.getItem('token');
const headers = { headers: { 'Authorization': 'bearer ' + token } };

export const getAll = async () => {
    try {
        const res = await axios.get(baseUrl, headers);
        console.log(res.data); 
        return res.data;  
    } catch (error) {
        console.error("Error fetching notes:", error);
        return []; 
    }
};


export const updateNoteColor = async (noteId, color) => {
    try {
        const response = await axios.patch(`${baseUrl}/colour/${noteId}`, { color });
        return response.data;
    } catch (error) {
        console.error("Failed to update note color:", error);
        throw error;
    }
};

export const createNote = async (data) => {
    console.log(data);
    try {
        const res = await axios.post(baseUrl, data, headers);
    }
    catch (error) {
        console.error("Error creating note:", error);
    }

}

export const toggleArchiveNote = async (id) => {
    try {
        const res = await axios.post(`${baseUrl}/is_arch_unarch/${id}`,id, headers);
        return res.data; 
    } catch (error) {
        console.error("Error toggling archive status:", error);
        return null; 
    }
};

export const toggleTrashNote = async (id) => {
    try {
        const res = await axios.post(`${baseUrl}/is_trash_untrash/${id}`,id, headers);
        return res.data; 
    } catch (error) {
        console.error("Error toggling archive status:", error);
        return null; 
    }
};

export const deleteForever = async(id)=>{
    const res = await axios.delete(`${baseUrl}/${id}`,headers);
    return res;
}