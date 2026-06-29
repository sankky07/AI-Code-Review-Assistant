import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Repository from "../pages/Repository/Repository";
import History from "../pages/History/History";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/repository/:id" element={<Repository />} />

                <Route path="/history" element={<History />} />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;