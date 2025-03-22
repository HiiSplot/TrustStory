import React from 'react';
import './nav.css'
import { t } from 'i18next';
import { useAuth, USER_ID } from '../context/AuthContext';
import { Title } from './title';

export type Items = {
  id: number
  name: string
  onAction: () => void
}

export const Nav: React.FC = () => {
  const { isUserConnected, logout } = useAuth();
  
  return (
    <nav className='nav-container'>
      <div className='nav-container__logo'>
        <Title title={t("home.title")} />
      </div>
      <div>
        <ul className='nav-container__list'>
          <li><a href="/stories">{t("nav.home")}</a></li>
          {isUserConnected ? (
            <>
              <li>
                <a
                  href=""
                  onClick={(event) => {
                    event.preventDefault()
                    window.location.href = "/profil/" + USER_ID
                  }}
                  >
                    {t("nav.profil")}
                  </a>
                </li>
              <li>
                <a
                  href=""
                  onClick={(event) => {
                    event.preventDefault()
                    logout();
                    window.location.href = "/login"
                  }}
                >
                  {t("nav.logout")}
                </a>
              </li>
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