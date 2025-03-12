import React from "react";
import { useTranslation } from "react-i18next"
import { Story } from "../pages/Stories";
import './story-view.css'
import { IconButton } from "./icon-button";
import { postInFavorites } from "../api/api";
import { Comments } from "./comments";

type StoryView = {
  storyId: number
  stories: Story[]
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const StoryView: React.FC<StoryView> = ({ storyId, stories, setIsOpened }) => {
  const { t } = useTranslation()
  const [isFollowed, setIsFollowed] = React.useState<boolean>(false)
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
  const [iconButtonName, setIconButtonName] = React.useState<string>('add')
  const [iconPersonName, setIconPersonName] = React.useState<string>('person_add')

  const toggleFollowButton = (iconName: string) => {
    if (iconName === 'add') {
      setIsFollowed(true)
      setIconButtonName('check')
      setIconPersonName('person_check')
    } else {
      setIsFollowed(false)
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
          <span className="material-symbols-outlined" style={{ fontSize: '30px' }}>cancel</span>
        </div>
        {stories.filter(story => story.id === storyId).map((story) => (
          <>
            <h1 className='story-container__title'>{story.title}</h1>
            <div className='story-container__subtitle'>
              <p>Posté par : </p>
              <a className='' href="">{story.author}</a>
              <span className="material-symbols-outlined">{iconPersonName}</span>
            </div>
            
            <div className='story-container__buttons-container'>
              <IconButton
                iconName={iconButtonName}
                labelKey={isFollowed ? t("story.button.unfollow") : t("story.button.follow")}
                type="button"
                onClick={() => {toggleFollowButton(iconButtonName)}}
              />
              <div className='card-container__icons-container' onClick={() => favoriteToggle(storyId)} >
                <button className="story-view__icon">
                  <i className={isFavorite ? "fa-solid fa-heart heart" : "fa-regular fa-heart heart"}></i>
                </button>
              </div>
            </div>

            <p>{story.description}</p>

            <Comments storyId={storyId} />

          </>
        ))}
      </div>
    </div>
  )
}