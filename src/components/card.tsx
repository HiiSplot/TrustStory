import React from 'react'
import { t } from 'i18next'
import { Button } from './button'
import { USER_ID } from '../context/AuthContext'
import { Story } from "../api/types"
import { MyModal } from './modal'
import { ConfirmModal } from './confirm-modal'
import './card.css'
import { getCategoryName } from '../api/categories'

type Card = {
  userId: number
  id: number
  title: string
  categoryId: number
  date: string
  author: string
  description: string
  setStoryId: React.Dispatch<React.SetStateAction<number>>
  setIsStoryOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormEdit: React.Dispatch<React.SetStateAction<boolean>>
  updateStoryFavorite: (storyId: number, isFav: boolean) => void
  isFavorite: boolean
  setStories: React.Dispatch<React.SetStateAction<Story[]>>
  toggleFavorite: (storyId: number, currentFav: boolean) => void
  FromStories?: boolean
}

export const Card: React.FC<Card> = ({
  userId,
  id,
  title,
  categoryId,
  date,
  author,
  description,
  setStoryId,
  setIsFormOpened,
  setIsStoryOpened,
  setIsFormEdit,
  setStories,
  toggleFavorite,
  isFavorite,
  FromStories
}) => {
  const [isUserCanEdit, setIsUserCanEdit] = React.useState<boolean>(false)
  const [isDeleteModalOpened, setIsDeleteModalOpened] = React.useState<boolean>(false)
  const descriptionRef = React.useRef<HTMLParagraphElement>(null)
  const [categoryName, setCategoryName] = React.useState<string>('')

  const fetchCategoryId = async (categoryId: number) => {
    const category = await getCategoryName(categoryId)
    setCategoryName(category.name)
  }

  const editStory = (storyId: number) => {
    setIsFormOpened(true)
    setIsFormEdit(true)
    setStoryId(storyId)
  }

  const viewMore = () => {
    setStoryId(id)
    setIsStoryOpened(true)
    
  }

  React.useEffect(() => {
    if (Number(USER_ID) === userId) {
      setIsUserCanEdit(true)
    }
    fetchCategoryId(categoryId)
  }, [USER_ID, userId, isUserCanEdit, categoryId])

  return(
    <>
    <div className='card-container'>
      <div className='card-container__image-container'>
        <span className="material-symbols-outlined image-icon">image</span>
        {/* <img src='https://blocks.astratic.com/img/general-img-square.png' alt='placeholder' className='card-container__image-container__image'/> */}
        <div className='card-container__category'>
          {categoryName}
        </div>
      </div>

      <div className='card-container__text-content'>

        <h1 className='card-container__title'>{title}</h1>
        <div className='card-container__subtitle'>
          <p>{t("story.postedBy")}</p>
          {isUserCanEdit ? (
            <p className='card-container__author'>{t("story.author")}</p>
          ) : (
            <a className='card-container__author' href="" onClick={
              (e) => {
                e.preventDefault()
                window.location.href = `/profil/${userId}`
              }
            }>{author}</a>
          )}
          <p>le {date}</p>
        </div>

        <div className='card-container__descrption-buttons-container'>
          <div className='card-container__subtitle card-container__description'>
            <p ref={descriptionRef} >{description}</p>
          </div>
          <div className='card-container__button-container'>
          <Button labelKey='Voir plus' type='button' className='card-container__button' onClick={viewMore}/>
            {FromStories ? (
              <div className='card-container__icons-container' onClick={() => toggleFavorite(id, isFavorite)}>
                <div className="icon">
                  <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                </div>
              </div>
            ) : (
              <span className="material-symbols-outlined">delete</span>
            )}
          </div>
        </div>
        
        {isUserCanEdit &&
          <div className='card-container__right-icons-container'>
            {/* <div className='card-container__edit-icon' onClick={() => editStory(id)}>
              <span className="material-symbols-outlined">more_vert</span>
            </div> */}
            <div className='card-container__edit-icon' onClick={() => editStory(id)}>
              <span className="material-symbols-outlined">edit</span>
            </div>
            <div className='card-container__edit-icon' onClick={() => setIsDeleteModalOpened(true)}>
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>
          }

      </div>
    </div>

    <MyModal 
      isOpened={isDeleteModalOpened}
      setIsOpened={setIsDeleteModalOpened}
      className="confirm-modal"
    >
      <ConfirmModal setStories={setStories} setIsDeleteModalOpened={setIsDeleteModalOpened} id={id} />
    </MyModal>
    </>
  )
}