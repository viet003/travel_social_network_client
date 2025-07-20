import React, { useEffect } from 'react';
import { SidebarLeft, SidebarRight } from '../../components';
import { Outlet, useNavigate } from 'react-router-dom';
import { pathDomain } from '../../utilities/pathDomain';
import { useSelector } from 'react-redux';

const MainPage = () => {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  return (
    <div className="relative flex min-h-screen bg-gray-50 min-w-screen">
      {/* Sidebar Left */}
      <SidebarLeft />

      {/* Main Feed */}
      <main className="flex flex-col items-center justify-start flex-1 px-2 py-8 md:px-8">
        <div className="flex flex-col items-center w-full">
          <Outlet />
        </div>
      </main>

      {/* Sidebar Right */}
      <SidebarRight />
    </div>
  );
};

export default MainPage;
