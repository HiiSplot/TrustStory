import { RouterProvider } from 'react-router-dom';
import './App.css'
import "./i18n/i18n"
import { router } from './router/AppRoutes'
import React from 'react';
import { Nav } from './components/nav';
import { Footer } from './components/footer';
import { PageLoader } from './components/page-loader';

const PORT = 3060

export const App: React.FC = () => {

  
  React.useEffect(() => {
    fetch(`http://localhost:${PORT}`)
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }, []);

  return(
    <div className='app-container'>
      <React.Suspense fallback={<PageLoader />}>
        <Nav />
        <RouterProvider router={router} />
        <Footer />
      </React.Suspense>
    </div>
  )
}
