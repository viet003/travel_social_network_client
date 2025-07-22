import axiosConfig from "../config/axiosConfig";

export const apiGetAllCommentsByPost = async (postId, page) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `comment/${postId}?page=${page}`,
        });
        return response?.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// export const apiGetAllPostByStatus = async (page) => {
//     try {
//         const response = await axiosConfig({
//             method: 'GET',
//             url: `post?page=${page}`,
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error;
//     }
// };

export const apiCreateCommentService = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            data: payload,
            url: "comment",
        });
        return response?.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
