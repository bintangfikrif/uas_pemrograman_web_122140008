import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header.tsx';
import Navbar from '../common/Navbar.tsx';
import Footer from '../common/Footer.jsx';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;