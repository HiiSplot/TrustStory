import React from "react"
import { useTranslation } from "react-i18next"
import { LoginForm } from "../components/login-form";

type Login = {
}

export const Login: React.FC<Login> = () => {
  const { t } = useTranslation()

  return(
      <div>
        <h1>{t("login.title")}</h1>
        <LoginForm />
      </div>
  )
}
