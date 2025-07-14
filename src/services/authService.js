import axiosConfig from "../config/axiosConfig";

export const apiLoginService = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/auth/login',
            data: payload
        });
        return response.data;
    } catch (error) {
        // Có thể trả về error.response.data hoặc throw error tuỳ ý
        throw error.response ? error.response.data : error;
    }
};

export const apiSignupService = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/auth/register',
            data: payload
        });
        return response.data;
    } catch (error) {
        // Có thể trả về error.response.data hoặc throw error tuỳ ý
        throw error.response ? error.response.data : error;
    }
};