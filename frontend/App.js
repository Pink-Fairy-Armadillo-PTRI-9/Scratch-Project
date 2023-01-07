import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
//pages and components
import Home from './src/pages/Home'
import Navbar from './src/components/Navbar'
import Login from './src/components/Login'
import LandLord from './src/pages/Landlord'

function App() {
    return (
        <div className = "App">
        <BrowserRouter>
        <Navbar/>
        <div className = "pages">
            <Routes>
                {/* <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/landlord"
                    // element={<Landlord/>}
                /> */}
            </Routes>
        </div>
        </BrowserRouter>
        </div>
    )
}

export default App