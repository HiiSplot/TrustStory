import React from 'react';
import './nav.css'
import { t } from 'i18next';

export const Nav: React.FC = () => {
  const [isUserConnected] = React.useState(true)
  return (
    <nav className='nav-container'>
      <div></div>
      <div>
        <ul className='nav-container__list'>
          <li><a href="/home">{t("nav.home")}</a></li>
          {isUserConnected ? (
            <>
              <li><a href="/categories">{t("nav.categories")}</a></li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#747bff' }}>
                <a href="/favorites">{t("nav.favoriteStories")}</a>
              </li>
              <li><a href="/profil">{t("nav.profil")}</a></li>
              <li><a href="/logout">{t("nav.logout")}</a></li>
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