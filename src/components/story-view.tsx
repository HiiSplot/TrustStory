import React from "react";
import { useTranslation } from "react-i18next"
import { Story } from "../pages/Stories";
import './story-view.css'
import { postInFavorites } from "../api/api";
import { Comments } from "./comments";

type StoryView = {
  storyId: number
  stories: Story[]
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const StoryView: React.FC<StoryView> = ({ storyId, stories, setIsOpened }) => {
  const { t } = useTranslation()
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
  const [iconButtonName, setIconButtonName] = React.useState<string>('add')
  const [iconPersonName, setIconPersonName] = React.useState<string>('person_add')

  const toggleFollowButton = (iconName: string) => {
    if (iconName === 'add') {
      setIconButtonName('check')
      setIconPersonName('person_check')
    } else {
      setIconButtonName('add')
      setIconPersonName('person_add')
    }
  }

  const favoriteToggle = (storyId: number) => {
    setIsFavorite(!isFavorite)
    postInFavorites(storyId)
  }

  return(
    <div className='story-container'>
      <div className="story-container__content">
        <div className="story-container__close-button" onClick={() => setIsOpened(false)}>
          <span className="material-symbols-outlined font-size">cancel</span>
        </div>

        {stories.filter(story => story.id === storyId).map((story) => (
          <>
            <h1 className='story-container__title'>{story.title}</h1>
                           
            <div className='story-container__buttons-container'>
              <div className='card-container__icons-container' onClick={() => favoriteToggle(storyId)} >
                <button className="story-view__icon">
                  <i className={isFavorite ? "fa-solid fa-heart heart" : "fa-regular fa-heart heart"} />
                  {isFavorite ? t("story.form.button.removeFavorite") : t("story.form.button.addFavorite")}
                </button>
              </div>
            </div>

            <div className='story-container__subtitle'>
              <p>{t("story.postedBy")}</p>
              <div className='story-container__author-container'>
                <a className='story-container__author-container__link' href="">{story.author}</a>
                <span className="material-symbols-outlined add-icon" onClick={() => {toggleFollowButton(iconButtonName)}} style={{ cursor: 'pointer'}}>{iconPersonName}</span>
              </div>
            </div>

            <p className="story-container__description">{story.description}</p>

            <Comments storyId={storyId} />
          </>
        ))}
      </div>
    </div>
  )
}