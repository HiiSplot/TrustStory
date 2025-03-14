import { useTranslation } from "react-i18next"
import { Input } from "./input"
import { Form } from "react-router-dom"
import { Button } from './button';
import { TextArea } from "./text-area";
import React from "react";
import { Categories, Story } from "../pages/Stories";
import { getStoryById, onCreateStory } from "../api/api";
import { MySelect } from "./select";
import './story-form.css'

type StoryForm = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  isFormEdit: boolean
  storyId: number
  fakeStories: Story[]
}

const fakeCategories: Categories[] = [
  {
    id: 1,
    category_name: 'Action',
    isSelected: false
  },
  {
    id: 2,
    category_name: 'Adventure',
    isSelected: false
  },
  {
    id: 3,
    category_name: 'Comedy',
    isSelected: false
  },
  {
    id: 4,
    category_name: 'Crime',
    isSelected: false
  },
  {
    id: 5,
    category_name: 'Drama',
    isSelected: false
  },
  {
    id: 6,
    category_name: 'Fantasy',
    isSelected: false
  },
  {
    id: 7,
    category_name: 'Historical',
    isSelected: false
  },
  {
    id: 8,
    category_name: 'Horror',
    isSelected: false
  },
  {
    id: 9,
    category_name: 'Mystery',
    isSelected: false
  },
  {
    id: 10,
    category_name: 'Romance',
    isSelected: false
  }
]

export const StoryForm: React.FC<StoryForm> = ({ setIsOpened, isFormEdit, storyId, fakeStories }) => {
  const { t } = useTranslation()

  const dateNow = new Date().toISOString().split('T')[0]

  const [title, setTitle] = React.useState<string>('')
  const [date, setDate] = React.useState(dateNow)
  const [author, setAuthor] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')

  const fetchStoryById = async (id: number) => {
    try {
      const data = await getStoryById(id)
      setTitle(data.title)
      setDate(data.date)
      setAuthor(data.author)
      setDescription(data.description)
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'histoire :', error)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    onCreateStory({ title, date, author, description })
    setIsOpened(false)
  }

  React.useEffect(() => {
    if (isFormEdit) fetchStoryById(storyId)
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
        
        <MySelect items={fakeCategories} name="categories" onSelect={(item) => console.log(item)} />

        <TextArea
          textKey={t("home.form.description")}
          name="description"
          value={description}
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
            labelKey={t("story.button.validation")}
            type="submit"
          />
        </div>
      </Form>
    </div>
  )
}