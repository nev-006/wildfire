import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Header = () => {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-white text-xl">🔥</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            WildFire Predictor
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
                        >
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-200"></span>
                        </Link>
                        <Link 
                            to="/predict" 
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
                        >
                            Predict
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-200"></span>
                        </Link>
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg">
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">
                                            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                    <span className="text-gray-700 font-medium">
                                        Hello, {user.username || 'User'}
                                    </span>
                                </div>
                                <button 
                                    onClick={handleLogout} 
                                    className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 border border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/login" 
                                className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Login
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <nav className="flex flex-col space-y-4">
                            <Link 
                                to="/" 
                                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/predict" 
                                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Predict
                            </Link>
                            {user ? (
                                <>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg">
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">
                                                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                            </span>
                                        </div>
                                        <span className="text-gray-700 font-medium">
                                            Hello, {user.username || 'User'}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }} 
                                        className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 border border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50 text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
