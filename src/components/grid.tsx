import React from "react"
import { GridList, GridListItem } from "react-aria-components"
import { Card } from "./card"
import { Story } from "../pages/Stories"
import './grid.css'
import { t } from "i18next"

type GridListProps = {
  items: Story[]
  setStories: React.Dispatch<React.SetStateAction<Story[]>>
  setIsStoryOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormEdit: React.Dispatch<React.SetStateAction<boolean>>
  setStoryId: React.Dispatch<React.SetStateAction<number>>
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
  updateStoryFavorite: (storyId: number, isFav: boolean) => void
}

export const Grid: React.FC<GridListProps> = ({
  items,
  setStories,
  setIsStoryOpened,
  setIsFormOpened,
  setStoryId,
  setIsFormEdit,
  setIsFavorite,
  updateStoryFavorite
}) => {
  

  return (
    <GridList items={items} aria-label="Stories list" className='grid-container__grid'>
    {items.length > 0 ? (
      items.map((item, index) => (
        <GridListItem key={index}>
          <Card
            userId={item.user_id}
            id={item.id}
            title={item.title} 
            date={item.date} 
            author={item.author} 
            description={item.description}
            setIsFormOpened={setIsFormOpened}
            setIsStoryOpened={setIsStoryOpened}
            setIsFormEdit={setIsFormEdit}
            setStoryId={setStoryId}
            updateStoryFavorite={updateStoryFavorite}
            isFavorite={item.isFavorite}
            setIsFavorite={setIsFavorite}
            setStories={setStories}
            FromStories
          />
        </GridListItem>
      ))
    ) : (
      <p>{t("story.noStory")}</p>
    )}
    </GridList>
  )
}