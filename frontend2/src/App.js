import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
//pages and componenets
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Report from './pages/ReportPage'
import ReportPage from "./pages/ReportPage";

function App() {
    return (
    <div className ="App">
        <BrowserRouter>
        <Navbar />
            <div className = "pages">
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route 
                    path="/report"
                    element={<ReportPage/>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    </div>
)};

export default App;