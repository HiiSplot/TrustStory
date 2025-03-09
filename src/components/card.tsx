import React, { useEffect } from 'react'
import './card.css'
import { t } from 'i18next'
import { postInFavorites } from '../api/api'

type Card = {
  id: number
  title: string
  date: string
  author: string
  description: string
  FromStories?: boolean
}

export const Card: React.FC<Card> = ({ id, title, date, author, description, FromStories }) => {

  const [isTruncated, setIsTruncated] = React.useState<boolean>(false)
  const [isLinkClicked, setIsLinkClicked] = React.useState<boolean>(false)
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
  const descriptionRef = React.useRef<HTMLParagraphElement>(null)

  const favoriteToggle = (storyId: number) => {
    setIsFavorite(!isFavorite)
    postInFavorites(storyId)
    
  }

  useEffect(() => {
    const element = descriptionRef.current
    if (element) {
      setIsTruncated(element.scrollHeight > element.clientHeight)
    }
  }, [description])

  return(
    <div className={isLinkClicked ? 'card-container large' : 'card-container min'}> 
      <div onClick={() => favoriteToggle(id)} className='card-container__icons'>
        {FromStories ? (
          isFavorite ? (
            <span className="material-symbols-outlined">heart_check</span>
          ) : (
            <span className="material-symbols-outlined">heart_plus</span>
          )
        ) : (
          <span className="material-symbols-outlined">delete</span>
        )}
      </div>
      <h2 className='card-container__title'>{title}</h2>
      <div>
        <h3 className='card-container__subtitle'>
          {t("home.card.date")}
        </h3>
        <p className='card-container__date'>{date}</p>
      </div>
      <div>
        <h3 className='card-container__subtitle'>
          {t("home.card.author")}
        </h3>
        <p className='card-container__author'>{author}</p>
      </div>
      <div>
        <h3 className='card-container__subtitle'>
          {t("home.card.description")}
        </h3>
        <p ref={descriptionRef} className={isLinkClicked ? 'card-container__description-max' : 'card-container__description-min'}>{description}</p>
      </div>
      {isTruncated && (
        isLinkClicked ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#747bff' }}>
            <a onClick={() => setIsLinkClicked(false)} className='card-container__link'>
              {t("home.card.less")} 
            </a>
            <span className="material-symbols-outlined">keyboard_arrow_up</span>
          </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#747bff' }}>
          <a onClick={() => setIsLinkClicked(true)} className='card-container__link '>
            {t("home.card.more")} 
          </a>
          <div className={isLinkClicked ? '' : 'rotate'}>
            <span className="material-symbols-outlined">keyboard_arrow_up</span>
          </div>
        </div>
      )
    )}
    </div>
  )
}