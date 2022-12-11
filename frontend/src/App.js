import React from 'react';
import Home from "./pages/Home";

import Patient from "./pages/Patient/Patient";
import AddPatient from "./pages/Patient/Add";
import EditParient from "./pages/Patient/Edit";
import ViewPatientPrescriptions from "./pages/Patient/View";

import Doctor from "./pages/Doctor/Doctor";
import AddDoctor from "./pages/Doctor/Add";
import EditDoctor from "./pages/Doctor/Edit";
import ViewDoctorPatients from "./pages/Doctor/View";

import Pharmacy from "./pages/Pharmacy/Pharmacy";
import AddPharmacy from "./pages/Pharmacy/Add";
import EditPharmacy from "./pages/Pharmacy/Edit";

import Pharmacist from "./pages/Pharmacy/Pharmacist/Pharmacist";
import AddPharmacist from "./pages/Pharmacy/Pharmacist/Add";
import EditPharmacist from "./pages/Pharmacy/Pharmacist/Edit";
import ViewPharmacistPrescriptions from "./pages/Pharmacy/Pharmacist/View";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/patient" element={<Patient />} />
        <Route path="/patient/add" element={<AddPatient />} />
        <Route path="/patient/edit" element={<EditParient />} />
        <Route path="/patient/view" element={<ViewPatientPrescriptions />} />

        <Route path="/doctor" element={<Doctor />} />"
        <Route path="/doctor/add" element={<AddDoctor />} />"
        <Route path="/doctor/edit" element={<EditDoctor />} />"
        <Route path="/doctor/view" element={<ViewDoctorPatients />} />"

        <Route path="/pharmacy" element={<Pharmacy />} />"
        <Route path="/pharmacy/add" element={<AddPharmacy />} />"
        <Route path="/pharmacy/edit" element={<EditPharmacy />} />"

        <Route path="/pharmacy/pharmacist" element={<Pharmacist />} />"
        <Route path="/pharmacy/pharmacist/add" element={<AddPharmacist />} />"
        <Route path="/pharmacy/pharmacist/edit" element={<EditPharmacist />} />"
        <Route path="/pharmacy/pharmacist/view" element={<ViewPharmacistPrescriptions />} />"
      </Routes>
    </Router>
  );
}

export default App;