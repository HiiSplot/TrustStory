import React from 'react';
import './nav.css'
import { t } from 'i18next';
import { useAuth } from '../context/AuthContext';

export type Items = {
  id: number
  name: string
  onAction: () => void
}

export const Nav: React.FC = () => {
  const { isUserConnected, logout } = useAuth();
  
  return (
    <nav className='nav-container'>
      <div></div>
      <div>
        <ul className='nav-container__list'>
          <li><a href="/stories">{t("nav.home")}</a></li>
          {isUserConnected ? (
            <>
              <li style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#747bff' }}>
                <a href="/favorites">{t("nav.favoriteStories")}</a>
              </li>
              <li><a href="/profil">{t("nav.profil")}</a></li>
              <li><a href="/login" onClick={logout}>{t("nav.logout")}</a></li>
            </>
          ) : (
            <>
              <li><a href="/login">{t("nav.login")}</a></li>
              <li><a href="/sign-up" className='nav-container__list__sign-up'>{t("nav.signUp")}</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}