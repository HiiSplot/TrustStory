import React from 'react'
import './card.css'
import { t } from 'i18next'
import { deleteStoryById, getFavoriteByStory, onDeleteStory, postInFavorites, removeFavorite } from '../api/api'
import { Button } from './button'
import { USER_ID } from '../context/AuthContext'
import { Story } from '../pages/Stories'
import { OtherProfil } from '../pages/OtherProfil'

type Card = {
  userId: number
  id: number
  title: string
  date: string
  author: string
  description: string
  setStoryId: React.Dispatch<React.SetStateAction<number>>
  setIsStoryOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormEdit: React.Dispatch<React.SetStateAction<boolean>>
  updateStoryFavorite: (storyId: number, isFav: boolean) => void
  isFavorite: boolean
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
  setStories: React.Dispatch<React.SetStateAction<Story[]>>
  FromStories?: boolean
}

export const Card: React.FC<Card> = ({
  userId,
  id,
  title,
  date,
  author,
  description,
  setStoryId,
  setIsFormOpened,
  setIsStoryOpened,
  setIsFormEdit,
  updateStoryFavorite,
  isFavorite,
  setIsFavorite,
  setStories,
  FromStories
}) => {

  const [isUserCanEdit, setIsUserCanEdit] = React.useState<boolean>(false)
  const descriptionRef = React.useRef<HTMLParagraphElement>(null)

  const favoriteToggle = async (storyId: number) => {
    const newFavoriteState = !isFavorite
  
    setIsFavorite(newFavoriteState)
    updateStoryFavorite(storyId, newFavoriteState)
  
    try {
      if (newFavoriteState) {
        await postInFavorites(storyId);
      } else {
        await removeFavorite(storyId);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris", error);
      setIsFavorite(!newFavoriteState);
    }
  };

  const editStory = (storyId: number) => {
    setIsFormOpened(true)
    setIsFormEdit(true)
    setStoryId(storyId)
  }

  const deleteStory = (storyId: number) => {
    onDeleteStory(storyId)
    setStories((prevStories) => prevStories.filter((story) => story.id !== storyId))
  }

  const viewMore = () => {
    setStoryId(id)
    setIsStoryOpened(true)
  }

  const isUserLikedStory = async (storyId: number) => {
    const data = await getFavoriteByStory(storyId)
    setIsFavorite(data.length > 0)
  }

    React.useEffect(() => {
    isUserLikedStory(id)
    if (Number(USER_ID) === userId) {
      setIsUserCanEdit(true)
    }
  }, [id])

  return(
    <div className='card-container'>

      {isUserCanEdit &&
      <div className='card-container__right-icons-container'>
        <div className='card-container__edit-icon' onClick={() => editStory(id)}>
          <span className="material-symbols-outlined">edit</span>
        </div>
        <div className='card-container__edit-icon' onClick={() => deleteStory(id)}>
          <span className="material-symbols-outlined">delete</span>
        </div>
      </div>
      }
      <div className='card-container__image-container'>
        <div className='card-container__date-container'>
          <p className='card-container__date-container__date'>{date}</p>
        </div>
        <span className="material-symbols-outlined image-icon">image</span>
        {/* <img src='https://blocks.astratic.com/img/general-img-square.png' alt='placeholder' className='card-container__image-container__image'/> */}
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
        </div>

        <div className='card-container__descrption-buttons-container'>
        <div className='card-container__subtitle card-container__description'>
          <p ref={descriptionRef} >{description}</p>
        </div>
        <div className='card-container__button-container'>
          <Button labelKey='Voir plus' type='button' className='card-container__button' onClick={viewMore}/>
              {FromStories ? (
                <div className='card-container__icons-container' onClick={() => favoriteToggle(id)} >
                  <div className="icon">
                    <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                  </div>
                </div>
              ) : (
                <span className="material-symbols-outlined">delete</span>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}