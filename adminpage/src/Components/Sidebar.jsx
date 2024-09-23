import React from 'react';
import { Link } from 'react-router-dom';
import { BsGrid1X2Fill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill } from 'react-icons/bs';
import { FaClinicMedical } from 'react-icons/fa';
import { GiMedicines } from "react-icons/gi";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <FaClinicMedical className='icon_header' /> BOOKINGCARE
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/">
            <BsGrid1X2Fill className='icon' /> Trang chủ
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/doctor">
            <BsPeopleFill className='icon' /> Bác sĩ
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/appointments">
            <BsListCheck className='icon' /> Lịch hẹn
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/plans">
            <BsMenuButtonWideFill className='icon' /> Kế Hoạch
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="./Medicine">
            <GiMedicines className='icon' /> Kho thuốc
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
