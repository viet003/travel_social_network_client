import React, { useEffect } from 'react';
import { SidebarLeft, SidebarRight } from '../components';
import { Outlet, useNavigate } from 'react-router-dom';
import { pathDomain } from '../utilities/pathDomain';
import { useSelector } from 'react-redux';

const MainPage = () => {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(pathDomain.LANDING);
    }
  }, [token]);

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      {/* Sidebar Left */}
      <SidebarLeft className="fixed top-0 left-0" />

      {/* Main Feed */}
      <main className="flex flex-col items-center flex-1 px-2 py-8 md:px-8">
        <div className="w-full max-w-2xl">
          <Outlet />
        </div>
      </main>

      {/* Sidebar Right */}
      <SidebarRight className="fixed top-0 left-0" />
    </div>
  );
};

export default MainPage;
