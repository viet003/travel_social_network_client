import axiosConfig from "../config/axiosConfig";

export const apiGeAllPostByGroup = async (groupId, page) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `post/group/${groupId}?page=${page}`,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


export const apiGeAllPostByUser = async (userId, page) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `post/${userId}?page=${page}`,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const apiGetAllPostByStatus = async (page) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `post?page=${page}`,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const apiCreatePostByUserService = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            data: payload,
            url: "post",
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const apiCreatePostByUserOnGroupService = async (payload, postId) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            data: payload,
            url: `post/group/${postId}`,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


// export const apiUpdatePostService = async (payload) => {
//     try {
//         const response = await axiosConfig({
//             method: 'PUT',
//             url: '/user/edit-profile',
//             data: payload,
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error;
//     }
// };