import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import WildfireBackground from '../components/WildfireBackground';

const Profile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        location: '',
        alerts_enabled: false
    });
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getUserProfile();
                setProfile({
                    username: data.username || '',
                    email: data.email || '',
                    location: data.location || '',
                    alerts_enabled: data.alerts_enabled || false
                });
            } catch (err) {
                console.error("Failed to load profile", err);
                setMessage({ text: 'Failed to load profile. Please log in again.', type: 'error' });
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setProfile({ ...profile, [e.target.name]: value });
        setMessage({ text: '', type: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await userService.updateUserProfile({
                location: profile.location,
                alerts_enabled: profile.alerts_enabled
            });
            setMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (err) {
            setMessage({ text: 'Failed to update profile.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && !profile.username) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">


            <div className="container mx-auto px-4 py-12 relative z-10 max-w-3xl">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                        <p className="text-orange-100 opacity-90 font-medium">Manage your location and wildfire alert preferences</p>
                    </div>

                    <div className="p-8 md:p-12">
                        {message.text && (
                            <div className={`p-4 mb-6 rounded-xl font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={profile.username}
                                        disabled
                                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        disabled
                                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <hr className="border-gray-100 my-8" />

                            <h3 className="text-xl font-bold text-gray-800 mb-4">Alert Preferences</h3>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Location / Region</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={profile.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Los Angeles, California or Yosemite Village"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                                />
                                <p className="text-sm text-gray-500 mt-2">We will automatically monitor wildfire risk in this area.</p>
                            </div>

                            <div className="flex items-center mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <label className="relative inline-flex items-center cursor-pointer mr-4">
                                    <input
                                        type="checkbox"
                                        name="alerts_enabled"
                                        checked={profile.alerts_enabled}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                </label>
                                <div>
                                    <span className="text-gray-800 font-semibold block">Enable Automated Email Alerts</span>
                                    <span className="text-sm text-gray-500">Receive an email immediately when high fire risk is predicted for your location.</span>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30 flex justify-center items-center gap-2"
                                >
                                    {isLoading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    ) : (
                                        <span>Save Preferences</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
