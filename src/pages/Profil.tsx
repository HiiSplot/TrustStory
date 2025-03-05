import { t } from "i18next"
import React from "react"
import { Input } from "../components/input"

export const Profil: React.FC = () => {
  return (
    <>
      <div>
        <h1>{t("profil.title")}</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', width: '65vw', backgroundColor: '#a3b4ff2a', borderRadius: '10px', padding: '25px' }}>
        <div style={{ width: '20%', height: '20%', display: 'flex', paddingTop: '40px' }}>
          <img style={{ width: '100%', borderRadius: '99%', border: '10px solid #E8F0FE' }} src="https://external-preview.redd.it/looking-for-cat-holding-camera-meme-v0-hHXl1YNEuBrwzSTG72BYhBxhJi30D8stnUQccN6hMP0.jpg?auto=webp&s=d3db9cf4e90d3e6904bca67f752107177082086c" alt="" />
        </div>
        <div style={{ width: '55%', display: 'flex', flexDirection: 'column' }}>
          <Input textKey="Nom" type="text" name="name" value="" isDisabled={true} />
          <Input textKey="Prénom" type="text" name="name" value="" isDisabled={true} />
          <Input textKey="Date d'anniversaire" type="text" name="name" value="" isDisabled={true} />
          <Input textKey="Email" type="text" name="name" value="" isDisabled={true} />
          <Input textKey="Adresse postale" type="text" name="name" value="" isDisabled={true} />
          <Input textKey="Code postal" type="text" name="name" value="" isDisabled={true} />
          <Input textKey="Pays" type="text" name="name" value="" isDisabled={true} />
        </div>
      </div>

      <div></div>
    </>
  )
}