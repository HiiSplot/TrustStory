import { useTranslation } from "react-i18next"
import React from "react"
import { MyModal } from "../components/modal"
import { StoryForm } from "../components/story-form"
import { GridList, GridListItem } from "react-aria-components"
import { Card } from "../components/card"
import { IconButton } from "../components/icon-button"

export type Story = {
  title: string,
  date: string,
  author: string,
  description: string
}

const stories: Story[] = [
  {
    title: "Charizard",
    date: "2021-10-20",
    author: "Ash Ketchum",
    description: "Charizard is a Fire/Flying-type Pokémon introduced in Generation I. It evolves from Charmeleon starting at level 36. It is the final form of Charmander. Charizard is a Fire/Flying-type Pokémon introduced in Generation I. It evolves from Charmeleon starting at level 36. It is the final form of Charmander."
  }
]

export const Home: React.FC = () => {
  const { t } = useTranslation()

  const [isOpened, setIsOpened] = React.useState(false)

  return(
    <>
      <h1>{t("home.title")}</h1>

      <IconButton iconName='add' labelKey={t("home.button")} onClick={() => setIsOpened(true)} />

      <MyModal isOpened={isOpened}>
        <StoryForm setIsOpened={setIsOpened} stories={stories} />
      </MyModal>

      <GridList aria-label="Favorite pokemon" style={{ maxWidth: '100vh', display: 'grid', gap: '20px' }}>
      {stories.length > 0 ? (
        stories.map((story) => (
          <GridListItem key={story.title} textValue="Charizard">
            <Card title={story.title} date={story.date} author={story.author} description={story.description} />
          </GridListItem>
        ))
      ) : (
        <p>No stories</p>
      )}
      </GridList>
    </>
  )
}