import React, { useState } from 'react';
import wildfireService from '../services/wildfireService';

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        location_name: '',
        latitude: '',
        longitude: '',
        brightness: '',
        scan: '',
        acq_date: '',
        acq_time: '',
        bright_t31: '',
        daynight: 'D'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = {
                ...formData,
                acq_time: formData.acq_time.replace(':', ''), // Ensure format like "1030"
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
                brightness: parseFloat(formData.brightness),
                scan: parseFloat(formData.scan),
                bright_t31: parseFloat(formData.bright_t31)
            };
            const response = await wildfireService.predictFire(data);
            setResult(response.predicted_frp);
        } catch (err) {
            setError("Failed to get prediction. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    const handleAutofill = async () => {
        if (!formData.location_name && (!formData.latitude || !formData.longitude)) {
            setError("Please enter a Location Name OR Coordinates first.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            let payload = {};
            if (formData.location_name) {
                payload = { location_name: formData.location_name };
            } else {
                payload = { latitude: parseFloat(formData.latitude), longitude: parseFloat(formData.longitude) };
            }

            const data = await wildfireService.getAutofillData(payload);
            setFormData({
                ...formData,
                latitude: data.latitude,
                longitude: data.longitude,
                brightness: data.brightness,
                scan: data.scan,
                acq_date: data.acq_date,
                acq_time: data.acq_time,
                bright_t31: data.bright_t31,
                daynight: data.daynight,
                location_name: formData.location_name // Keep the name if entered
            });
            setError(null);
        } catch (err) {
            setError("Could not find nearby fire data. Please try a different location.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Fire Risk Prediction</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex flex-col items-center bg-orange-50 p-4 rounded-xl border border-orange-100 mb-4">
                    <p className="text-sm text-gray-600 mb-2">Enter a <b>Location Name</b> (e.g., "California") OR <b>Coordinates</b> to auto-fill data.</p>
                    <div className="w-full max-w-md mb-3">
                        <input type="text" name="location_name" value={formData.location_name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-center" placeholder="Enter Location Name (Optional)" />
                    </div>
                    <button type="button" onClick={handleAutofill} disabled={loading} className="px-6 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors border border-orange-200">
                        ✨ Auto-fill Data from Satellite
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="e.g. 20.5" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="e.g. 78.9" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brightness (Kelvin)</label>
                    <input type="number" step="any" name="brightness" value={formData.brightness} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="e.g. 300.5" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scan</label>
                    <input type="number" step="any" name="scan" value={formData.scan} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="e.g. 1.0" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Acquisition Date</label>
                    <input type="date" name="acq_date" value={formData.acq_date} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Acquisition Time (HH:MM)</label>
                    <input type="time" name="acq_time" value={formData.acq_time} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bright T31 (Kelvin)</label>
                    <input type="number" step="any" name="bright_t31" value={formData.bright_t31} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="e.g. 290.0" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Day/Night</label>
                    <select name="daynight" value={formData.daynight} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none">
                        <option value="D">Day</option>
                        <option value="N">Night</option>
                    </select>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" disabled={loading} className={`w-full py-4 text-lg font-bold text-white rounded-xl shadow-md transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 hover:shadow-lg'}`}>
                        {loading ? 'Analyzing...' : 'Predict Fire Risk'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-center">
                    {error}
                </div>
            )}

            {result !== null && (
                <div className="mt-8 p-8 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-xl text-center border border-gray-800 animate-fade-in-up">
                    <h3 className="text-2xl font-light mb-2 text-gray-300">Predicted Fire Radiative Power (FRP)</h3>
                    <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 my-4">
                        {result.toFixed(2)} MW
                    </div>
                    <p className={`text-lg font-medium px-4 py-1 rounded-full inline-block ${result > 50 ? 'bg-red-500/20 text-red-400' : result > 10 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                        Risk Level: {result > 50 ? 'High' : result > 10 ? 'Medium' : 'Low'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PredictionForm;
