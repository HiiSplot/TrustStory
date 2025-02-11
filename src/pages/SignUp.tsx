import { useTranslation } from "react-i18next"
import { SignUpForm } from "../components/sign-up-form"

export const SignUp: React.FC = () => {
  const { t } = useTranslation()
  return(
    <>
      <h1>{t("signUp.title")}</h1>
      <SignUpForm />
    </>
  )
}