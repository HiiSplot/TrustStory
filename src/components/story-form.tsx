import { useTranslation } from "react-i18next"
import { Input } from "./input"
import { Form } from "react-router-dom"
import { Button } from './button';
import { TextArea } from "./text-area";
import React from "react";
import { getCategories, getInformations, getStoryById, onCreateStory } from "../api/api";
import { MySelect } from "./select";
import { USER_ID } from '../context/AuthContext';
import { Select, Story } from "../api/types";
import './story-form.css'

type StoryForm = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  isFormEdit?: boolean
  storyId?: number
  stories?: Story[]
  setStories: React.Dispatch<React.SetStateAction<Story[]>>
}

export const StoryForm: React.FC<StoryForm> = ({
  setIsOpened,
  isFormEdit,
  storyId,
  setStories
}) => {
  const { t } = useTranslation()

  const dateNow = new Date().toISOString().split('T')[0]

  const [title, setTitle] = React.useState<string>('')
  const [date, setDate] = React.useState(dateNow)
  const [author, setAuthor] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [categories, setCategories] = React.useState<Select[]>([])
  const [categoryId, setCategoryId] = React.useState<number>(1)
  const labelKey = isFormEdit ? t("story.button.edit") : t("story.button.validation")

  const getCurrentUser = async () => {
    const data = await getInformations(Number(USER_ID))
    setAuthor(data[0].pseudo)
  }

  const fetchStoryById = async (id: number) => {
    try {
      const data = await getStoryById(id)         
      setTitle(data.title)
      setDate(data.date)
      setAuthor(data.author)
      setCategoryId(data.category_id)
      setDescription(data.description)
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'histoire :', error)
    }
  }

  const getAllCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userId: number = Number(USER_ID)
    const favoritesCount = 0

    const newStoryData: Omit<Story, 'id'> = {
      title,
      date,
      author,
      description,
      categoryId,
      userId,
      isFavorite: false,
      favoritesCount,
    };
    
    try {
    const newStory = await onCreateStory(newStoryData)
    const fullStory: Story = { ...newStoryData, id: newStory.insertId };
    setStories((prevStories) => [...prevStories, fullStory])
    setIsOpened(false)
    } catch (error) {
      console.error('Erreur lors de la création de l\'histoire :', error)
    }
  }

  console.log(date);
  

  React.useEffect(() => {
    if (isFormEdit && storyId) fetchStoryById(storyId)
    getCurrentUser()
    getAllCategories()
  }, [storyId, isFormEdit])
  
  return(
    <div className='form-container'>
      <div className="form-container__close-button" onClick={() => setIsOpened(false)}>
      <span className="material-symbols-outlined font-size">cancel</span>
      </div>
      <h1 className='form-container__title'>{t("home.form.titleForm")}</h1>
      <Form action='/home' onSubmit={handleSubmit} className='form-container__form'>
        <Input
          textKey={t("home.form.title")}
          type="text"
          name="title"
          value={isFormEdit ? title : ''}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          textKey={t("home.form.date")}
          type="date"
          name="date"
          max={dateNow.toString()}
          value={isFormEdit ? new Date(date).toISOString().split('T')[0] : ''}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          textKey={t("home.form.author")}
          type="text"
          name="author"
          value={author}
          isDisabled={true}
        />
        
        <MySelect items={categories} name="categories" categoryId={categoryId} setCategoryId={setCategoryId} />

        <TextArea
          textKey={t("home.form.description")}
          name="description"
          value={isFormEdit ? description : ''}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className='form-container__buttons-container'>
          <Button
            labelKey={t("story.button.cancel")}
            type="button"
            onClick={() => {setIsOpened(false)}}
            className="form-container__buttons-container__cancel-button"
          />
          <Button
            labelKey={labelKey}
            type="submit"
          />
        </div>
      </Form>
    </div>
  )
}