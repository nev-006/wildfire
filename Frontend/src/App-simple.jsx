import React from 'react';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>App with Routing</h1>
      <Routes>
        <Route path="/" element={<div><h2>Home Page</h2><p>This is the home page</p></div>} />
        <Route path="/predict" element={<div><h2>Predict Page</h2><p>This is the predict page</p></div>} />
        <Route path="/login" element={<div><h2>Login Page</h2><p>This is the login page</p></div>} />
      </Routes>
    </div>
  );
}

export default App;
