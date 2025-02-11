import React from 'react';
import './nav.css'

export const Nav: React.FC = () => {
  const [isUserConnected] = React.useState(true)
  return (
    <nav className='nav-container'>
      <div></div>
      <div>
        <ul className='nav-container__list'>
          <li><a href="/home">Home</a></li>
          {isUserConnected ? (
            <>
              <li style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#747bff' }}>
                <a href="/profil">Favorite stories</a>
              </li>
              <li><a href="/profil">Profil</a></li>
              <li><a href="/profil">Profil</a></li>
            </>
          ) : (
            <>
              <li><a href="/login">Sign in</a></li>
              <li><a href="/sign-up" className='nav-container__list__sign-up'>Sign up</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}