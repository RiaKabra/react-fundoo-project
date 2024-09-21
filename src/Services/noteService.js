import axios from 'axios';
const baseUrl = "http://localhost:3000/api/v1/notes";
const token = localStorage.getItem('token');
const headers = { 'Authorization': 'bearer ' + token };

export const getAll = async () => {
    try {
        const res = await axios.get(baseUrl, { headers });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching notes:", error);
        return [];
    }
};

// export const updateNoteColor = async (noteId, color) => {
//     try {
//         const response = await axios.patch(`${baseUrl}/colour/${noteId}`, { colour:color }, { headers });
//         return response.data;
//     } catch (error) {
//         console.error("Failed to update note color:", error);
//         throw error;
//     }
// };
export const updateNoteColor = async (noteId, color) => {
    try {
        const response = await axios.patch(`${baseUrl}/colour/${noteId}`, { colour: color }, { headers });
        return response.data;
    } catch (error) {
        console.error("Failed to update note color:", error);
        throw error;
    }
};


export const createNote = async (data) => {
    console.log(data);
    try {
        const res = await axios.post(baseUrl, data, { headers });
    } catch (error) {
        console.error("Error creating note:", error);
    }
};

export const toggleArchiveNote = async (id) => {
    try {
        const res = await axios.post(`${baseUrl}/is_arch_unarch/${id}`, {}, { headers });
        return res.data;
    } catch (error) {
        console.error("Error toggling archive status:", error);
        return null;
    }
};

export const toggleTrashNote = async (id) => {
    try {
        const res = await axios.post(`${baseUrl}/is_trash_untrash/${id}`, {}, { headers });
        return res.data;
    } catch (error) {
        console.error("Error toggling trash status:", error);
        return null;
    }
};

// export const deleteForever = async (id) => {
//     try {
//         const res = await axios.delete(`${baseUrl}/${id}`, { headers });
//         return res;
//     } catch (error) {
//         console.error("Error deleting note:", error);
//         return null;
//     }
// };
export const deleteForever = async (id, created) => {
    try {
        const url = `${baseUrl}/${id}?created=${encodeURIComponent(created)}`;
        const res = await axios.delete(url, { headers });
        return res;
    } catch (error) {
        console.error("Error deleting note:", error);
        return null;
    }
};

export const updateNote = async(id,data)=>{
    if (!id) {
        console.log("id not found=====>");
        return null;
    }

    if (!data) {
        console.log("No data provided to edit the note=====>");
        return null;
    }

    if (id && data) {


        const url = `${baseUrl}/${id}`;
        const res = await axios.put(url,{ data}, {headers});
        return res;

    } else {
        console.log("id not found=====>")
    }
}

export const retrieveNote = async(id)=>{
    const url = `${baseUrl}/${id}`;
    const res = await axios.get(url, {headers});
    return res;
}