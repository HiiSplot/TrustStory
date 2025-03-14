import React from "react"
import { GridList, GridListItem } from "react-aria-components"
import { Card } from "./card"
import { Story } from "../pages/Stories"
import './grid.css'
import { t } from "i18next"

type GridListProps = {
  items: Story[]
  setIsStoryOpened: React.Dispatch<React.SetStateAction<boolean>>
  setStoryId: React.Dispatch<React.SetStateAction<number>>
}

export const Grid: React.FC<GridListProps> = ({ items, setIsStoryOpened, setStoryId }) => {

  return (
    <GridList items={items} aria-label="Stories list" className='grid-container__grid'>
    {items.length > 0 ? (
      items.map((item, index) => (
        <GridListItem key={index}>
          <Card 
            id={item.id}
            title={item.title} 
            date={item.date} 
            author={item.author} 
            description={item.description}
            setIsStoryOpened={setIsStoryOpened}
            setStoryId={setStoryId}
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