import { useTranslation } from "react-i18next"
import { Input } from "./input"
import { Button } from "./button"
import { Form, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { onSignUpValidate } from "../api/api"

interface FormData {
  user: string;
  email: string;
  password: string;
  date: string;
}

export const SignUpForm: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
      user: '',
      email: '',
      password: '',
      date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const onSubmitForm = async (e: React.FormEvent) => {

    try {
    await onSignUpValidate(formData)
    navigate('/login')

    } catch (error) {
      e.preventDefault()
      console.log(error);
      
    }

  }

  return(
    <>
    <Form onSubmit={onSubmitForm}>
      <Input
        textKey={t("signUp.form.user")}
        type="text"
        name="user"
        value={formData.user}
        onChange={handleChange}
      />
      <Input
        textKey={t("signUp.form.password")}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        />
      <Input
        textKey={t("signUp.form.mail")}
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        textKey={t("signUp.form.birthDate")}
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <div>
        <Button
          labelKey={t("signUp.button.signUp")}
          type="submit"
        />
      </div>
    </Form>
    <div>
      <Link to={"/login"}>
          {t("signUp.button.signIn")}
      </Link>
    </div>
    </>
  )
}