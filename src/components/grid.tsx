import React from "react"
import { GridList, GridListItem } from "react-aria-components"
import { Card } from "./card"
import { Story } from "../api/types"
import './grid.css'
import { t } from "i18next"

type GridListProps = {
  items: Story[]
  setStories: React.Dispatch<React.SetStateAction<Story[]>>
  setIsStoryOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormOpened: React.Dispatch<React.SetStateAction<boolean>>
  setIsFormEdit: React.Dispatch<React.SetStateAction<boolean>>
  setStoryId: React.Dispatch<React.SetStateAction<number>>
  updateStoryFavorite: (storyId: number, isFav: boolean) => void
}

export const Grid: React.FC<GridListProps> = ({
  items,
  setStories,
  setIsStoryOpened,
  setIsFormOpened,
  setStoryId,
  setIsFormEdit,
  updateStoryFavorite
}) => (
    <>
      {items.length > 0 ? (
        <GridList items={items} aria-label="Stories list" className='grid-container__grid'>
          {items.map((item) => (
            <GridListItem key={item.id}>
              <Card
                userId={item.userId}
                id={item.id}
                title={item.title}
                categoryId={item.categoryId}
                date={new Date(item.date).toLocaleDateString()}
                author={item.author}
                description={item.description}
                setIsFormOpened={setIsFormOpened}
                setIsStoryOpened={setIsStoryOpened}
                setIsFormEdit={setIsFormEdit}
                setStoryId={setStoryId}
                updateStoryFavorite={updateStoryFavorite}
                isFavorite={item.isFavorite}
                setStories={setStories}
                FromStories
              />
            </GridListItem>
          ))}
        </GridList>
      ) : (
        <div style={{ minHeight: '65vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'white' }}>{t("story.noStory")}</p>
        </div>
      )}
    </>
  )