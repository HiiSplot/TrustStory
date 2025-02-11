import React, { useEffect } from 'react'
import './card.css'

type Card = {
  title: string
  date: string
  author: string
  description: string
}

export const Card: React.FC<Card> = ({ title, date, author, description }) => {

  const [isTruncated, setIsTruncated] = React.useState<boolean>(false)
  const [isLinkClicked, setIsLinkClicked] = React.useState<boolean>(false)
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
  const descriptionRef = React.useRef<HTMLParagraphElement>(null)

  const favoriteToggle = () => {
    setIsFavorite(!isFavorite)
  }

  useEffect(() => {
    const element = descriptionRef.current
    if (element) {
      setIsTruncated(element.scrollHeight > element.clientHeight)
    }
  }, [description])

  return(
    <div className={isLinkClicked ? 'card-container large' : 'card-container min'}> 
      <div onClick={favoriteToggle} className='card-container__icons'>
        {isFavorite ? (
          <span className="material-symbols-outlined">heart_check</span>
        ) : (
          <span className="material-symbols-outlined">heart_plus</span>
        )}
      </div>
      <h2 className='card-container__title'>{title}</h2>
      <div>
        <h3 className='card-container__subtitle'>Date</h3>
        <p className='card-container__date'>{date}</p>
      </div>
      <div>
        <h3 className='card-container__subtitle'>Auteur</h3>
        <p className='card-container__author'>{author}</p>
      </div>
      <div>
        <h3 className='card-container__subtitle'>Description</h3>
        <p ref={descriptionRef} className={isLinkClicked ? 'card-container__description-max' : 'card-container__description-min'}>{description}</p>
      </div>
      {isTruncated && (
        isLinkClicked ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#747bff' }}>
            <a onClick={() => setIsLinkClicked(false)} className='card-container__link'>Lire moins </a>
            <span className="material-symbols-outlined">keyboard_arrow_up</span>
          </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#747bff' }}>
          <a onClick={() => setIsLinkClicked(true)} className='card-container__link '>Lire la suite </a>
          <div className={isLinkClicked ? '' : 'rotate'}>
            <span className="material-symbols-outlined">keyboard_arrow_up</span>
          </div>
        </div>
      )
    )}
    </div>
  )
}