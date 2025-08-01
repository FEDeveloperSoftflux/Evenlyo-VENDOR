import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import VendorLogin from "./auth/VendorLogin.jsx";
import VendorRegister from "./auth/VendorRegister.jsx";

function VendorApp() {
  return (
    <Routes>
      <Route path="/" element={<VendorLogin />} />
      <Route path="/register" element={<VendorRegister />} />
      <Route path="/dashboard" element={<h1>Vendor Dashboard</h1>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default VendorApp;
