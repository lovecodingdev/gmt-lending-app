import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
  
import Landing from "./pages/Landing";
import Pool from "./pages/Pool";

function Rou () {
    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/landing' element={<Landing />} />
            <Route path='/pool' element={<Pool />} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    )
}

export default Rou;