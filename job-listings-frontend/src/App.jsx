import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import AddJob from "./pages/AddJob";

import JobDetails from "./pages/JobDetails";

import ApplyJob from "./pages/ApplyJob";

import "./App.css";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/add-job"
                    element={<AddJob />}
                />

                <Route
                    path="/job"
                    element={<JobDetails />}
                />

                <Route
                    path="/apply"
                    element={<ApplyJob />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;