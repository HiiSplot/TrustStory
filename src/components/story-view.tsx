import React from "react";
import { useTranslation } from "react-i18next"
import { Comments } from "./comments";
import { Story } from "../api/types";
import './story-view.css'

type StoryView = {
  storyId: number
  stories: Story[]
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  toggleFavorite: (storyId: number, currentFav: boolean) => void
}

export const StoryView: React.FC<StoryView> = ({
  storyId,
  stories,
  setIsOpened,
  toggleFavorite
}) => {
  const { t } = useTranslation()
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

  return (
    <div className='story-container'>
      <div className="story-container__content">
        <div
          className="story-container__close-button"
          onClick={() => setIsOpened(false)}
        >
          <span className="material-symbols-outlined font-size">cancel</span>
        </div>

        {stories
          .filter((story) => story.id === storyId)
          .map((story) => (
            <React.Fragment key={story.id}>
              <h1 className='story-container__title'>{story.title}</h1>

              <div className='story-container__buttons-container'>
                <div
                  className='card-container__icons-container'
                  onClick={() => toggleFavorite(story.id, story.isFavorite)}
                >
                  <button className="story-view__icon">
                    <i
                      className={
                        story.isFavorite
                          ? "fa-solid fa-heart heart"
                          : "fa-regular fa-heart heart"
                      }
                    />
                    {story.favoritesCount}
                  </button>
                </div>
              </div>

              <div className='story-container__subtitle'>
                <p>{t("story.postedBy")}</p>
                <div className='story-container__author-container'>
                  <a
                    className='story-container__author-container__link'
                    href=""
                  >
                    {story.author}
                  </a>
                  <span
                    className="material-symbols-outlined add-icon"
                    onClick={() => toggleFollowButton(iconButtonName)}
                    style={{ cursor: "pointer" }}
                  >
                    {iconPersonName}
                  </span>
                </div>
              </div>

              <p className="story-container__description">{story.description}</p>

              <Comments storyId={storyId} />
            </React.Fragment>
          ))}
      </div>
    </div>
  )
}