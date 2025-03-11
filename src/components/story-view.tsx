import React from "react";
import { useTranslation } from "react-i18next"
import { Story } from "../pages/Stories";
import './story-view.css'
import { IconButton } from "./icon-button";
import { TextArea } from "./text-area";
import { Button } from "./button";

type StoryView = {
  storyId: number
  stories: Story[]
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const StoryView: React.FC<StoryView> = ({ storyId, stories, setIsOpened }) => {
  const { t } = useTranslation()
  const [iconButtonName, setIconButtonName] = React.useState<string>('add')
  const [iconPersonName, setIconPersonName] = React.useState<string>('person_add')
  const [value, setValue] = React.useState<string>('')

  const toggleFollowButton = (iconName: string, ) => {
    if (iconName === 'add') {
      setIconButtonName('check')
      setIconPersonName('person_check')
    } else {
      setIconButtonName('add')
      setIconPersonName('person_add')
    }
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
                labelKey={t("story.button.follow")}
                type="button"
                onClick={() => {toggleFollowButton(iconButtonName)}}
              />
            </div>

            <p>{story.description}</p>

            <div className='story-container__comments'>
              <h2 style={{ marginBottom: '0'}}>Répondre</h2>

              <TextArea
                textKey=''
                cols={85}
                name='commentaire'
                value={value}
                onChange={onChange => setValue(onChange.target.value)}
              />
              <Button
                className='story-container__comments__send-button'
                labelKey="Poster"
              />

              <h2>Commentaires</h2>
              <div className="story-container__comments__commment-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <p>Pseudo</p>
                  <p>Date</p>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quibusdam animi earum illo accusamus labore harum amet nihil perspiciatis? Laborum veniam totam nisi laudantium beatae, ut nulla quod ex maxime, sequi rem blanditiis vero enim doloremque obcaecati dolor repudiandae cumque ab odio. Ea est nostrum id unde? Quasi, sequi delectus!</p>
              </div>
              <div  className="story-container__comments__commment-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <p>Pseudo</p>
                  <p>Date</p>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quibusdam animi earum illo accusamus labore harum amet nihil perspiciatis? Laborum veniam totam nisi laudantium beatae, ut nulla quod ex maxime, sequi rem blanditiis vero enim doloremque obcaecati dolor repudiandae cumque ab odio. Ea est nostrum id unde? Quasi, sequi delectus!</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}