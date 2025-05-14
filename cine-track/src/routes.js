import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MoviesDetailPage from './pages/MoviesDetailPage'; 
import AddMoviePage from './pages/AddMoviePage';
import EditMoviePage from './pages/EditMoviePage';
import NotFoundPage from './pages/NotFoundPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="movies" element={<MoviesPage />} />
      <Route path="movies/:id" element={<MoviesDetailPage />} />
      <Route path="movies/add" element={<AddMoviePage />} />
      <Route path="movies/edit/:id" element={<EditMoviePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;