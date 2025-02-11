import React, { useState } from "react"
import { Input } from "./input"
import { Button } from "./button"
import { useTranslation } from "react-i18next"
import { Form, Link, useNavigate } from "react-router-dom"
import { onSignInValidate } from "../api/api"

type LoginData = {
  user: string,
  password: string
}

export const LoginForm: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState<LoginData>({
    user: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await onSignInValidate(loginData);
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        navigate('/home');
      } else {
        console.error("Authentification échouée : Pas de token reçu.");
      }
    } catch (error) {
      console.error('La connexion a échoué. Vérifie tes informations.', error);
    }
  };

  return(
    <>
      <Form onSubmit={onSubmit}>
        <Input textKey={t("login.form.login")}type="text" name="user" value={loginData.user} onChange={handleChange}/>
        <Input textKey={t("login.form.password")} type="password" name="password"  value={loginData.password} onChange={handleChange}/>
        <div>
          <Button labelKey={t("login.form.button.connection")} type="submit"/>
        </div>
      </Form>
      <div>
        <Link to="/sign-up">{t("login.form.button.inscription")}</Link>
      </div>
    </>
  )
}