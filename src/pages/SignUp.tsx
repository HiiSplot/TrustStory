import { useState } from "react";
import { useTranslation } from "react-i18next"
import { Form, Link, useNavigate } from "react-router-dom";
import { onSignUpValidate } from "../api/api";
import { Input } from "../components/input";
import { Button } from "../components/button";

interface FormData {
  user: string;
  email: string;
  password: string;
  date: string;
}

export const SignUp: React.FC = () => {
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
      <h1>{t("signUp.title")}</h1>
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