import React from 'react';

const PredictionForm = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Fire Risk Prediction</h2>
            <p className="text-center text-gray-600">Simple test form - this should be visible</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input type="number" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g. 20.5" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input type="number" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g. 78.9" />
                </div>
            </div>
        </div>
    );
};

export default PredictionForm;
