import api from './api';

const getUserProfile = async () => {
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

const updateUserProfile = async (profileData) => {
    try {
        const response = await api.put('/user/profile', profileData);
        // Refresh local user data if needed
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser) {
            // Keep token, just update fields
            const updatedUser = { ...currentUser, ...response.data.user };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};

const triggerBackgroundCheck = async () => {
    try {
        const response = await api.post('/user/test-alert');
        return response.data;
    } catch (error) {
        console.error("Error triggering background check:", error);
        throw error;
    }
};

export default {
    getUserProfile,
    updateUserProfile,
    triggerBackgroundCheck
};
