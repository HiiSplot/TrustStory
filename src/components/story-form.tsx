import { useTranslation } from "react-i18next"
import { Input } from "./input"
import { Form } from "react-router-dom"
import { Button } from './button';
import { TextArea } from "./text-area";
import React from "react";
import './story-form.css'

type StoryForm = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const StoryForm: React.FC<StoryForm> = ({ setIsOpened }) => {
  const { t } = useTranslation()
  return(
    <div className='form-container'>
      <Form action="/home">
        <Input textKey={t("home.form.title")} type="text" name="" value="" onChange={() => {}}/>
        <TextArea textKey={t("home.form.description")} />
        <Button labelKey={t("story.button.validation")} type="submit" onClick={() => {setIsOpened(false)}}/>
        <Button labelKey={t("story.button.cancel")} type="button" onClick={() => {setIsOpened(false)}}/>
      </Form>
    </div>
  )
}