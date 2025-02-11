import { useTranslation } from "react-i18next"
import { Button } from "../components/button"
import React from "react"
import { MyModal } from "../components/modal"
import { StoryForm } from "../components/story-form"
import { GridList, GridListItem } from "react-aria-components"
import { Card } from "../components/card"

export const Home: React.FC = () => {
  const { t } = useTranslation()

  const [isOpened, setIsOpened] = React.useState(false)

  type Story = {
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
      description: "Charizard is a Fire/Flying-type Pokémon introduced in Generation I. It evolves from Charmeleon starting at level 36. It is the final form of Charmander."
    },
    {
      title: "Lorem Ipsum",
      date: "2021-10-20",
      author: "Ipsum Lorem",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, pariatur?"
    }
  ]

  return(
    <>
      <h1>{t("home.title")}</h1>
      <Button labelKey={t("home.button")} onClick={() => setIsOpened(true)} />

      <MyModal isOpened={isOpened}>
        <StoryForm setIsOpened={setIsOpened} />
      </MyModal>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <GridList aria-label="Favorite pokemon" selectionMode="multiple">
          <GridListItem textValue="Charizard">
          {stories.length > 0 ? (
            <>
              {stories.map((story) => (
                <Card key={story.title} title={story.title} date={story.date} author={story.author} description={story.description} />
              ))}
            </>
          ) : (
          <p>No stories</p>
          )}
          </GridListItem>
        </GridList>
      </div>
    </>
  )
}