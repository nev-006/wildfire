import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 backdrop-blur-3xl"></div>
                <div className="relative max-w-6xl mx-auto text-center space-y-8">
                    <div className="space-y-6">
                        <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-700 font-medium text-sm mb-4">
                            <span className="animate-pulse mr-2">🔥</span>
                            AI-Powered Wildfire Detection
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
                            Advanced <br />Wildfire Prediction
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Leveraging cutting-edge AI and satellite data to predict and monitor forest fire risks in real-time.
                            Protect our forests with data-driven insights and early warning systems.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link 
                            to="/predict" 
                            className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Prediction
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </Link>
                        <Link 
                            to="/about" 
                            className="px-8 py-4 bg-white/80 backdrop-blur text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white hover:-translate-y-1"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our System</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Advanced technology meets environmental protection
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">Real-time Data</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Integrates with satellite feeds and weather stations to provide up-to-date environmental metrics and fire risk assessments.
                                </p>
                            </div>
                        </div>
                        <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Powered</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Uses advanced Gradient Boosting Regressor models and machine learning algorithms for high-accuracy fire intensity prediction.
                                </p>
                            </div>
                        </div>
                        <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">Instant Alerts</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Get immediate risk assessments and notifications to enable rapid response and mitigation strategies for emergency services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-orange-400">99.2%</div>
                            <div className="text-gray-300">Accuracy Rate</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-orange-400">24/7</div>
                            <div className="text-gray-300">Monitoring</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-orange-400">&lt;5min</div>
                            <div className="text-gray-300">Alert Time</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-orange-400">1M+</div>
                            <div className="text-gray-300">Acres Protected</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
