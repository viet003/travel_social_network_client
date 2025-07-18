import axiosConfig from "../config/axiosConfig";

export const apiGetUserProfile = async (userId) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `user/${userId}`,
        });
        return response.data;
    } catch (error) {
        // Có thể trả về error.response.data hoặc throw error tuỳ ý
        throw error.response ? error.response.data : error;
    }
};

export const apiUpdateUserImgService = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/user/img',
            data: payload,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const apiUpdateUserService = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: '/user/edit-profile',
            data: payload,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};