import { RouterProvider } from 'react-router-dom';
import './App.css'
import "./i18n/i18n"
import { router } from './router/AppRoutes'
import React from 'react';
import { Nav } from './components/nav';

export const App: React.FC = () => {
  
  React.useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }, []);

  return(
    <>
      <Nav />
      <RouterProvider router={router} />
    </>
  )
}
