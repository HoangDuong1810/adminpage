import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './layout';
import Home from './views/Home';
import Doctor from './views/Doctor'; 
import Appointments from './views/Appointments';
import Plans from './views/Plans';
import './App.css'
import Medicine from './views/Medicine';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />}>
          <Route index element={<Home />} />
          <Route path="doctor" element={<Doctor />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="plans" element={<Plans />} />
          <Route path="medicine" element={<Medicine/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
