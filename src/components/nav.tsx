import React from 'react';
import './nav.css'
import { t } from 'i18next';
import { useAuth } from '../context/AuthContext';
import { Title } from './title';

export type Items = {
  id: number
  name: string
  onAction: () => void
}

export const Nav: React.FC = () => {
  const { isUserConnected, logout } = useAuth();
  const userId = localStorage.getItem('userId');
  
  return (
    <nav className='nav-container'>
      <div className='nav-container__logo'>
        <Title title={t("home.title")} />
      </div>
      <div>
        <ul className='nav-container__list'>
          <li><a href="/stories">{t("nav.home")}</a></li>
          {/* {isUserConnected ? (
            <> */}
              <li><a href="/favorites">{t("nav.favoriteStories")}</a></li>
              <li><a href="/profil/:userId">{t("nav.profil")}</a></li>
              <li><a href="/login" onClick={logout}>{t("nav.logout")}</a></li>
            {/* </>
          ) : (
            <> */}
              <li><a href="/login">{t("nav.login")}</a></li>
              <li><a href="/sign-up" className='nav-container__list__sign-up'>{t("nav.signUp")}</a></li>
            {/* </>
          )} */}
        </ul>
      </div>
    </nav>
  )
}