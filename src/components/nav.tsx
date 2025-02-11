import React from 'react';
import './nav.css'

export const Nav: React.FC = () => {
  return (
    <nav className='nav-container'>
      <div></div>
      <div>
        <ul className='nav-container__list'>
          <li><a href="/home">Home</a></li>
          <li><a href="/login">Sign in</a></li>
          <li><a href="/sign-up">Sign up</a></li>
        </ul>
      </div>
    </nav>
  )
}