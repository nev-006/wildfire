import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
