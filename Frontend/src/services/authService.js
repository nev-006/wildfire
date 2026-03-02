import api from './api';

const login = async (username, password) => {
    try {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await api.post('/authentication/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const register = async (userData) => {
    return api.post('/user/register', userData);
};

export default {
    login,
    logout,
    getCurrentUser,
    register
};
