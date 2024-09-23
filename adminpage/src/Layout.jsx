import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

const Layout = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
