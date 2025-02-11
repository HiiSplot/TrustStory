import { useTranslation } from "react-i18next"
import { Input } from "./input"
import { Form } from "react-router-dom"
import { Button } from './button';
import { TextArea } from "./text-area";
import React from "react";
import './story-form.css'
import { Story } from "../pages/Home";

type StoryForm = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  stories: Story[]
}

export const StoryForm: React.FC<StoryForm> = ({ setIsOpened, stories }) => {
  const { t } = useTranslation()

  const dateNow = new Date().toISOString().split('T')[0]

  const [title, setTitle] = React.useState<string>('')
  const [date, setDate] = React.useState(dateNow)
  const [author, setAuthor] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    stories.push({ title, date, author, description })
    setIsOpened(false)
  }

  return(
    <div className='form-container'>
      <h1 className='form-container__form__title'>{t("home.form.titleForm")}</h1>
      <Form action='/home' onSubmit={handleSubmit} className='form-container__form'>
        <Input
          textKey={t("home.form.title")}
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          textKey={t("home.form.date")}
          type="date"
          name="date"
          max={dateNow.toString()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          textKey={t("home.form.author")}
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextArea
          textKey={t("home.form.description")}
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className='form-container__buttons-container'>
          <Button
            labelKey={t("story.button.validation")}
            type="submit"
          />
          <Button
            labelKey={t("story.button.cancel")}
            type="button"
            onClick={() => {setIsOpened(false)}}
          />
        </div>
      </Form>
    </div>
  )
}