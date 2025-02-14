import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Form, Link, useNavigate } from "react-router-dom";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { onSignInValidate } from "../api/api";
import './style/form.css'

type LoginData = {
  user: string,
  password: string
}

export const Login: React.FC = () => {
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
    <div className="form">
      <div>
        <h1>{t("login.title")}</h1>
      </div>
      <Form onSubmit={onSubmit} style={{ width: '40%' }}>
        <Input textKey={t("login.form.login")}type="text" name="user" value={loginData.user} onChange={handleChange}/>
        <Input textKey={t("login.form.password")} type="password" name="password"  value={loginData.password} onChange={handleChange}/>
        <div className="form__button-container">
          <Button labelKey={t("login.form.button.connection")} type="submit"/>
        </div>
      </Form>
      <div>
        <Link to="/sign-up">{t("login.form.button.inscription")}</Link>
      </div>
    </div>
  )
}
