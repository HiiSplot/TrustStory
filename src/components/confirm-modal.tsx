import React from "react"
import { Story } from "../api/types"
import { t } from "i18next"
import './confirm-modal.css'
import { onDeleteStory } from "../api/stories"

type ConfirmModalProps = {
  setIsDeleteModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setStories: React.Dispatch<React.SetStateAction<Story[]>>
  id: number
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ setIsDeleteModalOpened, setStories, id }) => {

  const deleteStory = (storyId: number) => {
    onDeleteStory(storyId)
    setStories((prevStories) => prevStories.filter((story) => story.id !== storyId))
    setIsDeleteModalOpened(false)
  }

  return (
    <div className='confirm-modal'>
      <div className='confirm-modal__container'>
        <div>
          <p>{t("story.form.deleteConfirm")}</p>
        </div>
        <div className='confirm-modal__container__buttons'>
          <button onClick={() => {setIsDeleteModalOpened(false)}}><b>{t("story.form.button.cancel")}</b></button>
          <button onClick={() => {deleteStory(id)}}><b>{t("story.form.button.delete")}</b></button>
        </div>
      </div>
    </div>
  )
}