<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState ,useEffect} from 'react';
>>>>>>> 8f17dee1da829672c7ced0d49775d7c57b68af1e
import wildfireService from '../services/wildfireService';
import { data } from 'react-router-dom';
import Swal from "sweetalert2";
import debounce from "lodash/debounce";
<<<<<<< HEAD
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

const customBlinkingIcon = new L.DivIcon({
    className: 'custom-blinking-dot',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

const MapUpdater = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            map.flyTo([lat, lng], 6, { animate: true, duration: 1.5 });
        }
    }, [lat, lng, map]);
    return null;
};
=======
>>>>>>> 8f17dee1da829672c7ced0d49775d7c57b68af1e

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
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const close = () => setShowSuggestions(false);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
<<<<<<< HEAD
    }, []);
=======
}, []);
>>>>>>> 8f17dee1da829672c7ced0d49775d7c57b68af1e

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "location_name") {
            fetchSuggestions(value);
        }
<<<<<<< HEAD
    };
=======
};
>>>>>>> 8f17dee1da829672c7ced0d49775d7c57b68af1e

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
<<<<<<< HEAD

=======
           
>>>>>>> 8f17dee1da829672c7ced0d49775d7c57b68af1e
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
        } catch (err) {
            setError("Could not find nearby fire data. Please try a different location.");
<<<<<<< HEAD
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.detail,
            });
        } finally {

            setLoading(false);
        }
    };
    const fetchSuggestions = debounce(async (value) => {
        if (!value) {
            setSuggestions([]);
            return;
        }
        if (value.length < 3) {
            setSuggestions([]);
            return;
        }
        const location_name = value
        const data = await wildfireService.locationFetch({ location_name })

        setSuggestions(data);
        setShowSuggestions(true);
    }, 1000);
=======
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.detail,
                });
        } finally {
           
            setLoading(false);
        }
    };
const fetchSuggestions = debounce(async (value) => {
    if (!value) {
        setSuggestions([]);
        return;
    }
    if (value.length < 3) {
        setSuggestions([]);
         return;
    }
    const location_name = value
    const data = await wildfireService.locationFetch({ location_name })

    setSuggestions(data);
    setShowSuggestions(true);
}, 1000);
>>>>>>> 8f17dee1da829672c7ced0d49775d7c57b68af1e

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Fire Risk Prediction</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
<<<<<<< HEAD
                <div className="md:col-span-2 flex flex-col items-center bg-orange-50 p-4 rounded-xl border border-orange-100 mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        Enter a <b>Location Name</b> (e.g., "California") OR{" "}
                        <b>Coordinates</b> to auto-fill data.
                    </p>

                    <div className="w-full max-w-md mb-3 relative">
                        <input
                            type="text"
                            name="location_name"
                            value={formData.location_name}
                            onChange={(e) => {
                                handleChange(e);
                                fetchSuggestions(e.target.value);
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-center"
                            placeholder="Enter Location Name (Optional)"
                            autoComplete="off"
                        />

                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                                {suggestions.map((s, i) => (
                                    <div
                                        key={i}
                                        className="p-3 hover:bg-orange-100 cursor-pointer text-left text-sm"
                                        onClick={() => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                location_name: s.name
                                            }));
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        {s.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleAutofill}
                        disabled={loading}
                        className="px-6 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors border border-orange-200"
                    >
                        ✨ Auto-fill Data from Satellite
                    </button>
=======
               <div className="md:col-span-2 flex flex-col items-center bg-orange-50 p-4 rounded-xl border border-orange-100 mb-4">
                <p className="text-sm text-gray-600 mb-2">
                    Enter a <b>Location Name</b> (e.g., "California") OR{" "}
                    <b>Coordinates</b> to auto-fill data.
                </p>

                <div className="w-full max-w-md mb-3 relative">
                    <input
                    type="text"
                    name="location_name"
                    value={formData.location_name}
                    onChange={(e) => {
                        handleChange(e);
                        fetchSuggestions(e.target.value);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-center"
                    placeholder="Enter Location Name (Optional)"
                    autoComplete="off"
                    />

                    {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                        {suggestions.map((s, i) => (
                        <div
                            key={i}
                            className="p-3 hover:bg-orange-100 cursor-pointer text-left text-sm"
                            onClick={() => {
                            setFormData((prev) => ({
                                ...prev,
                                location_name: s.name
                            }));
                            setShowSuggestions(false);
                            }}
                        >
                            {s.name}
                        </div>
                        ))}
                    </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleAutofill}
                    disabled={loading}
                    className="px-6 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors border border-orange-200"
                >
                    ✨ Auto-fill Data from Satellite
                </button>
>>>>>>> 8f17dee1da829672c7ced0d49775d7c57b68af1e
                </div>

                {/* Premium Map Display */}
                <div className="md:col-span-2 mb-6">
                    {/* Map Header label */}
                    <div className="flex items-center gap-2 mb-2 px-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Live Satellite Location</p>
                    </div>

                    {/* Map Frame */}
                    <div className="relative h-72 w-full rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.18)] border border-gray-800">
                        {/* Subtle orange inner glow overlay */}
                        <div className="absolute inset-0 pointer-events-none rounded-2xl z-20" style={{ boxShadow: 'inset 0 0 30px rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}></div>

                        <MapContainer
                            center={[formData.latitude || 20.5937, formData.longitude || 78.9629]}
                            zoom={4}
                            scrollWheelZoom={false}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            />
                            {formData.latitude && formData.longitude && !isNaN(formData.latitude) && !isNaN(formData.longitude) && (
                                <Marker
                                    position={[formData.latitude, formData.longitude]}
                                    icon={customBlinkingIcon}
                                />
                            )}
                            <MapUpdater lat={parseFloat(formData.latitude)} lng={parseFloat(formData.longitude)} />
                        </MapContainer>
                    </div>
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
                    {/* <p className={`text-lg font-medium px-4 py-1 rounded-full inline-block ${result > 50 ? 'bg-red-500/20 text-red-400' : result > 10 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                        Risk Level: {result > 50 ? 'High' : result > 10 ? 'Medium' : 'Low'}
                    </p> */}

                    <p className="text-white text-lg mb-2">
                        Prediction Score: <span className="font-bold">{result}</span>
                    </p>

                    <p
                        className={`text-lg font-medium px-4 py-1 rounded-full inline-block ${result > 50
                            ? 'bg-red-500/20 text-red-400'
                            : result > 10
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}
                    >
                        Risk Level: {result > 50 ? 'High' : result > 10 ? 'Medium' : 'Low'}
                    </p>

                    <div className="mt-4 text-sm text-gray-300">
                        <p>Low Risk : 0 – 10</p>
                        <p>Medium Risk : 11 – 50</p>
                        <p>High Risk : &gt; 50</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PredictionForm;
