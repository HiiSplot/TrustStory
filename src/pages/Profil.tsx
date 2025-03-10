import { t } from "i18next"
import React, { useEffect } from "react"
import { Input } from "../components/input"
import { Title } from "../components/title"
import { getInformations } from "../api/api"
import { Button } from '../../../vite-project/src/components/button';
import './style/form.css'
import './style/profil.css'

const initialProfilState = {
  lastName: '',
  address: '',
  postalCode: '',
  country: '',
};

export const Profil: React.FC = () => {

  const [isDisabled, setIsDisabled] = React.useState(true)
  const [profilInformations, setProfilInformations] = React.useState({
    name: '',
    email: '',
    birthday: '',
  })
  const [completeProfil, setCompleteProfil] = React.useState({
    lastName: '',
    address: '',
    postalCode: '',
    country: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompleteProfil((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  
  const fetchProfil = async () => {
    try {
      const data = await getInformations()
      setProfilInformations(data)
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du profil :', error)
    }
  };
  
  const toggleDisabled = (e: Event) => {
    e.preventDefault()
    if (isDisabled) {
      setIsDisabled(false)
    } else {
      setCompleteProfil(initialProfilState)
      setIsDisabled(true)
    }
  }
  
  useEffect(() => {
    fetchProfil()
  }, [])
  
  return (
    <>
    <Title title={t("profil.title")} />
    <div className="profil-page">
      <div className="form">
        <a href="" className="link-profil">
          <div className="complete-profil">
            {isDisabled ? (
            <>
              <span className="material-symbols-outlined complete-profil__span">edit</span>
              <span onClick={toggleDisabled}>Compléter le profil</span>
            </> 
            ) : (
            <>
            <span className="material-symbols-outlined complete-profil__span">block</span>
            <span onClick={toggleDisabled}>Annuler</span>
            </>
            )
            }
          </div>
        </a>
        <div className="profil-container">
          <div className="profil-container__image-container">
            <img
              className="profil-container__image-containe__img"
              src="https://external-preview.redd.it/looking-for-cat-holding-camera-meme-v0-hHXl1YNEuBrwzSTG72BYhBxhJi30D8stnUQccN6hMP0.jpg?auto=webp&s=d3db9cf4e90d3e6904bca67f752107177082086c"
              alt="Profil image"
            />
          </div>
          <div className="profil-container__form-container">
            <Input textKey="Nom" type="text" name="lastName" value={completeProfil.lastName} onChange={handleChange} isDisabled={isDisabled} />
            <Input textKey="Prénom" type="text" name="firstname" value={profilInformations.name} isDisabled={isDisabled} />
            <Input textKey="Date d'anniversaire" type="text" name="birthday" value={profilInformations.birthday} isDisabled={isDisabled} />
            <Input textKey="Email" type="text" name="email" value={profilInformations.email} isDisabled={isDisabled} />
            <Input textKey="Adresse postale" type="text" name="address" value={completeProfil.address} onChange={handleChange} isDisabled={isDisabled} />
            <Input textKey="Code postal" type="text" name="postalCode" value={completeProfil.postalCode} onChange={handleChange} isDisabled={isDisabled} />
            <Input textKey="Pays" type="text" name="country" value={completeProfil.country} onChange={handleChange} isDisabled={isDisabled} />
            {!isDisabled && <Button type='submit' labelKey={t("story.button.validation")} onClick={() => {setIsDisabled(true)}} />}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}