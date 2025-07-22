import axiosConfig from "../config/axiosConfig";

export const apiUpdateLikeOnPostService = async (postId) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: `like/${postId}`,
        });
        return response?.data;
    } catch (error) {
        throw error.response ? error.response?.data : error;
    }
};


