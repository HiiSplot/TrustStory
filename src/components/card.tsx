import React from 'react'
import './card.css'
import { t } from 'i18next'
import { postInFavorites } from '../api/api'
import { Button } from './button'

type Card = {
  id: number
  title: string
  date: string
  author: string
  description: string
  setStoryId: React.Dispatch<React.SetStateAction<number>>
  setIsStoryOpened: React.Dispatch<React.SetStateAction<boolean>>
  FromStories?: boolean
}

export const Card: React.FC<Card> = ({ id, title, date, author, description, setStoryId, setIsStoryOpened, FromStories }) => {
  const userId = localStorage.getItem('userId')

  const [isUserCanEdit, setIsUserCanEdit] = React.useState<boolean>(false)
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
  const descriptionRef = React.useRef<HTMLParagraphElement>(null)

  if (userId === id.toString()) {
    setIsUserCanEdit(true)
  }

  const favoriteToggle = (storyId: number) => {
    setIsFavorite(!isFavorite)
    postInFavorites(storyId)
  }

  const onViewMore = () => {
    setStoryId(id)
    setIsStoryOpened(true)
  }

  return(
    <div className='card-container'>

      {isUserCanEdit &&
        <div className='card-container__edit-icon'>
          <span className="material-symbols-outlined">edit</span>
        </div>
      }
      <div className='card-container__image-container'>
        <div className='card-container__date-container'>
          <p className='card-container__date-container__date'>{date}</p>
        </div>
        <span className="material-symbols-outlined" style={{ fontSize: '80px', color: '#1F2A44' }}>image</span>
        {/* <img src='https://blocks.astratic.com/img/general-img-square.png' alt='placeholder' className='card-container__image-container__image'/> */}
      </div>

      <div className='card-container__text-content'>

        <h1 className='card-container__title'>{title}</h1>
        <div className='card-container__subtitle'>
          <p>Posté par : </p>
          {isUserCanEdit ? (
            <p className='card-container__author'>Vous</p>
          ) : (
            <a className='card-container__author' href="">{author}</a>
          )}
        </div>

        <div className='card-container__descrption-buttons-container'>
        <div className='card-container__subtitle card-container__description'>
          <p ref={descriptionRef} >{description}</p>
        </div>
        <div className='card-container__button-container'>
          <Button labelKey='Voir plus' type='button' className='card-container__button' onClick={onViewMore}/>
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